/**
 * The Roll class is the class used to dice roll.
 */
class Roll {

	/**
	 * Constructor.
	 */
	constructor() {}

	/**
	 * Rolls the specified type of dice.
	 * @param dice The type of dice to roll.
	 * @return the specified closed roll.
	 */
	static closed(dice) {
		return randomInteger(dice);
	}

	/**
	 * Rolls the specified type of dice.
	 * @param dice The type of dice to roll.
	 * @return the specified open roll.
	 */
	static open(dice) {
		var roll = randomInteger(dice);
		return roll === dice ? roll + this.open(dice) : roll;
	}

}

/**
 * The Rolls class is the class to manage pool of rolls.
 */
class Rolls {

	/**
	 * Constructor.
	 */
	constructor() {}

	/**
	 * Gets the maximum roll.
	 * @param rolls The rolls to watch.
	 * @return the maximum roll.
	 */
	static max(rolls) {
		return _.max(rolls);
	}

	/**
	 * Rolls the specified dices.
	 * @param size The number of dice to roll.
	 * @param dice The type of dice to roll.
	 * @return the dices rolls.
	 */
	static open(size, dice) {
		var rolls = [];
		for (var i=0; i<size; i+=1) {
			rolls.push(Roll.open(dice));
		}
		return rolls;
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

		
		this.openRoll(4, 6, 0, 5);

	}

	/**
	 * Handles the specified roll.
	 * @param size     The number of dices to roll.
	 * @param dice     The type of dices to roll.
	 * @param modifier The modifier to apply on the roll.
	 * @param tn       The target number.
	 */
	openRoll(size, dice, modifier, tn) {
		log("openRoll");
		var html = "";
		html += "<div class='sheet-rolltemplate-default'>";
		html += "<table>";
		html += "<caption>Jet " + size + " d " + dice + " with TN " + tn + "</caption>";
		html += "<tr>";
		html += "<td>Resultat</td>";
		html += "<td>" + Rolls.open(size, dice) + "</td>";
		html += "</tr>";
		html += "</table>";
		html += "</div>";
		sendChat("Summary", html);
	}

}

// Create Deadlands singleton
var deadlands = deadlands || new Deadlands();

// API message subscribtion.
on('ready',function() {
	'use strict';
	on('chat:message', (msg) => {
		deadlands.handleMessage(msg);
	});
});