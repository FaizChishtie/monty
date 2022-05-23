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
		this.roles.push(role);
	}

	addRoles(roles) {
		for (const role of roles) {
			this.addRole(role);
		}
	}
}

module.exports = Channel;