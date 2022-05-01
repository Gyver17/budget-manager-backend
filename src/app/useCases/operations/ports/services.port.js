import operationsServices from "../operations.services";

class servicesPort {
	constructor(services) {
		this.services = services;
	}

	operations() {
		return this.services.get();
	}

	operationById() {
		return this.services.getById();
	}

	operationsByType(){
		return this.services.getByType()
	}

	createOperation(){
		return this.services.create()
	}

	updateOperation(){
		return this.services.update()
	}

	deleteOperation(){
		return this.services.delete()
	}
}

const port = new servicesPort(new operationsServices());

export default port;
