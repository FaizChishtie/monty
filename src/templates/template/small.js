const Channel = require('../class/Channel');
const Template = require('../class/Template');
const Category = require('../class/Category');
const Role = require('../class/Role');

const template = new Template('tmp', 'small tmp');

// add roles

const tmp = new Role('TMP');

template.addRole(tmp);

// add channels

const tmpChannel = new Channel('TMP', 'text', true);

tmpChannel.addRole(tmp);

template.addChannels([
	tmpChannel,
]);

// add categories

const tmpCategory = new Category('TMPC');

tmpCategory.addChannels([
	tmpChannel,
]);

template.addCategory(tmpCategory);

module.exports = template;