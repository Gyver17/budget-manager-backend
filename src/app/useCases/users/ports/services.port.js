import usersServices from "../users.services";
import servicesAdapter from "../adapters/services.adapter"

class servicesPort{
	constructor(services, adapter) {
		this.services = services;
		this.adapter = adapter;
	}

	async verifyEmail(email) {
		const user = await this.services.getByEmail(email);
		if(user === undefined) {
			return undefined
		}
		return await this.adapter.dataUser(user)
	}

	async signToken(data) {
		const session = this.adapter.signToken(data)
		return await this.services.updateSessionById(session)
	}

	async createUser(data) {
		const { user, session } = this.adapter.createUser(data)
		return await this.services.create(user, session);
	}

	updateCode(data) {
		const adapterData = this.adapter.updateCode(data) 
		return this.services.updateCode(adapterData);
	}

	verifyCode(id) {
		const user = this.services.getById(id);
		if(user === undefined) {
			return undefined
		}
		return this.adapter.dataUser(user)
	}

	updatePassword(data) {
		const adapterData = this.adapter.updatePassword(data) 
		return this.services.updatePassword(adapterData);
	}

	updateUser(data) {
		const adapterData = this.adapter.updateUser(data) 
		return this.services.update(adapterData);
	}
}

const port = new servicesPort(new usersServices(), new servicesAdapter());

export default port;
