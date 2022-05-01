import usersController from "../users.controller";
import routesAdapter from "../adapters/routes.adapter";

class controllerPort {
	constructor(controller, adapter) {
		this.controller = controller;
		this.adapter = adapter;
	}

	async signIn(req, res) {
		const body = this.adapter.body(req);
		const { status, json } = await this.controller.verifyUser(body);
		this.adapter.response(res, status, json);
	}

	async signUp(req, res) {
		const body = this.adapter.body(req);
		const { status, json } = await this.controller.createUser(body);
		this.adapter.response(res, status, json);
	}

	forgotPassword(req, res) {
		return this.controller.sendCode();
	}

	authorizeChangedPassword(req, res) {
		return this.controller.verifyCode();
	}

	updatePassword(req, res) {
		return this.controller.updatePassword();
	}

	updateUser(req, res) {
		return this.controller.updateUser();
	}
}

const port = new controllerPort(usersController, new routesAdapter());

export default port;
