export default class routesAdapter {
	response(res, status, json) {
		res.status(status).json(json);
	}

	params(req) {
		return req.params;
	}

	body(req) {
		return req.body;
	}
}
