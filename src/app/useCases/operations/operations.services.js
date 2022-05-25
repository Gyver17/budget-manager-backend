import pool from "../../../const/database";
import { dbError } from "../../utils/handleError.util";

export default class operationsServices {
	async get() {
		try {
			const response = await pool.query(`select * from operation`);
			return response.rows;
		} catch (error) {
			throw new dbError(error);
		}
	}

	async getById(id) {
		try {
			const response = await pool.query(
				`select * from operation where id=$1`,
				[id]
			);
			return response.rows[0];
		} catch (error) {
			throw new dbError(error);
		}
	}

	async getByType(type) {
		try {
			const response = await pool.query(
				`select * from operation where type_operation=$1`,
				[type]
			);
			return response.rows;
		} catch (error) {
			throw new dbError(error);
		}
	}

	async create(data) {
		try {
			await pool.query(
				`insert into operation 
      (id,
      id_user_account_operation, 
      id_category_operation, 
      concept_operation, 
      amount_operation, 
      type_operation, 
      date_operation) 
      values ($1, $2, $3, $4, $5, $6, $7)`,
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
				`update operation set 
    id_user_account_operation=$1,
    id_category_operation=$2,
    concept_operation=$3,
    amount_operation=$4,
    date_operation=$5 where id=$6`,
				data
			);
			return true;
		} catch (error) {
			throw new dbError(error);
		}
	}

	async delete(id) {
		try {
			await pool.query(`delete from operation where id=$1`, [id]);
			return true;
		} catch (error) {
			throw new dbError(error);
		}
	}
}
