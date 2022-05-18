import { Router } from "express";
import verifyToken from "../../utils/verifyToken.util";
import controllerPort from "./ports/controller.port";
import singInValidation from "./validations/userSingIn.validation";
import singUpValidation from "./validations/userSingUp.validation";
import validateId from "../../utils/validateIdParameter.util";

class usersRoutes {
  constructor(port) {
    this.port = port;
  }

  init() {
    const router = Router();

    /* ---- Public Routes ---- */

    router.post("/api/v1/signin", singInValidation, (req, res) => {
      this.port.signIn(req, res);
    });

    router.post("/api/v1/signup", singUpValidation, (req, res) => {
      this.port.signUp(req, res);
    });

    router.put("/api/v1/forgotpassword", (req, res) => {
      this.port.forgotPassword(req, res);
    });

    router.post("/api/v1/authorizechanged", (req, res) => {
      this.port.authorizeChangedPassword(req, res);
    });

    router.put("/api/v1/updatepassword/:id", validateId, (req, res) => {
      this.port.updatePassword(req, res);
    });

    /* ---- Private Route ---- */

    router.put(
      "/api/v1/updateuser/:id",
      verifyToken,
      validateId,
      (req, res) => {
        this.port.updateUser(req, res);
      }
    );

    return router;
  }
}

const routes = new usersRoutes(controllerPort);
export default routes.init();
