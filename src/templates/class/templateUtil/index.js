const createTextChannel = async (channel, guild, reason = 'Monty created a new text channel for you.') => {
	const newChannel = await guild.channels.create(channel.name, { reason: reason });
};

const createPrivateTextChannel = async (channel, guild, reason = 'Monty created a new private text channel for you.') => {
	const newChannel = await guild.channels.create(channel.name, { reason: reason });
};

const createVoiceChannel = async (channel, guild, reason = 'Monty created a new voice channel for you.') => {
	const newChannel = await guild.channels.create(channel.name, {
		type: 'GUILD_VOICE',
		reason: reason,
	});
};

const createPrivateVoiceChannel = async (channel, guild, reason = 'Monty created a new private voice channel for you.') => {
	const newChannel = await guild.channels.create(channel.name, {
		type: 'GUILD_VOICE',
		reason: reason,
	});
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
			console.log(`Could not find channel ${channel}`);
		}
	}
};

const createPrivateCategory = async (category, guild, reason = 'Monty created a new private category for you.') => {
	const privateCategory = await guild.channels.create(category.name, {
		type: 'GUILD_CATEGORY',
		reason: reason,
	});

	for (const channel of category.channels) {
		const foundChannel = guild.channels.cache.find(c => {
			console.log(c);
			return c.name === channel.name;
		});
		foundChannel.setParent(privateCategory.id);
	}
};

const createRole = async (role, guild, reason = 'Monty created a new role for you.') => {
	const newRole = await guild.roles.create({
		data: {
			name: role.name,
			color: 'RANDOM',
		},
		reason: reason,
	});
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