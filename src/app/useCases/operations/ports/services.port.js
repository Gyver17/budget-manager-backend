import operationsServices from "../operations.services";
import servicesAdapter from "../adapters/services.adapter";

class servicesPort {
	constructor(services, adapter) {
		this.services = services;
		this.adapter = adapter;
	}

	async operations(userId) {
		const operations = await this.services.get(userId);
		return this.adapter.adapterGet(operations);
	}

	async operationById(id) {
		const operation = await this.services.getById(id);
		if (operation === undefined) {
			return undefined;
		}
		return this.adapter.adapterGetById(operation);
	}

	async operationsByType(type) {
		const operations = await this.services.getByType(type);
		return this.adapter.adapterGetByType(operations);
	}

	async createOperation(data) {
		const newData = this.adapter.adapterCreate(data);
		return await this.services.create(newData);
	}

	async updateOperation(id, data) {
		const newData = this.adapter.adapterUpdate(id, data);
		return await this.services.update(newData);
	}

	async deleteOperation(id) {
		return await this.services.delete(id);
	}
}

const port = new servicesPort(new operationsServices(), new servicesAdapter());

export default port;
