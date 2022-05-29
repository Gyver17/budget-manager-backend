export default class servicesAdapter {
	adapterGet(categories) {
		const data = categories.map((category) => {
			return {
				id: category.id,
				name: category.name_category,
				userId: category.id_user_account_category,
				associated: category.associated,
			};
		});
		return data;
	}

	adapterGetById(category) {
		return {
			id: category.id,
			name: category.name_category,
		};
	}

	adapterCreate(data) {
		return [data.id, data.name, data.userId];
	}

	adapterUpdate(id, data) {
		return [data.name, id];
	}
}
