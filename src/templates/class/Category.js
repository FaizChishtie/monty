const util = require('../../util');
const Channel = require('./Channel');
const Role = require('./Role');

class Category {
	constructor(name, isProtected = false) {
		this.name = name;
		this.channels = [];

		this.isProtected = isProtected;

		// roles allowed in category
		this.roles = [];
	}

	addChannel(channel) {
		const castChannel = Channel.cast(channel);
		this.channels.push(castChannel);
	}

	addChannels(channels) {
		for (const channel of channels) {
			this.addChannel(channel);
		}
	}

	addRole(role) {
		const castRole = Role.cast(role);
		this.role.push(castRole);
	}

	addRoles(roles) {
		for (const role of roles) {
			this.addRole(role);
		}
	}

	static cast(object) {
		const properties = util.checkObjectHasProperty(object, 'name')
		&& util.checkObjectHasProperty(object, 'isProtected')
		&& util.checkObjectHasProperty(object, 'roles')
		&& util.checkObjectHasProperty(object, 'channels');

		if (!properties) {
			throw new Error(`Invalid Category type passed: ${object} is not of type Monty#Category`);
		}

		const category = new Category(object.name, object.isProtected);

		category.addChannels(object.channels);
		category.addRoles(object.roles);

		return category;
	}
}

module.exports = Category;