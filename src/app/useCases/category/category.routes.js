import { Router } from "express";
import controllerPort from "./ports/controller.port";
import verifyToken from "../../utils/verifyToken.util";
import validation from "./validations/category.validation";
import validateId from "../../utils/validateIdParameter.util";

class usersRoutes {
  constructor(port) {
    this.port = port;
  }

  init() {
    const router = Router();

    router.get("/api/v1/category", verifyToken, (req, res) => {
      this.port.category(req, res);
    });

    router.get("/api/v1/category/:id", verifyToken, validateId, (req, res) => {
      this.port.categoryById(req, res);
    });

    router.post("/api/v1/category", verifyToken, validation, (req, res) => {
      this.port.createCategory(req, res);
    });

    router.put(
      "/api/v1/category/:id",
      verifyToken,
      validateId,
      validation,
      (req, res) => {
        this.port.updateCategory(req, res);
      }
    );

    router.delete(
      "/api/v1/category/:id",
      verifyToken,
      validateId,
      (req, res) => {
        this.port.deleteCategory(req, res);
      }
    );

    return router;
  }
}

const routes = new usersRoutes(controllerPort);
export default routes.init();
