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