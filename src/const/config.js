import dotenv from "dotenv";
import path from "path";

dotenv.config({
	path: path.resolve(".env" + "." + process.env.NODE_ENV),
});
// console.log(process.env.PORT)

const whiteList = [process.env.CORS_ORIGIN_1, process.env.CORS_ORIGIN_2];

const config = {
	database: {
		user: process.env.DB_USER,
		host: process.env.DB_HOST,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		port: process.env.DB_PORT,
		ssl: {
			rejectUnauthorized: false,
		},
	},
	settingCors: {
		origin: (origin, callback) => {
			if (whiteList.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	},
	auth: {
		user: process.env.APP_GMAIL_EMAIL,
		pass: process.env.APP_GMAIL_PASSWORD,
	},
};

export default config;
