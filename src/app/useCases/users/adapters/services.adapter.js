export default class servicesAdapter {
	dataUser(data) {
		const newData = {
			id: data.id,
			name: data.name_user_account,
			email: data.email_user_account,
			password: data.password_user_account,
			code: data?.code_update_password_user_account,
		};

		return newData;
	}

	createUser(data) {
		const user = [data.id, data.name, data.email, data.newPassword];
		const session = [data.idSession, data.id, data.secretKey];
		return { user, session };
	}

	signToken(data) {
		return [data.secretKey, data.id];
	}

	updateCode(data) {
		return [data.code, data.id];
	}

	updatePassword(data) {
		return [data.password, data.id];
	}

	updateUser(id, data) {
		return [data.name, data.email, id];
	}
}
