class DeadlandsRolls extends Rolls {

	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Gets the number of success.
	 * -1 : Fumble
	 *  0 : Fail
	 *  1 : Success
	 *  2 : Success with one degree
	 *  N : Success with N-1 degrees
	 * @param tn The difficulty target number.
	 * @return the number of success.
	 */
	result(tn) {
		if (super.size() === 0 ? false : parseFloat(super.numberOf(1)) >= parseFloat(this.rolls.length/2)) {
			return -1;
		}
		if (!super.atLeast(tn)) {
			return 0;
		}
		return Math.floor((this.max()-tn)/5) + 1;
	}

}

/**
 * The Deadlands class is the main class to process the commands.
 */
class Deadlands extends AbstractMessageHandler {

	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * @Override.
	 */
	handleMessage(msg) {
		this.handleCommand(msg);
	}

	/**
	 * @Override.
	 */
	processCommand(cmd, args) {
		if (cmd != 'dl') return;

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
		html += "<tr>";
		html += "<td>Max:</td>";
		html += "<td>" + rolls.max() + "</td>";
		html += "</tr>";
		html += "<tr>";
		html += "<td>Sum:</td>";
		html += "<td>" + rolls.sum() + "</td>";
		html += "</tr>";
		html += "<td>Resultat:</td>";
		html += "<td>" + rolls.atLeast(7) + "</td>";
		html += "</tr>";
		html += "<tr>";
		html += "<td>Nb of 1:</td>";
		html += "<td>" + rolls.matches(1) + "</td>";
		html += "</tr>";
		html += "<tr>";
		html += "<td>Fumble:</td>";
		html += "<td>" + rolls.fumble() + "</td>";
		html += "</tr>";
		html += "<tr>";
		html += "<td>Success:</td>";
		html += "<td>" + rolls.success(7,5) + "</td>";
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