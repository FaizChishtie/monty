const logger = require('../../../logger');

const createTextChannel = async (channel, guild, reason = 'Monty created a new text channel for you.') => {
	const newChannel = await guild.channels.create(channel.name, { reason: reason });

	logger.info(`New Text Channel created ${newChannel}`);
};

const createPrivateTextChannel = async (channel, guild, reason = 'Monty created a new private text channel for you.') => {
	const newChannel = await guild.channels.create(channel.name, { reason: reason });

	logger.info(`New Private Text Channel created ${newChannel}`);
};

const createVoiceChannel = async (channel, guild, reason = 'Monty created a new voice channel for you.') => {
	const newChannel = await guild.channels.create(channel.name, {
		type: 'GUILD_VOICE',
		reason: reason,
	});

	logger.info(`New Voice Channel created ${newChannel}`);
};

const createPrivateVoiceChannel = async (channel, guild, reason = 'Monty created a new private voice channel for you.') => {
	const newChannel = await guild.channels.create(channel.name, {
		type: 'GUILD_VOICE',
		reason: reason,
	});

	logger.info(`New Private Voice Channel created ${newChannel}`);
};

const createCategory = async (category, guild, reason = 'Monty created a new category for you.') => {
	const newCategory = await guild.channels.create(category.name, {
		type: 'GUILD_CATEGORY',
		reason: reason,
	});

	for (const channel of category.channels) {
		const foundChannel = guild.channels.cache.find(c => {
			let channelString = channel.name;

			if (channel.type === 'text') {
				channelString = channel.name.toLowerCase().replace(' ', '-');
			}

			return c.name === channelString;
		});

		if (foundChannel) {
			foundChannel.setParent(newCategory.id);
		}
		else {
			logger.error(`Could not find channel ${channel}`);
		}
	}

	logger.info(`New Category created ${newCategory}`);
};

const createPrivateCategory = async (category, guild, reason = 'Monty created a new private category for you.') => {
	const newCategory = await guild.channels.create(category.name, {
		type: 'GUILD_CATEGORY',
		reason: reason,
	});

	for (const channel of category.channels) {
		const foundChannel = guild.channels.cache.find(c => {
			console.log(c);
			return c.name === channel.name;
		});
		foundChannel.setParent(newCategory.id);
	}

	logger.info(`New Private Category created ${newCategory}`);
};

const createRole = async (role, guild, reason = 'Monty created a new role for you.') => {
	const newRole = await guild.roles.create({
		data: {
			name: role.name,
			color: 'RANDOM',
		},
		reason: reason,
	});

	logger.info(`New Role created ${newRole}`);
};

module.exports = {
	channel: {
		createTextChannel,
		createPrivateTextChannel,
		createVoiceChannel,
		createPrivateVoiceChannel,
	},
	category: {
		createCategory,
		createPrivateCategory,
	},
	role: {
		createRole,
	},
};