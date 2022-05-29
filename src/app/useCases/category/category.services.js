import pool from "../../../const/database";
import { dbError } from "../../utils/handleError.util";

export default class categoryServices {
	async get(userId) {
		try {
			const response = await pool.query(
				`select *, 
				(select count(*) from operation 
				where id_category_operation=category.id) 
				as associated from category where id_user_account_category=$1`,
				[userId]
			);
			return response.rows;
		} catch (error) {
			throw new dbError(error);
		}
	}

	async getById(id) {
		try {
			const response = await pool.query(
				`select * from category where id=$1`,
				[id]
			);
			return response.rows[0];
		} catch (error) {
			throw new dbError(error);
		}
	}

	async create(data) {
		try {
			await pool.query(
				`insert into category (id, name_category, id_user_account_category) values ($1, $2, $3)`,
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
				`update category set name_category=$1 where id=$2`,
				data
			);
			return true;
		} catch (error) {
			throw new dbError(error);
		}
	}

	async delete(id) {
		try {
			await pool.query(`delete from category where id=$1`, [id]);
			return true;
		} catch (error) {
			throw new dbError(error);
		}
	}
}
