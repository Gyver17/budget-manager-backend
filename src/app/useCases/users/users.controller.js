import servicesPort from "./ports/services.port";
import { encryptPassword, matchPassword } from "../../utils/bcrypt";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";

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

	sendCode() {
		return this.port.updateCode();
	}

	verifyCode() {
		return this.port.verifyCode();
	}

	updatePassword() {
		return this.port.updatePassword();
	}

	updateUser() {
		return this.port.updateUser();
	}
}

const controllers = new usersController(servicesPort);
export default controllers;
