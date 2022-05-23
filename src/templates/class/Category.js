class Category {
	constructor(name) {
		this.name = name;
		this.channels = [];
	}

	addChannel(channel) {
		this.channels.push(channel);

		// if (this.#checkChannelType(channel)) {
		//     this.channels.push(channel);
		// } else {
		//     throw new Error(`Invalid Channel type passed: ${channel} is not of type Monty#Channel`);
		// }
	}

	addChannels(channels) {
		for (const channel of channels) {
			this.addChannel(channel);
		}
	}

	// #checkChannelType (channel) {
	//     return typeof channel === 'Channel';
	// }
}

module.exports = Category;