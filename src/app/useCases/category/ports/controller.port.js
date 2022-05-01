import categoryController from "../category.controller";
import routesAdapter from "../adapters/routes.adapter";

class controllerPort {
	constructor(controller, adapter) {
		this.controller = controller;
		this.adapter = adapter;
	}

	async category(req, res) {
		const { status, json } = await this.controller.category();
		return this.adapter.response(res, status, json);
	}

	async categoryById(req, res) {
		const { id } = this.adapter.params(req);
		const { status, json } = await this.controller.categoryById(id);
		return this.adapter.response(res, status, json);
	}

	async createCategory(req, res) {
		const body = this.adapter.body(req);
		const { status, json } = await this.controller.createCategory(body);
		return this.adapter.response(res, status, json);
	}

	async updateCategory(req, res) {
		const { id } = this.adapter.params(req);
		const body = this.adapter.body(req);
		const { status, json } = await this.controller.updateCategory(id, body);
		return this.adapter.response(res, status, json);
	}

	async deleteCategory(req, res) {
		const { id } = this.adapter.params(req);
		const { status, json } = await this.controller.deleteCategory(id);
		return this.adapter.response(res, status, json);
	}
}

const port = new controllerPort(categoryController, new routesAdapter());

export default port;
