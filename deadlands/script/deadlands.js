/**
 * The Dice class is the class used to roll dices.
 */
class Dice {

	/**
	 * Constructor.
	 */
	constructor() {}

	/**
	 * @return the specified closed roll.
	 */
	static closed(dice) {
		return randomInteger(dice);
	}

	/**
	 * @return the specified open roll.
	 */
	static open(dice) {
		var roll = randomInteger(dice);
		return roll === dice ? roll + this.open(dice) : roll;
	}

}

/**
 * The Deadlands class is the main class to process the commands.
 */
class Deadlands {

	/**
	 * Constructor.
	 */
	constructor() {}

	/**
	 * Loads the Deadlands API.
	 */
	load() {
		log('Deadlands API loaded');
	}

	/**
	 * Registers the Deadlands API.
	 */
	register() {
		on('chat:message', this.handleMessage);
	}

	/**
	 * Handles the Deadlands API command.
	 * @param msg The message to handle.
	 */
	handleMessage(msg) {

		// Check msg is a Deadlands command
		if (msg.type != 'api') return;
		var args = msg.content.split(/\s+/);
		var cmd = args.shift().substring(1);
		if (cmd != 'dl') return;
		log("Handle Deadlands command");

		log(Dice.open(6));

	}

}

// Create deadlands singleton
var deadlands = deadlands || new Deadlands();

// Register the script
on('ready',function() {
	'use strict';
	deadlands.load();
	deadlands.register();
});