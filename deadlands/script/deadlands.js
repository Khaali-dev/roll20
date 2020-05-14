/**
 * The Tool class is an utility class with static methods.
 */
class Tools {

	/**
	 * Creates a string with ordered items. Each item will be separated by the specified separator.
	 * @param items     The items to serialize.
	 * @param separator The item separator.
	 * @return the string.
	 */
	static toString(items, separator) {
		var string = "";
		if (items.length > 0) {
			string += items[0];
			for (var i=1; i<items.length; i++) {
				string += separator;
				string += items[i];
			}
		}
		return string;
	}

}

/**
 * The Dice class is the class used to manage dice roll.
 */
class Dice {

	/**
	 * Constructor.
	 * @param side The number of side.
	 */
	constructor(side) {
		this.side = side;
		this.open = true;
	}

	/**
	 * Open the dice.
	 * @return the dice.
	 */
	open() {
		this.open = true;
		return this;
	}

	/**
	 * Closes the dice.
	 * @return the dice.
	 */
	close() {
		this.open = false;
		return this;
	}

	/**
	 * @return the dice roll.
	 */
	roll() {
		var value = randomInteger(this.side);
		return this.open === true && this.side === value ? value + this.roll() : value;
	}

	/**
	 * @return the textual expression of the instance.
	 */
	toString() {
		return "d" + this.side;
	}

}

/**
 * The Dices class is the class to manage pool of dices. Dices can be rolled to get rolls.
 */
class Dices {

	/**
	 * Constructor.
	 */
	constructor() {
		this.dices = new Map();
	}

	/**
	 * Removes all dices.
	 * @eturn the instance.
	 */
	clear() {
		this.dices = new Map();
		return this;
	}

	/**
	 * Adds the specified dices.
	 * @param dice The type of dice to add.
	 * @param size The number of dices to add.
	 * @eturn the instance.
	 */
	add(dice, size) {
		this.dices.set(dice, size);
		return this;
	}

	/**
	 * @return a dices rolls.
	 */
	roll() {
		var rolls = new Rolls();
		for (var [dice,size] of this.dices) {
			for (var i=0; i<size; i++) {
				rolls.add(new Roll(dice, dice.roll()));
			}
		}
		return rolls;
	}

}

class Roll {

	/**
	 * Constructor.
	 * @param dice  The rolled dice.
	 * @param value The roll value.
	 */
	constructor(dice, value) {
		this.dice = dice;
		this.value = value;
	}

	/**
	 * @return the textual expression of the instance.
	 */
	toString() {
		return this.value + "(" + this.dice.toString() + ")";
	}

}

class Rolls {

	/**
	 * Constructor.
	 */
	constructor() {
		this.rolls = [];

	}

	/**
	 * Adds the specified roll.
	 * @param roll The roll to add.
	 * @eturn the instance.
	 */
	add(roll) {
		this.rolls.push(roll);
		return this;
	}


	/**
	 * @return the textual expression of the rolls.
	 */
	toString() {
		return Tools.toString(this.rolls, ", ");
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

		this.openRoll(2, 0, 0, 0);

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

		var rolls = new Dices()
			.add(new Dice(8), 2)
			.add(new Dice(6), 4)
			.roll();
	
		var html = "";
		html += "<div class='sheet-rolltemplate-default'>";
		html += "<table>";
		html += "<caption>Jet " + size + "d" + dice + " avec SD " + tn + "</caption>";
		html += "<tr>";
		html += "<td>Dés:</td>";
		html += "<td>" + rolls.toString() + "</td>";
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