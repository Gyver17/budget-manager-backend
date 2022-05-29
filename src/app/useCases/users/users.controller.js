/* ---- Library Imports ---- */
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

/* ---- Components Imports ---- */
import servicesPort from "./ports/services.port";

/* ---- Utils Imports ---- */
import { encryptPassword, matchPassword } from "../../utils/bcrypt.util";
import mailer from "../../utils/mailer.util";
import { controllerError } from "../../utils/handleError.util";

class usersController {
	constructor(port) {
		this.port = port;
	}

	async verifyUser(data) {
		const { email, password } = data;
		const user = await this.port.verifyEmail(email);

		if (user === undefined) {
			return {
				status: 404,
				json: { message: "44754" },
			};
		}

		const validPassword = await matchPassword(password, user.password);

		if (!validPassword) {
			return {
				status: 404,
				json: { message: "44754" },
			};
		}

		const secretKey = v4();
		const token = jwt.sign({ id: user.id }, secretKey);
		await this.port.signToken({ secretKey: secretKey, id: user.id });

		const response = {
			id: user.id,
			name: user.name,
			email: user.email,
			token: token,
		};

		return {
			status: 200,
			json: response,
		};
	}

	async createUser(data) {
		const id = v4();
		const idSession = v4();
		const secretKey = v4();
		const newPassword = await encryptPassword(data.password);
		const newData = { id, idSession, secretKey, newPassword, ...data };

		await this.port.createUser(newData);

		const token = jwt.sign({ id: id }, secretKey);

		const response = {
			id: id,
			name: data.name,
			email: data.email,
			token: token,
		};

		return {
			status: 200,
			json: response,
		};
	}

	async sendCode(email) {
		const user = await this.port.verifyEmail(email);

		if (user === undefined) {
			return {
				status: 404,
				json: { message: "44754" },
			};
		}

		const uuid = v4().split("-");
		const code = `${uuid[1]}-${uuid[3]}`;

		await this.port.updateCode({ code, id: user.id });

		const html = `
    <html
        style="
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          background-color: #fefefe;
        "
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          "
        >
          <b style="font-size: 15px; font-style: italic; padding: 10px">
            Con este codigo puede restablecer su contraseña: ${code}
          </b>
        </div>
      </html>
    `;

		const info = await mailer(email, "Restablecer Contraseña", html);

		console.log("Message sent: %s", info.messageId);

		return {
			status: 200,
			json: { id: user.id },
		};
	}

	async verifyCode(id, code) {
		const user = await this.port.getUserById(id);
		if (user?.code !== code || user === undefined) {
			return {
				status: 404,
				json: { message: "44754" },
			};
		}

		const token = jwt.sign({ id: user.id }, code, { expiresIn: 60 * 5 });

		return {
			status: 200,
			json: { token },
		};
	}

	async updatePassword(id, password, token) {
		const user = await this.port.getUserById(id);
		if (user === undefined) {
			return {
				status: 404,
				json: { message: "44754" },
			};
		}

		await jwt.verify(token, user.code, (error) => {
			if (error) {
				throw new controllerError("invalidToken", 403, 43292);
			}
		});

		const newPassword = await encryptPassword(password);

		await this.port.updatePassword({ id: user.id, password: newPassword });

		return {
			status: 200,
			json: { message: "success" },
		};
	}

	async updateUser(id, data) {
		await this.port.updateUser(id, data);

		return {
			status: 200,
			json: { message: "success" },
		};
	}

	async closeSession(id) {
		await this.port.signToken({ secretKey: "", id: id });

		return {
			status: 200,
			json: { message: "success" },
		};
	}
}

const controllers = new usersController(servicesPort);
export default controllers;
