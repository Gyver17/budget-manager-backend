import operationsController from "../operations.controller";
import routesAdapter from "../adapters/routes.adapter";

class controllerPort {
  constructor(controller, adapter) {
    this.controller = controller;
    this.adapter = adapter;
  }

  async operations(req, res) {
    const { status, json } = await this.controller.operations();
    return this.adapter.response(res, status, json);
  }

  async operationById(req, res) {
    const { id } = this.adapter.params(req);
    const { status, json } = await this.controller.operationById(id);
    return this.adapter.response(res, status, json);
  }

  async operationsByType(req, res) {
    const { type } = this.adapter.params(req);
    const { status, json } = await this.controller.operationsByType(type);
    return this.adapter.response(res, status, json);
  }

  async createOperation(req, res) {
    const data = this.adapter.body(req);
    const { status, json } = await this.controller.createOperation(data);
    return this.adapter.response(res, status, json);
  }

  async updateOperation(req, res) {
    const { id } = this.adapter.params(req);
    const data = this.adapter.body(req);
    const { status, json } = await this.controller.updateOperation(id, data);
    return this.adapter.response(res, status, json);
  }

  async deleteOperation(req, res) {
    const { id } = this.adapter.params(req);
    const { status, json } = await this.controller.deleteOperation(id);
    return this.adapter.response(res, status, json);
  }
}

const port = new controllerPort(operationsController, new routesAdapter());

export default port;
