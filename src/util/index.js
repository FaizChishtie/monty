const _ = require('lodash');

const checkObjectHasProperty = (object, property) => {
	return _.has(object, property);
};

module.exports = {
	checkObjectHasProperty,
};