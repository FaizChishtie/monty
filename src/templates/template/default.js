const Channel = require('../class/Channel');
const Template = require('../class/Template');
const Category = require('../class/Category');
const Role = require('../class/Role');

const template = new Template('default', 'Default community template.');

const coolChannel = new Channel('Cool Channel', 'text');
const voiceChannel = new Channel('Table Tennis Room Clone', 'voice');
const protectedChannel = new Channel('Protected Channel', 'text', true);

// add channels

template.addChannels([
	coolChannel,
	voiceChannel,
	protectedChannel,
]);

// add roles

const montyRole = new Role('monty');

protectedChannel.addRole(montyRole);

template.addRole(montyRole);

// add categories

const montyCategory = new Category('Monty Generated');

montyCategory.addChannels([
	coolChannel,
	voiceChannel,
	protectedChannel,
]);

template.addCategory(montyCategory);

module.exports = template;