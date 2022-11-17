const fs = require('node:fs');
const path = require('node:path');
const logger = require('../logger');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../../secret/config.json');

const commands = [];
const commandsPath = path.join(__dirname, '../commands');

logger.info('Deploying commands from:');
logger.info(commandsPath);

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

logger.info('Command list:');

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	logger.info(`\t-${JSON.stringify(command.data.toJSON())}`);

	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		logger.info('Started refreshing guild application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		logger.info('Successfully reloaded guild application (/) commands.');
	}
	catch (error) {
		logger.error(error);
	}
})();