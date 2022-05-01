import { Router } from "express";
import controllerPort from './ports/controller.port'

class usersRoutes {
	constructor(port) {
        this.port = port
    };

	init() {
		const router = Router();

		/* ---- Public Routes ---- */

		router.post("/api/v1/signin", (req, res) => {
			this.port.signIn(req, res);
		});

		router.post("/api/v1/signup", (req, res) => {
			this.port.signUp(req, res);
		});

		router.put("/api/v1/forgotpassword", (req, res) => {
			this.port.forgotPassword(req, res);
		});

		router.post("/api/v1/authorizechanged", (req, res) => {
			this.port.authorizeChangedPassword(req, res);
		});

		router.put("/api/v1/updatepassword/:id", (req, res) => {
			this.port.updatePassword(req, res);
		});

		/* ---- Private Route ---- */

		router.put("/api/v1/updateuser/:id", (req, res) => {
			this.port.updateUser(req, res);
		});

		return router;
	}
}

const routes = new usersRoutes(controllerPort)
export default routes.init()

