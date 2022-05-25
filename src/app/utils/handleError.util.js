export function responseError(res, error) {
	console.log(error);
	if (error instanceof controllerError) {
		return res.status(error.httpStatus).json({ code: error.httpCode });
	}
	if (error instanceof dbError) {
		if (error.code === "23505") {
			return res.status(500).json({ code: 50261 });
		}
		if (error.code === "23503") {
			return res.status(500).json({ code: 50857 });
		}
		return res.status(500).json({ code: "50115" });
	}
	return res.status(500).json({ code: 50500 });
}

export class controllerError extends Error {
	constructor(message, httpStatus, httpCode) {
		super(message);
		this.name = "controllerError";
		this.httpStatus = httpStatus;
		this.httpCode = httpCode;
	}
}

export class dbError extends Error {
	constructor(error) {
		super(error.detail);
		this.name = "databaseError";
		this.code = error.code;
		this.detail = error.detail;
		this.constraint = error?.constraint;
	}
}
