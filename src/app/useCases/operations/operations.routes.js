import { Router } from "express";
import controllerPort from './ports/controller.port'

class usersRoutes {
	constructor(port) {
        this.port = port
    };

	init() {
		const router = Router();

		router.get("/api/v1/operations", (req, res) => {
			res.send(this.port.operations());
		});

		router.get("/api/v1/operations/:id", (req, res) => {
			res.send(this.port.operationById());
		});

		router.get("/api/v1/type/operations/:id", (req, res) => {
			res.send(this.port.operationsByType());
		});

		router.post("/api/v1/operations", (req, res) => {
			res.send(this.port.createOperation());
		});

		router.put("/api/v1/operations/:id", (req, res) => {
			res.send(this.port.updateOperation());
		});

		router.delete("/api/v1/operations/:id", (req, res) => {
			res.send(this.port.deleteOperation());
		});

		return router;
	}
}

const routes = new usersRoutes(controllerPort)
export default routes.init()

