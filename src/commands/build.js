const Template = require('../templates/class/Template');
const { SlashCommandBuilder } = require('@discordjs/builders');

const templates = require('../templates');

const templateChoices = [];
const templateMap = new Map();

templates.forEach(template => {
	const name = template.name;

	const choice = {
		name: name,
		value: name,
	};

	templateChoices.push(choice);
	templateMap.set(name, template);
});

const buildCommand = new SlashCommandBuilder()
	.setName('build')
	.setDescription('Builds server from a template!')
	.addStringOption(option =>
		option.setName('template')
			.setDescription('The template your server will be built with.')
			.setRequired(true)
			.addChoices(...templateChoices),
	);

const reply = async (interaction, template) => {
	await interaction.reply(`Building server for ${interaction.guild.name} with template: ${template}`);
};

const close = async (interaction, template) => {
	await interaction.followUp(`Built ${interaction.guild.name} with template: ${template}`);
};

const buildFromTemplate = async (interaction, template) => {
	await Template.buildTemplate(template, interaction);
};

module.exports = {
	data: buildCommand,
	async execute(interaction) {
		const selectedTemplateString = interaction.options.getString('template');

		await reply(interaction, selectedTemplateString);

		const selectedTemplate = templateMap.get(selectedTemplateString);

		await buildFromTemplate(interaction, selectedTemplate);

		await close(interaction, selectedTemplateString);
	},
};
