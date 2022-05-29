export default class servicesAdapter {
	adapterGet(operations) {
		const data = operations.map((operation) => {
			return {
				id: operation.id,
				idUser: operation.id_user_account,
				idCategory: operation.id_category,
				category: operation.category,
				concept: operation.concept,
				amount: parseInt(operation.amount),
				type: operation.type,
				date: operation.date,
			};
		});
		return data;
	}

	adapterGetById(operation) {
		return {
			id: operation.id,
			idUser: operation.id_user_account_operation,
			idCategory: operation.id_category_operation,
			concept: operation.concept_operation,
			amount: parseInt(operation.amount_operation),
			type: operation.type_operation,
			date: operation.date_operation,
		};
	}

	adapterGetByType(operations) {
		const data = operations.map((operation) => {
			return {
				id: operation.id,
				idUser: operation.id_user_account_operation,
				idCategory: operation.id_category_operation,
				concept: operation.concept_operation,
				amount: parseInt(operation.amount_operation),
				type: operation.type_operation,
				date: operation.date_operation,
			};
		});
		return data;
	}

	adapterCreate(data) {
		if (data.type === "expense") {
			return [
				data.id,
				data.idUser,
				data.idCategory,
				data.concept,
				-data.amount,
				data.type,
				data.date,
			];
		}
		return [
			data.id,
			data.idUser,
			data.idCategory,
			data.concept,
			data.amount,
			data.type,
			data.date,
		];
	}

	adapterUpdate(id, data) {
		if (data.type === "expense") {
			return [
				data.idUser,
				data.idCategory,
				data.concept,
				-data.amount,
				data.date,
				id,
			];
		}
		return [
			data.idUser,
			data.idCategory,
			data.concept,
			data.amount,
			data.date,
			id,
		];
	}
}
