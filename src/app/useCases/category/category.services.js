import pool from "../../../const/database";

export default class categoryServices {
	async get() {
		const response = await pool.query(`select * from category`);
		return response.rows;
	}

	async getById(id) {
		const response = await pool.query(
			`select * from category where id=$1`,
			[id]
		);
		return response.rows[0];
	}

	async create(data) {
		await pool.query(
			`insert into category (id, name_category) values ($1, $2)`,
			data
		);
		return true;
	}

	async update(data) {
		await pool.query(
			`update category set name_category=$1 where id=$2`,
			data
		);
		return true;
	}

	async delete(id) {
		await pool.query(`delete from category where id=$1`, [id]);
		return true;
	}
}
