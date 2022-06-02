const logger = require('../../../logger');
const { Permissions } = require('discord.js');
const { buildPermissionsArrayWithRoles, permissionsArrayToString } = require('./util');

const createCategory = async (category, interaction, reason = 'Monty created a new category for you.') => {
    logger.verbose(`Creating new Category ${category.name}`);

    const { guild } = interaction;

	const newCategory = await guild.channels.create(category.name, {
		type: 'GUILD_CATEGORY',
		reason: reason,
	});

    logger.verbose(`Created new Category ${category.name}`);

	for (const channel of category.channels) {

        logger.verbose(`Adding channel ${channel.name} to Category: ${category.name}`);

		const foundChannel = guild.channels.cache.find(c => {
			let channelString = channel.name;

			if (channel.type === 'text') {
				channelString = channel.name.toLowerCase().replace(' ', '-');
			}

			return c.name === channelString;
		});

		if (foundChannel) {
			foundChannel.setParent(newCategory.id);

            logger.verbose(`Added channel ${channel.name} to Category: ${category.name}`);
		}
		else {
			logger.error(`Could not find channel ${channel}`);
		}
	}

	logger.info(`New Category created ${newCategory}`);
};

const createPrivateCategory = async (category, interaction, reason = 'Monty created a new private category for you.') => {
    logger.verbose(`Creating new Private Category ${category.name}`);

    const { guild } = interaction;

	const roleManager = guild.roles;
	const everyoneRole = roleManager.everyone;

	logger.verbose(`Building permissions for ${channel.name}`);

	const permissions = buildPermissionsArrayWithRoles(category.roles, roleManager);

    logger.verbose(`Permissions built for ${channel.name} - ${permissionsArrayToString(permissions)}`);

	const newCategory = await guild.channels.create(category.name, {
		type: 'GUILD_CATEGORY',
		reason: reason,
        permissions: [
            ...permissions,
            {type: 'member', id: interaction.author.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
            {type: 'member', id: client.user.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
            { type: 'role', id: everyoneRole.id, deny: [Permissions.FLAGS.VIEW_CHANNEL] },
        ]
	});

	for (const channel of category.channels) {

        logger.verbose(`Adding channel ${channel.name} to Category: ${category.name}`);

		const foundChannel = guild.channels.cache.find(c => {
			let channelString = channel.name;

			if (channel.type === 'text') {
				channelString = channel.name.toLowerCase().replace(' ', '-');
			}

			return c.name === channelString;
		});

		if (foundChannel) {
			foundChannel.setParent(newCategory.id);

            logger.verbose(`Added channel ${channel.name} to Category: ${category.name}`);
		}
		else {
			logger.error(`Could not find channel ${channel}`);
		}
	}

	logger.info(`New Private Category created ${newCategory}`);
};

module.exports = {
	createCategory,
	createPrivateCategory,
};