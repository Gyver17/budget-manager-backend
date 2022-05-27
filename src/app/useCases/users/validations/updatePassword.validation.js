import { check } from "express-validator";
import expressions from "../../../../const/regExp";
import validationResult from "../../../utils/validateResult.util";

const forgotPasswordValidation = [
	check("email").exists().isEmail().notEmpty(),
	(req, res, next) => {
		validationResult(req, res, next);
	},
];

const authorizechangedValidation = [
	check("code")
		.exists()
		.notEmpty()
		.custom((value) => {
			if (!expressions.code.test(value)) {
				throw new Error("Invalid Value");
			}
			return true;
		}),
	(req, res, next) => {
		validationResult(req, res, next);
	},
];

const updatePasswordValidation = [
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

export {
	forgotPasswordValidation,
	authorizechangedValidation,
	updatePasswordValidation,
};
