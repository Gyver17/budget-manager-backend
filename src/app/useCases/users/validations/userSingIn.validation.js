import { check } from "express-validator";
import validationResult from "../../../utils/validateResult.util";

const validation = [
  check("email").exists().isEmail().notEmpty(),
  check("password").exists().notEmpty(),
  (req, res, next) => {
    validationResult(req, res, next);
  },
];

export default validation;
