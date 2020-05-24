/**
 * The Deadlands module provides common tools for Deadlands Classic.
 */
var Deadlands = (function() {
	'use strict';

	/**
	 * The poker card order.
	 */
	const PokerColorCardOrder = {
		"♠": 1,
		"♥": 2,
		"♦": 3,
		"♣": 4
	}

	/**
	 * The poker card order.
	 */
	const PokerCardOrder = new Map()
		.set("RJo", 1)
		.set("A♠", 2)
		.set("A♥", 3)
		.set("A♦", 4)
		.set("A♣", 5)
		.set("K♠", 6)
		.set("K♥", 7)
		.set("K♦", 8)
		.set("K♣", 9)
		.set("Q♠", 10)
		.set("Q♥", 11)
		.set("Q♦", 12)
		.set("Q♣", 13)
		.set("Ja♠", 14)
		.set("Ja♥", 15)
		.set("Ja♦", 16)
		.set("Ja♣", 17)
		.set("10♠", 18)
		.set("10♥", 19)
		.set("10♦", 20)
		.set("10♣", 21)
		.set("9♠", 22)
		.set("9♥", 23)
		.set("9♦", 24)
		.set("9♣", 25)
		.set("8♠", 26)
		.set("8♥", 27)
		.set("8♦", 28)
		.set("8♣", 29)
		.set("7♠", 30)
		.set("7♥", 31)
		.set("7♦", 32)
		.set("7♣", 33)
		.set("6♠", 34)
		.set("6♥", 35)
		.set("6♦", 36)
		.set("6♣", 37)
		.set("5♠", 38)
		.set("5♥", 39)
		.set("5♦", 40)
		.set("5♣", 41)
		.set("4♠", 42)
		.set("4♥", 43)
		.set("4♦", 44)
		.set("4♣", 45)
		.set("3♠", 46)
		.set("3♥", 47)
		.set("3♦", 48)
		.set("3♣", 49)
		.set("2♠", 50)
		.set("2♥", 51)
		.set("2♦", 52)
		.set("2♣", 53)
		.set("BJo", 54);

	/**
	 * The Rolls class provides functionnalities to manage Deadlands rolls.
	 */
	class Rolls {

		/**
		 * Indicates if the specified rolls is a fumble.
		 * @parma rolls The rolls to interpret.
		 * @return true if the rolls is a fumble.
		 */
		static isFumble(rolls) {
			return rolls.size() === 0 ? false : parseFloat(rolls.numberOf(1)) >= parseFloat(rolls.size()/2);
		}

		/**
		 * Gets the number of success.
		 * @param value The rolls value to interpret.
		 * @param tn    The difficulty target number.
		 * @return the number rof success:
		 *     0 : Fail
		 *     1 : Success
		 *     2 : Success with one degree
		 *     N : Success with N-1 degrees
		 */
		static getSuccess(value, tn) {
			return value < tn ? 0 : Math.floor(value/5);
		}

		/**
		 * Gets the number of success for the specified skill roll.
		 * @param rolls    The rolls to interpret.
		 * @param tn       The difficulty target number.
		 * @param modifier The modifier to apply to the roll.
		 * @return the number of success:
		 *    -1 : Fumble
		 *     0 : Fail
		 *     1 : Success
		 *     2 : Success with one degree
		 *     N : Success with N-1 degrees
		 */
		static skill(rolls, tn, modifier) {
			return Rolls.isFumble(rolls) ? -1 : Rolls.getSuccess(rolls.max() + modifier, tn);
		}

		/**
		 * Gets the number of success for the specified unskill roll.
		 * @param rolls    The rolls to interpret.
		 * @param tn       The difficulty target number.
		 * @param modifier The modifier to apply to the roll.
		 * @return the number of success:
		 *    -1 : Fumble
		 *     0 : Fail
		 *     1 : Success
		 *     2 : Success with one degree
		 *     N : Success with N-1 degrees
		 */
		static unskill(rolls, tn, modifier) {
			return Rolls.isFumble(rolls) ? -1 : Rolls.getSuccess(Math.floor(rolls.max()/2) + modifier, tn);
		}
	
		static rollSkill(attribute, coordination, skill, tn, modifier) {
			if (skill > 0) {
				return skill(new Odin.Dices(attribute, skill).rolls(), tn, modifier);
			} else {
				return unskill(new Odin.Dices(attribute, coordination).rolls(), tn, modifier);
			}
		}

	}

	/**
	 * The PokerDeck class provides functionnalities to manage poker deck. It's used for
	 * the turn order, the huckster tricks.
	 */
	class PokerDeck {

		/**
		 * @constructor
		 */
		constructor() {
			this.deck = Array.from(PokerCardOrder.keys());
			this.given = new Map();
			this.discard = [];
		}

		/**
		 * Gives the specified number of cards to the specified character.
		 * @param id     The identifier of the token.
		 * @param number The number of cards to give.
		 * @return the array of given cards.
		 */
		give(id, number) {
			
		}

		/**
		 * Discards the specified cards
		 */
	}

	/**
	 * The TurnOrder class provides functionnalities to manage intiative, turns and rounds.
	 */
	class TurnOrder extends Odin.TurnOrder {

		/**
		 * @constructor
		 */
		constructor() {
			super(function(turn) {
				return Deadlands.PokerCardOrder.get(turn.pr);
			});
		}

		/**
		 * Starts the turn
		 */
		start() {
			
		}

		/**
		 * Starts a next round.
		 */
		newRound() {
			
		}

		/**
		 * Finishes
		 */
		finish() {
			
		}

//		/**
//		 * Gives the specified number of cards to the specified player.
//		 * @param player The identifier of the player for which to give cards.
//		 * @param size   The number of cards to give.
//		 * @return the instance.
//		 */
//		give(player, size) {
//			
//		}
//
//		/**
//		 * Discards the specified cards.
//		 * @param cards The cards to discard.
//		 * @return the instance.
//		 */
//		discard(cards) {
//			
//		}

	}

	/**
	 * The MessageHandler class is the main class to handle commands.
	 */
	class MessageHandler extends Odin.AbstractMessageHandler {

		/**
		 * @constructor
		 */
		constructor() {
			super();
		}

		/**
		 * @Override
		 */
		handleMessage(msg) {
			this.handleCommand(msg);
		}

		/**
		 * @Override
		 */
		processCommand(cmd, args) {
			if (cmd != 'dl') return;

			this.openRoll(2, 0, 0, 0);
		}

		/**
		 * Handles the specified roll.
		 * @param attribute    The attribute defines the number of dices to roll.
		 * @param coordination The skill or the coordination defines the type of dices to roll.
		 * @param modifier     The modifier to apply to the roll.
		 * @param tn           The difficulty target number.
		 */
		openRoll(size, dice, modifier, tn) {
			log("openRoll");

			var rolls = new Odin.Dices()
				.add(new Odin.Dice(8), 2)
				.add(new Odin.Dice(6), 4)
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
			html += "<td>" + rolls.numberOf(1) + "</td>";
			html += "</tr>";
			html += "<tr>";
			html += "<td>Fumble:</td>";
			html += "<td>" + Rolls.isFumble(rolls) + "</td>";
			html += "</tr>";
			html += "<tr>";
			html += "<td>Success:</td>";
			html += "<td>" + Rolls.getSuccess(7,5) + "</td>";
			html += "</tr>";
			html += "</table>";
			html += "</div>";
			sendChat("Summary", html);
		}

	}


	/**
	 * The message handler.
	 */
	const _handler = new MessageHandler();

	/**
	 * Handles the specified message.
	 * @param msg The message to handle.
	 */
	function handleMessage(msg) {
		_handler.handleMessage(msg);
	}

	/**
	 * @return the public elements.
	 */
	return  {
		PokerCardOrder: PokerCardOrder,
		Rolls : Rolls,
		TurnOrder: TurnOrder,
		handleMessage : handleMessage
	};

})();

/**
 * Registers the Deadlands module.
 */
on('ready',function() {
	'use strict';
	on('chat:message', (msg) => {
		Deadlands.handleMessage(msg);
	});
});