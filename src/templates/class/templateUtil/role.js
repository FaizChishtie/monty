const logger = require('../../../logger');

const createRole = async (role, interaction, reason = 'Monty created a new role for you.') => {
    logger.verbose(`Creating new role ${role.name}`);

    const { guild } = interaction;

	await guild.roles.create({
		reason,
	})
		.then(async newRole => {
		// for some reason creating the role with the data was returning 'new role'
		// edit once created to have params required
			await newRole.edit({
				name: role.name,
				color: 'RANDOM',
			});

			logger.info(`New Role created ${newRole}`);
		});
};

module.exports = {
	createRole,
};