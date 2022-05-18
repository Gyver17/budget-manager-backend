import { Router } from "express";
import verifyToken from "../../utils/verifyToken.util";
import controllerPort from "./ports/controller.port";
import validateCreate from "./validations/createOperation.validation";
import validateUpdate from "./validations/updateOperation.validation";
import validateId from "../../utils/validateIdParameter.util";

class usersRoutes {
  constructor(port) {
    this.port = port;
  }

  init() {
    const router = Router();

    router.get("/api/v1/operations", verifyToken, (req, res) => {
      this.port.operations(req, res);
    });

    router.get(
      "/api/v1/operations/:id",
      verifyToken,
      validateId,
      (req, res) => {
        this.port.operationById(req, res);
      }
    );

    router.get("/api/v1/type/operations/:type", verifyToken, (req, res) => {
      this.port.operationsByType(req, res);
    });

    router.post(
      "/api/v1/operations",
      verifyToken,
      validateCreate,
      (req, res) => {
        this.port.createOperation(req, res);
      }
    );

    router.put(
      "/api/v1/operations/:id",
      verifyToken,
      validateId,
      validateUpdate,
      (req, res) => {
        this.port.updateOperation(req, res);
      }
    );

    router.delete(
      "/api/v1/operations/:id",
      verifyToken,
      validateId,
      (req, res) => {
        this.port.deleteOperation(req, res);
      }
    );

    return router;
  }
}

const routes = new usersRoutes(controllerPort);
export default routes.init();
