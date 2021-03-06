import bcrypt from "bcryptjs";

async function encryptPassword(password) {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
}

async function matchPassword(password, savedPassword) {
	try {
		return await bcrypt.compare(password, savedPassword);
	} catch (e) {
		throw new Error("failed match password");
	}
}

export { encryptPassword, matchPassword };
