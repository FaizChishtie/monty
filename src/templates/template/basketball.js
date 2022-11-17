const Channel = require('../class/Channel');
const Template = require('../class/Template');
const Category = require('../class/Category');
const Role = require('../class/Role');

const template = new Template('basketball', 'Basketball community template.');

const basketballChannel = new Channel('Basketball Channel', 'text');
const voiceChannel = new Channel('Table Tennis Room', 'voice');
const protectedChannel = new Channel('Protected Channel', 'text', true);

// add channels

template.addChannels([
	basketballChannel,
	voiceChannel,
	protectedChannel,
]);

// add roles

const baller = new Role('baller');

protectedChannel.addRole(baller);

template.addRole(baller);

// add categories

const bbalCategory = new Category('Basketball And Stuff');

bbalCategory.addChannels([
	basketballChannel,
	voiceChannel,
	protectedChannel,
]);

template.addCategory(bbalCategory);

module.exports = template;