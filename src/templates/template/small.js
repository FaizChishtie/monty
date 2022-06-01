const Channel = require('../class/Channel');
const Template = require('../class/Template');
const Category = require('../class/Category');
const Role = require('../class/Role');

const template = new Template('tmp', 'small tmp');

const tmpChannel = new Channel('TMP', 'text', true);

// add channels

template.addChannels([
	tmpChannel,
]);

// add roles

const tmp = new Role('TMP');

tmpChannel.addRole(tmp);

template.addRole(tmp);

// add categories

const tmpCategory = new Category('TMPC');

tmpCategory.addChannels([
	tmpChannel
]);

template.addCategory(tmpCategory);

module.exports = template;