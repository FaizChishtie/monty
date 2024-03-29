const logger = require('../logger');
const { client } = require('../setup');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		}
		catch (error) {
			logger.error(`There was an error while executing this command! ${error}`);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};