const Category = require('./Category');
const Channel = require('./Channel');
const Role = require('./Role');
const templateUtil = require('./templateUtil');

class Template {
	constructor(name, description) {
		this.name = name;
		this.description = description;

		this.channels = [];
		this.categories = [];
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

	addCategory(category) {
		const castCategory = Category.cast(category);
		this.categories.push(castCategory);
	}

	addCategories(categories) {
		for (const category of categories) {
			this.addCategory(category);
		}
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

	static async buildTemplate(template, guild) {
		// Takes a template: Template and translates it to a discord sub command.

		// create roles
		for (const role of template.roles) {
			await templateUtil.role.createRole(role, guild);
		}

		// create channels
		for (const channel of template.channels) {
			if (channel.type === 'voice') {
				// voice channel
				if (channel.isProtected) {
					await templateUtil.channel.createPrivateVoiceChannel(channel, guild);
				}
				else {
					await templateUtil.channel.createVoiceChannel(channel, guild);
				}
			}
			else {
				// text channel
				/* eslint-disable no-lonely-if */
				if (channel.isProtected) {
					await templateUtil.channel.createPrivateTextChannel(channel, guild);
				}
				else {
					await templateUtil.channel.createTextChannel(channel, guild);
				}
			}
		}

		// create categories and assign channels to category
		for (const category of template.categories) {
			await templateUtil.category.createCategory(category, guild);
		}

	}
}

module.exports = Template;