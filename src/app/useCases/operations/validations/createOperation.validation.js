import { check } from "express-validator";
import validationResult from "../../../utils/validateResult.util";
import expressions from "../../../../const/regExp";

const validation = [
	check("idUser")
		.isString()
		.exists()
		.notEmpty()
		.custom((value) => {
			if (!expressions.uuid.test(value)) {
				throw new Error("Invalid Value");
			}
			return true;
		}),
	check("idCategory")
		.isString()
		.exists()
		.notEmpty()
		.custom((value) => {
			if (!expressions.uuid.test(value)) {
				throw new Error("Invalid Value");
			}
			return true;
		}),
	check("concept")
		.isString()
		.exists()
		.notEmpty()
		.custom((value) => {
			if (!expressions.concept.test(value)) {
				throw new Error("Invalid Value");
			}
			return true;
		}),
	check("amount").isFloat({ min: 0 }).exists().notEmpty(),
	check("type")
		.isString()
		.exists()
		.notEmpty()
		.custom((value) => {
			console.log(value !== "expense" || value !== "ingress");
			if (value === "expense" || value === "ingress") {
				return true;
			}
			throw new Error("Invalid Value");
		}),
	check("date")
		.isString()
		.exists()
		.notEmpty()
		.custom((value) => {
			if (!expressions.date.test(value)) {
				throw new Error("Invalid Value");
			}
			return true;
		}),
	(req, res, next) => {
		validationResult(req, res, next);
	},
];

export default validation;
