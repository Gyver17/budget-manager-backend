import { check } from "express-validator";
import validationResult from "../../../utils/validateResult.util";
import expressions from "../../../../const/regExp";

const validation = [
	check("name")
		.exists()
		.notEmpty()
		.custom((value) => {
			if (!expressions.name.test(value)) {
				throw new Error("Invalid Value");
			}
			return true;
		}),
	check("email").exists().isEmail().notEmpty(),
	check("password")
		.exists()
		.notEmpty()
		.custom((value) => {
			if (!expressions.password.test(value)) {
				throw new Error("Invalid Value");
			}
			return true;
		}),
	(req, res, next) => {
		validationResult(req, res, next);
	},
];

export default validation;
