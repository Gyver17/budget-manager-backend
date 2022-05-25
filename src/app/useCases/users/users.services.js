import pool from "../../../const/database";
import { dbError } from "../../utils/handleError.util";

export default class usersServices {
	async getByEmail(email) {
		try {
			const response = await pool.query(
				`select * from user_account where email_user_account=$1`,
				[email]
			);
			return response.rows[0];
		} catch (error) {
			throw new dbError(error);
		}
	}

	async getById(id) {
		try {
			const response = await pool.query(
				`select * from user_account where id=$1`,
				[id]
			);
			return response.rows[0];
		} catch (error) {
			throw new dbError(error);
		}
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
		} catch (error) {
			throw new dbError(error);
		}
	}

	async updateSessionById(data) {
		try {
			await pool.query(
				`update session set secret_key_session=$1 where id_user_account_session=$2`,
				data
			);
			return true;
		} catch (error) {
			throw new dbError(error);
		}
	}

	async update(data) {
		try {
			await pool.query(
				`update user_account set 
				name_user_account=$1, 
				email_user_account=$2 
				where id=$3`,
				data
			);
			return true;
		} catch (error) {
			throw new dbError(error);
		}
	}

	async updatePassword(data) {
		try {
			await pool.query(
				`update user_account set password_user_account=$1 where id=$2`,
				data
			);
			return true;
		} catch (error) {
			throw new dbError(error);
		}
	}

	async updateCode(data) {
		try {
			await pool.query(
				`update user_account set code_update_password_user_account=$1 where id=$2`,
				data
			);
			return true;
		} catch (error) {
			throw new dbError(error);
		}
	}
}
