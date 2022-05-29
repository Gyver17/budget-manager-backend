import expression from "../../const/regExp";

export default function (req, res, next) {
	const { id, userId } = req.params;

	if (!expression.uuid.test(id || userId)) {
		return res.status(403).json({ code: "43097" });
	}

	return next();
}
