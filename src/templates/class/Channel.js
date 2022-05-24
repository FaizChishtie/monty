const util = require('../../util');
const Role = require('./Role');

const ChannelType = ['voice', 'text'];

class Channel {
	constructor(name, type, isProtected = false) {
		if (!(ChannelType.includes(type))) {
			throw new Error(`Invalid Channel type ${type} is not a supported Monty#ChannelType`);
		}
		else {
			this.name = name;
			this.type = type;
		}

		// if channel is accessible to everyone
		this.isProtected = isProtected;

		// Array of roles allowed to access the channel
		this.roles = [];
	}

	addRole(role) {
		const castRole = Role.cast(role);
		this.roles.push(castRole);
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
		&& util.checkObjectHasProperty(object, 'type');

		if (!properties) {
			throw new Error(`Invalid Channel type passed: ${object} is not of type Monty#Channel`);
		}

		const channel = new Channel(object.name, object.type, object.isProtected);

		channel.addRoles(object.roles);

		return channel;;
	}
}

module.exports = Channel;