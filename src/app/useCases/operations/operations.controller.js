import servicesPort from "./ports/services.port";
import { v4 } from "uuid";

class operationsController {
	constructor(port) {
		this.port = port;
	}

	async operations() {
		const data = await this.port.operations();
		return { status: 200, json: data };
	}

	async operationById(id) {
		const data = await this.port.operationById(id);
		if (data === undefined) {
			return { status: 200, json: [] };
		}
		return { status: 200, json: data };
	}

	async operationsByType(type) {
		const data = await this.port.operationsByType(type);
		return { status: 200, json: data };
	}

	async createOperation(data) {
		const id = v4();
		await this.port.createOperation({ id, ...data });
		return { status: 200, json: { message: "succes" } };
	}

	async updateOperation(id, data) {
		await this.port.updateOperation(id, data);
		return { status: 200, json: { message: "succes" } };
	}

	async deleteOperation(id) {
		await this.port.deleteOperation(id);
		return { status: 200, json: { message: "succes" } };
	}
}

const controllers = new operationsController(servicesPort);
export default controllers;
