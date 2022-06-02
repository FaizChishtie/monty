const logger = require('../../../logger');
const _ = require('lodash');
const { Permissions } = require('discord.js');

const buildPermissionsArrayWithRoles = (montyRoles, roleManager) => {
	const permissionsArray = [];

	logger.verbose(`Building permissions for each role in - ${montyRoles}`);

	for (const role of montyRoles) {
		logger.verbose(`Creating permission for role ${role.name}`);

		const discordRole = roleManager.cache.find(r => r.name === `${role.name}`);

		if (!discordRole) {
			logger.error(`Could not build permission with role ${role.name}. ${role.name} does not exist in this guild.`);
		}
		else {
			logger.verbose(`Found Discord Role ${role.name} : ${discordRole}`);

			const permission = {
				id: discordRole.id,
				allow: [Permissions.FLAGS.VIEW_CHANNEL],
			};

			logger.verbose(`Created permission for role ${role.name}`);

			permissionsArray.push(permission);
		}
	}

	return permissionsArray;
};

const permissionsArrayToString = permissionsArray => {
	let outString = '';

	for (const permission of permissionsArray) {
		let outAllowString = '';

		if (_.isArray(permission.allow)) {
			for (let i = 0; i < permission.allow.length; i++) {
				if (i != permission.allow.length - 1) {
					outAllowString += permission.allow[i] + ', ';
				}
				else {
					outAllowString += permission.allow[i];
				}
			}
		}
		else {
			outAllowString += permission.allow;
		}

		const permissionString = `Permission: { "id" : "${permission.id}", "allow" : "${outAllowString}" }`;

		outString += permissionString + '; ';
	}

	return outString;
};

module.exports = {
	buildPermissionsArrayWithRoles,
	permissionsArrayToString,
};