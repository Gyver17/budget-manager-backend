import usersController from "../users.controller";
import routesAdapter from "../adapters/routes.adapter";
import { responseError } from "../../../utils/handleError.util";

class controllerPort {
	constructor(controller, adapter) {
		this.controller = controller;
		this.adapter = adapter;
	}

	async signIn(req, res) {
		try {
			const body = this.adapter.body(req);
			const { status, json } = await this.controller.verifyUser(body);
			this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}

	async signUp(req, res) {
		try {
			const body = this.adapter.body(req);
			const { status, json } = await this.controller.createUser(body);
			this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}

	async forgotPassword(req, res) {
		try {
			const { email } = this.adapter.body(req);
			const { status, json } = await this.controller.sendCode(email);
			this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}

	async authorizeChangedPassword(req, res) {
		try {
			const { id } = this.adapter.params(req);
			const { code } = this.adapter.body(req);
			const { status, json } = await this.controller.verifyCode(id, code);
			this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}

	async updatePassword(req, res, next, token) {
		try {
			const { id } = this.adapter.params(req);
			const { password } = this.adapter.body(req);
			const { status, json } = await this.controller.updatePassword(
				id,
				password,
				token
			);
			this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}

	async updateUser(req, res) {
		try {
			const { id } = this.adapter.params(req);
			const body = this.adapter.body(req);
			const { status, json } = await this.controller.updateUser(id, body);
			this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}

	async closeSession(req, res) {
		try {
			const { id } = this.adapter.params(req);
			const { status, json } = await this.controller.closeSession(id);
			this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}
}

const port = new controllerPort(usersController, new routesAdapter());

export default port;
