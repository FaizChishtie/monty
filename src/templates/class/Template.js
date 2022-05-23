const util = require('./util');

class Template {
	constructor(name, description) {
		this.name = name;
		this.description = description;

		// Array<Channel>
		this.channels = [];
		// Array<Category>
		this.categories = [];
		// Array<Role>
		this.roles = [];
	}

	addChannel(channel) {
		this.channels.push(channel);

		// if (this.#checkChannelType(channel)) {
		//     this.channels.push(channel);
		// } else {
		//     throw new Error(`Invalid Channel type passed: ${JSON.stringify(channel)} is not of type Monty#Channel`);
		// }
	}

	addChannels(channels) {
		for (const channel of channels) {
			this.addChannel(channel);
		}
	}

	addCategory(category) {
		this.categories.push(category);

		// if (this.#checkCategoryType(category)) {
		//     this.categories.push(category);
		// } else {
		//     throw new Error(`Invalid Category type passed: ${category} is not of type Monty#Category`);
		// }
	}

	addCategories(categories) {
		for (const category of categories) {
			this.addCategory(category);
		}
	}

	addRole(role) {
		this.roles.push(role);
	}

	addRoles(roles) {
		for (const role of roles) {
			this.addRole(role);
		}
	}

	// #checkChannelType (channel) {
	//     return typeof channel === 'Channel';
	// }

	// #checkCategoryType (category) {
	//     return typeof category === 'Category';
	// }

	static async buildTemplate(template, guild) {
		// Takes a template: Template and translates it to a discord sub command.

		// create roles
		for (const role of template.roles) {
			await util.role.createRole(role, guild);
		}

		// create channels
		for (const channel of template.channels) {
			if (channel.type === 'voice') {
				// voice channel
				if (channel.isProtected) {
					await util.channel.createPrivateVoiceChannel(channel, guild);
				}
				else {
					await util.channel.createVoiceChannel(channel, guild);
				}
			}
			else {
				// text channel
				if (channel.isProtected) {
					await util.channel.createPrivateTextChannel(channel, guild);
				}
				else {
					await util.channel.createTextChannel(channel, guild);
				}
			}
		}

		// create categories and assign channels to category
		for (const category of template.categories) {
			await util.category.createCategory(category, guild);
		}

	}
}

module.exports = Template;