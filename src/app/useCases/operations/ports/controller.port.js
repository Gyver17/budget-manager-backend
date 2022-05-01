import operationsController from "../operations.controller";

class controllerPort {
	constructor(controller) {
		this.controller = controller;
	}

	operations() {
		return this.controller.operations();
	}

	operationById() {
		return this.controller.operationById();
	}

	operationsByType() {
		return this.controller.operationsByType();
	}

	createOperation() {
		return this.controller.createOperation();
	}

	updateOperation() {
		return this.controller.updateOperation();
	}

	deleteOperation() {
		return this.controller.deleteOperation();
	}
}

const port = new controllerPort(operationsController);

export default port;
