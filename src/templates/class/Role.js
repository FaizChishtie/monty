const util = require('../../util');

class Role {
	constructor(name, color = 'RANDOM') {
		this.name = name;
		this.color = color;
	}

	static cast(object) {
		const properties = util.checkObjectHasProperty(object, 'name')
		&& util.checkObjectHasProperty(object, 'color');

		if (!properties) {
			throw new Error(`Invalid Role type passed: ${object} is not of type Monty#Role`);
		}

		const role = new Role(object.name);

		return role;
	}
}

module.exports = Role;