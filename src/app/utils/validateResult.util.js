import { validationResult } from "express-validator";

export default function (req, res, next) {
	try {
		validationResult(req).throw();
		return next();
	} catch (error) {
		console.log(error.array());
		res.status(403);
		res.send({
			code: "43097",
			details: error.array({ onlyFirstError: true }),
		});
	}
}
