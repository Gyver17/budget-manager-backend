function response(res, status, json) {
	return res.status(status).json(json);
}

function params(req) {
	return req.params;
}

function body(req) {
	return req.body;
}

export { response, params, body };
