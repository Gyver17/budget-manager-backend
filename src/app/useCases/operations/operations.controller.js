import servicesPort from "./ports/services.port";

class operationsController {
	constructor(port) {
		this.port = port;
	}

	operations() {
		return this.port.operations();
	}

	operationById() {
		return this.port.operationById();
	}

	operationsByType() {
		return this.port.operationsByType();
	}

	createOperation() {
		return this.port.createOperation();
	}

	updateOperation() {
		return this.port.updateOperation();
	}

	deleteOperation() {
		return this.port.deleteOperation();
	}
}

const controllers = new operationsController(servicesPort);
export default controllers;
