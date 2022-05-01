export default class servicesAdapter {
	adapterGet(categories) {
		const data = categories.map((category) => {
			return {
				id: category.id,
				name: category.name_category,
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
		return [data.id, data.name];
	}

	adapterUpdate(id, data) {
		return [data.name, id];
	}
}
