const logger = require('../../../logger');
const { Permissions } = require('discord.js');
const { buildPermissionsArrayWithRoles, permissionsArrayToString } = require('./util');
const { client } = require('../../../setup');

const createTextChannel = async (channel, interaction, reason = 'Monty created a new text channel for you.') => {
    logger.verbose(`Creating new Text Channel ${channel.name}`);

    const { guild } = interaction;

	const newChannel = await guild.channels.create(channel.name, { reason: reason });

	logger.info(`New Text Channel created ${newChannel}`);
};

const createPrivateTextChannel = async (channel, interaction, reason = 'Monty created a new private text channel for you.') => {
    const { guild } = interaction;

	const roleManager = guild.roles;
	const everyoneRole = roleManager.everyone;

    logger.verbose(`Creating new Private Text Channel ${channel.name}`);

    logger.verbose(`Building permissions for ${channel.name}`);

	const permissions = buildPermissionsArrayWithRoles(channel.roles, roleManager);

    logger.verbose(`Permissions built for ${channel.name} - ${permissionsArrayToString(permissions)}`);

	const newChannel = await guild.channels.create(channel.name, {
		reason: reason,
        permissions: [
            ...permissions,
            {type: 'member', id: message.author.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
            {type: 'member', id: client.user.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
            { type: 'role', id: everyoneRole.id, deny: [Permissions.FLAGS.VIEW_CHANNEL] },
        ]
	});

	logger.info(`New Private Text Channel created ${newChannel}`);
};

const createVoiceChannel = async (channel, interaction, reason = 'Monty created a new voice channel for you.') => {
    logger.verbose(`Creating new Voice Channel ${channel.name}`);

    const { guild } = interaction;

	const newChannel = await guild.channels.create(channel.name, {
		type: 'GUILD_VOICE',
		reason: reason,
	});

	logger.info(`New Voice Channel created ${newChannel}`);
};

const createPrivateVoiceChannel = async (channel, interaction, reason = 'Monty created a new private voice channel for you.') => {
    const { guild } = interaction;

	const roleManager = guild.roles;
	const everyoneRole = roleManager.everyone;

    logger.verbose(`Creating new Private Voice Channel ${channel.name}`);

    logger.verbose(`Building permissions for ${channel.name}`);

	const permissions = buildPermissionsArrayWithRoles(channel.roles, roleManager);

    logger.verbose(`Permissions built for ${channel.name} - ${permissionsArrayToString(permissions)}`);

	const newChannel = await guild.channels.create(channel.name, {
		type: 'GUILD_VOICE',
		reason: reason,
        permissions: [
            ...permissions,
            {type: 'member', id: message.author.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
            {type: 'member', id: client.user.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
            { type: 'role', id: everyoneRole.id, deny: [Permissions.FLAGS.VIEW_CHANNEL] },
        ]
	});

	logger.info(`New Private Voice Channel created ${newChannel}`);
};

module.exports = {
	createTextChannel,
	createPrivateTextChannel,
	createVoiceChannel,
	createPrivateVoiceChannel,
};