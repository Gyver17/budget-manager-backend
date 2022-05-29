import servicesPort from "./ports/services.port";
import { v4 } from "uuid";

class usersController {
	constructor(port) {
		this.port = port;
	}

	async category(userId) {
		const data = await this.port.category(userId);
		return { status: 200, json: data };
	}

	async categoryById(id) {
		const data = await this.port.categoryById(id);
		if (data === undefined) {
			return { status: 200, json: {} };
		}
		return { status: 200, json: data };
	}

	async createCategory(data, userId) {
		const id = v4();
		const { name } = data;
		await this.port.createCategory({ id, name, userId });
		return { status: 200, json: { message: "success" } };
	}

	async updateCategory(id, data) {
		await this.port.updateCategory(id, data);
		return { status: 200, json: { message: "success" } };
	}

	async deleteCategory(id) {
		await this.port.deleteCategory(id);
		return { status: 200, json: { message: "success" } };
	}
}

const controllers = new usersController(servicesPort);
export default controllers;
