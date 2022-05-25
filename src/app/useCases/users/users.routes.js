import { Router } from "express";
import verifyToken from "../../utils/verifyToken.util";
import controllerPort from "./ports/controller.port";
import singInValidation from "./validations/userSingIn.validation";
import singUpValidation from "./validations/userSingUp.validation";
import {
	forgotPasswordValidation,
	authorizechangedValidation,
	updatePasswordValidation,
} from "./validations/updatePassword.validation";
import validateId from "../../utils/validateIdParameter.util";

class usersRoutes {
	constructor(port) {
		this.port = port;
	}

	init() {
		const router = Router();

		/* ---- Public Routes ---- */

		router.post("/api/v1/signin", singInValidation, (req, res) => {
			this.port.signIn(req, res);
		});

		router.post("/api/v1/signup", singUpValidation, (req, res) => {
			this.port.signUp(req, res);
		});

		router.put(
			"/api/v1/forgotpassword",
			forgotPasswordValidation,
			(req, res, next) => {
				this.port.forgotPassword(req, res, next);
			}
		);

		router.post(
			"/api/v1/authorizechanged/:id",
			validateId,
			authorizechangedValidation,
			(req, res) => {
				console.log("Hola");
				this.port.authorizeChangedPassword(req, res);
			}
		);

		router.put(
			"/api/v1/updatepassword/:id",
			validateId,
			updatePasswordValidation,
			(req, res, next) => {
				const token = req.headers["x-access-token"];
				if (!token) {
					res.status(403).send({ code: "43292" });
				}

				this.port.updatePassword(req, res, next, token);
			}
		);

		/* ---- Private Route ---- */

		router.put(
			"/api/v1/updateuser/:id",
			verifyToken,
			validateId,
			(req, res) => {
				this.port.updateUser(req, res);
			}
		);

		return router;
	}
}

const routes = new usersRoutes(controllerPort);
export default routes.init();
