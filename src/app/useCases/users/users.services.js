import pool from "../../../const/database";

export default class usersServices {
	async getByEmail(email) {
		const response = await pool.query(
			`select * from user_account where email_user_account=$1`,
			[email]
		);
		return response.rows[0];
	}

	async getById(id) {
		const response = await pool.query(
			`select * from user_account where id=$1`,
			[id]
		);
		return response.rows[0];
	}

	async create(user, session) {
		try {
			await pool.query(
				`insert into user_account 
			(id, name_user_account, email_user_account, password_user_account)
			values ($1, $2, $3, $4)`,
				user
			);

			await pool.query(
				`insert into session (id, id_user_account_session, secret_key_session) values ($1, $2, $3)`,
				session
			);
			return true;
		} catch (e) {
			console.log(e);
		}
	}

	async updateSessionById(data) {
		await pool.query(
			`update session set secret_key_session=$1 where id_user_account_session=$2`,
			data
		);
	}

	async update(data) {
		await pool.query(
			`update user_account set 
			name_user_account=$1, 
			email_user_account=$2, 
			password_user_account=$3 
			where id=$4`,
			data
		);
		return true;
	}

	async updatePassword(data) {
		await pool.query(
			`update user_account set password_user_account=$1 where id=$2`,
			data
		);
		return true;
	}

	async updateCode(data) {
		await pool.query(
			`update user_account set code_update_password_user_account=$1 where id=$2`,
			data
		);
		return true;
	}
}
