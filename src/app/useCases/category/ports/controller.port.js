import categoryController from "../category.controller";
import routesAdapter from "../adapters/routes.adapter";
import { responseError } from "../../../utils/handleError.util";

class controllerPort {
	constructor(controller, adapter) {
		this.controller = controller;
		this.adapter = adapter;
	}

	async category(req, res) {
		try {
			const { userId } = this.adapter.params(req);
			const { status, json } = await this.controller.category(userId);
			return this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}

	async categoryById(req, res) {
		try {
			const { id } = this.adapter.params(req);
			const { status, json } = await this.controller.categoryById(id);
			return this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}

	async createCategory(req, res) {
		try {
			const { userId } = this.adapter.params(req);
			const body = this.adapter.body(req);
			const { status, json } = await this.controller.createCategory(
				body,
				userId
			);
			return this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}

	async updateCategory(req, res) {
		try {
			const { id } = this.adapter.params(req);
			const body = this.adapter.body(req);
			const { status, json } = await this.controller.updateCategory(
				id,
				body
			);
			return this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}

	async deleteCategory(req, res) {
		try {
			const { id } = this.adapter.params(req);
			const { status, json } = await this.controller.deleteCategory(id);
			return this.adapter.response(res, status, json);
		} catch (error) {
			responseError(res, error);
		}
	}
}

const port = new controllerPort(categoryController, new routesAdapter());

export default port;
