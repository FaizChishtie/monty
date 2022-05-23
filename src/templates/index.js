const fs = require('node:fs');
const path = require('node:path');

const templates = [];
const templatePath = path.join(__dirname, 'template');

const templateFiles = fs.readdirSync(templatePath).filter(file => file.endsWith('.js'));

for (const file of templateFiles) {
	const filePath = path.join(templatePath, file);
	const template = require(filePath);

	templates.push(template);
}

module.exports = templates;