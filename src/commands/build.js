const { SlashCommandBuilder } = require('@discordjs/builders');

const templates = require('../templates');

const buildCommand = new SlashCommandBuilder()
	.setName('build')
	.setDescription('Builds server from a template!')
	.addStringOption(option =>
		option.setName('template')
			.setDescription('The template your server will be built with.')
			.setRequired(true)
			.addChoices({
                name: templates[0].name,
                value: `~${templates[0].name}`
            })
    );

const reply = async (interaction, template) => {
	await interaction.reply(`Building server for ${interaction.guild.name} with template: ${template}`);
};

const close = async (interaction, template) => {
	await interaction.followUp(`Built ${interaction.guild.name} with template: ${template}`);
};

module.exports = {
	data: buildCommand,
	async execute(interaction) {
		const selectedTemplate = interaction.options.getString('template');

		await reply(interaction, selectedTemplate);

        console.log(templates[0].name);
        console.log(selectedTemplate);

		await close(interaction, selectedTemplate);
	},
};
