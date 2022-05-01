import categoryServices from "../category.services";
import servicesAdapter from "../adapters/services.adapter";

class servicesPort {
	constructor(services, adapter) {
		this.services = services;
		this.adapter = adapter;
	}

	async category() {
		const categories = await this.services.get();
		return this.adapter.adapterGet(categories);
	}

	async categoryById(id) {
		const category = await this.services.getById(id);
		if(category === undefined) {
			return undefined
		}
		return this.adapter.adapterGetById(category);
	}

	async createCategory(data) {
		const newData = this.adapter.adapterCreate(data);
		return await this.services.create(newData);
	}

	async updateCategory(id, data) {
		const newData = this.adapter.adapterUpdate(id, data);
		return await this.services.update(newData);
	}

	async deleteCategory(id) {
		return await this.services.delete(id);
	}
}

const port = new servicesPort(new categoryServices(), new servicesAdapter());

export default port;
