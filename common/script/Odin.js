/**
 * The Odin module provides common tools for Roll20.
 */
var Odin = (function() {
	'use strict';

	/**
	 * The Strings class is an utility class with static methods to manage textual expressions.
	 */
	class Strings {

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
				for (let i=1; i<items.length; i++) {
					string += separator;
					string += items[i];
				}
			}
			return string;
		}

	}

	/**
	 * The Type enumerate defines all roll20 objects types.
	 */
	const Type = {
		PATH: 'path',
		TEXT: 'text',
		GRAPHIC: 'graphic',
		PAGE: 'page',
		CAMPAIGN: 'campaign',
		PLAYER: 'player',
		MACRO: 'macro',
		ROLLABLE_TABLE: 'rollabletable',
		TABLE_ITEM: 'tableitem',
		CHARACTER: 'character',
		ATTRIBUTE: 'attribute',
		ABILITY: 'ability',
		HANDOUT: 'handout',
		DECK: 'deck',
		CARD: 'card',
		HAND: 'hand',
		JUKEBOX_TRACK: 'jukeboxtrack',
		CUSTOM_FC: 'custfx'
	};

	/**
	 * The Property enumerate defines all roll20 objects properties.
	 */
	const Property = {
		CAMPAIGN: {
			INITIATIVE_PAGE: "initiativepage",
			TURN_ORDER: "turnorder",
			PLAYER_PAGE_ID: "playerpageid",
			PLAYER_SPECIFIC_PAGES: "playerspecificpages"
		},
		TURN_ORDER: {
			ID: "id",
			VALUE: "pr",
			NAME: "custom",
			PAGE_ID: "_pageid",
			MODIFIER: "formula"
		}
	};

	/**
	 * The poker card colors.
	 */
	const PokerCardColor = {
		SPADE: "♠",
		HEART: "♥",
		DIAMOND: "♦",
		CLUB: "♣"
	}

	/**
	 * The AbstractMessageHandler class is the base class to define a message handler.
	 */
	class AbstractMessageHandler {

		/**
		 * @constructor.
		 */
		constructor() {
			if (this.constructor === AbstractMessageHandler) {
				throw new TypeError("Abstract class AbstractMessageHandler cannot be instantiated directly");
			}
		}

		/**
		 * Handles the specified message. This method must be implemented.
		 * @param msg The message to handle.
		 */
		handleMessage(msg) {
			throw new Error("Method 'handleMessage' must be implemented");
		}

		/**
		 * Handles the api message.
		 * @param msg The message to handle.
		 */
		handleCommand(msg) {
			if (msg.type != 'api') return;
			var args = msg.content.split(/\s+/);
			var cmd = args.shift().substring(1);
			this.processCommand(cmd, args);
		}

		/**
		 * Processes the specified command.
		 * @param cmd The name of the command to process.
		 * @param args The arguments of the command to process.
		 */
		processCommand(msg) {
			throw new Error("Method 'handleMessage' must be implemented");
		}

	}

	/**
	 * The Test class defines a test to register in a testsuite.
	 */
	class Test {

		/**
		 * @constructor
		 * @param name   The name of the test.
		 * @param assert The function which defines the assertion to satisfy.
		 */
		constructor(name, assert) {
			this.name = name;
			this.assert = assert;
		}

		/**
		 * @returns the specified test evaluation.
		 */
		evaluate() {
			log((this.assert() === true ? "[OK    ]" : "[   NOK]") + ": " + this.name);
		}

	}

	/**
	 * The AbstractTestSuite class is the base class to define a testsuite.
	 */
	class TestSuite extends AbstractMessageHandler {

		/**
		 * @constructor
		 * @param name The name of the testsuite.
		 */
		constructor(name) {
			super();
			this.name = name;
			this.tests = [];
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
			if (cmd != 'test' || args[0] != this.name) return;
			log("--------> Launch all tests for module " + this.name);
			this.tests.forEach(t => t.evaluate());
		}

		/**
		 * Add the specified test.
		 * @param name   The name of the test.
		 * @param assert The assertion to satisfy.
		 * @return the instance.
		 */
		add(name, assert) {
			this.tests.push(new Test(name, assert));
			return this;
		}

	}

	/**
	 * The Dice class is the class used to manage dice roll.
	 */
	class Dice {

		/**
		 * @constructor.
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
		 * @return a dice roll value.
		 */
		value() {
			var value = randomInteger(this.side);
			return this.open === true && this.side === value ? value + this.value() : value;
		}

		/**
		 * @return a dice roll.
		 */
		roll() {
			return new Roll(this, this.value());
		}

		/**
		 * @return the textual expression of the instance.
		 */
		toString() {
			return "d" + this.side;
		}

	}

	/**
	 * The Dices class defines a pool of dices which can be rolled.
	 */
	class Dices {

		/**
		 * @constructor.
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
		 * @return a new rolls.
		 */
		roll() {
			var rolls = new Rolls();
			for (let [dice,size] of this.dices) {
				for (let i=0; i<size; i++) {
					rolls.add(dice.roll());
				}
			}
			return rolls;
		}

		/**
		 * @return the textual expression of the dices.
		 */
		toString() {
			var dices = [];
			for (let [dice,size] of this.dices) {
				dices.push(size + dice.toString());
			}
			return Strings.toString(dices, ", ");
		}

	}

	/**
	 * The Roll class defines a dice roll.
	 */
	class Roll {

		/**
		 * @constructor.
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

	/**
	 * The Rolls class defines a pool of dices rolls. It provides some utilities to
	 * interpret the result according to the game system.
	 */
	class Rolls {

		/**
		 * @constructor.
		 */
		constructor() {
			this.rolls = [];
		}

		/**
		 * @return the number of rolls.
		 */
		size() {
			return this.rolls.length;
		}

		/**
		 * @return all values.
		 */
		values() {
			return _.map(this.rolls, function(r) { return r.value; });
		}

		/**
		 * @return the minimum value of the rolls.
		 */
		min() {
			return _.min(this.values());
		}

		/**
		 * @return the maximum value of the rolls.
		 */
		max() {
			return _.max(this.values());
		}

		/**
		 * @return the sum of the values.
		 */
		sum() {
			return _.reduce(this.rolls, function(sum, r) { return sum + r.value; }, 0);
		}

		/**
		 * Gets the rolls which satisfy the specified predicate.
		 * @param predicate The predicate to satisfy.
		 * @return the matching rolls.
		 */
		get(predicate) {
			return _.filter(this.rolls, predicate);
		}

		/**
		 * Produces a new rolls by mapping each roll through the specified transformation function.
		 * @param to The transformation function.
		 * @return the instance.
		 */
		transform(to) {
			this.rolls = _.map(this.rolls, to);
			return this;
		}

		/**
		 * Rejects the rolls which satisfies the specified predicate.
		 * @param predicate The predicate to satisfy.
		 * @return the instance.
		 */
		reject(predicate) {
			this.rolls = _.reject(this.rolls, predicate);
			return this;
		}

		/**
		 * Filters the rolls which satisfies the specified predicate.
		 * @param predicate The predicate to satisfy.
		 * @return the filtered rolls.
		 */
		filter(predicate) {
			this.rolls = _.filter(this.rolls, predicate);
			return this;
		}

		/**
		 * Indicates if some roll satisfies the specified predicate.
		 * @param predicate The predicate to satisfy.
		 * @return true if some roll satisfies the predicate.
		 */
		some(predicate) {
			return _.some(this.rolls, predicate);
		}

		/**
		 * Counts the number of rolls which satisfy the specified predicate.
		 * @param predicate The predicate to satisfy.
		 * @return the number of satisfied rolls.
		 */
		count(predicate) {
			return _.filter(this.rolls, predicate).length;
		}

		/**
		 * Gets the number of rolls for which the value is equal to the specified one.
		 * @param value The value to search.
		 * @return the number of matching roll.
		 */
		numberOf(value) {
			return this.count(r => r.value === value);
		}

		/**
		 * Indicates if the greatest roll is greater or equal than the specified value.
		 * @param value The threshold to reach.
		 * @return true if the threshold has been reached.
		 */
		atLeast(value) {
			return this.some(function (r) { return r.value >= value; });
		}

		/**
		 * @return the textual expression of the rolls.
		 */
		toString() {
			return Strings.toString(this.rolls, ", ");
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

	}

	/**
	 * The Character class provides functionnality to manage a character.
	 */
	class Character {

		constructor(id) {
			this.id = id;
		}

		/**
		 * Gets the specified character.
		 * @param name The name of the character to get.
		 * @return the character.
		 */
		byName(name) {
			
		}

	}

	/**
	 * The TurnOrder class provides functionnalities to manage intiative, turns and rounds.
	 */
	class TurnOrder {

		/**
		 * Constructor.
		 * @param order The function which defines the order to set.
		 */
		constructor(order) {
			this.order = order;
		}
	
		/**
		 * @return true if the turn order is displayed.
		 */
		isDisplayed() {
			return Campaign().get(Odin.Property.CAMPAIGN.INITIATIVE_PAGE);
		}

		/**
		 * @return the turn order from parsing the campaign property.
		 */
		parse() {
			const to = Campaign().get(Odin.Property.CAMPAIGN.TURN_ORDER);
			return to === "" ? [] : JSON.parse(to);
		}

		/**
		 * Sets the specified turn order to the campaign property according to the specified order if defined.
		 * @param turnOrder The turn order to set.
		 * @return the instance.
		 */
		set(turnOrder) {
			const sorted = this.order != null ? _.sortBy(turnOrder, this.order) : turnOrder;
			Campaign().set(Odin.Property.CAMPAIGN.TURN_ORDER, JSON.stringify(sorted));
			return this;
		}

		/**
		 * Clears the current turn order.
		 * @return the instance.
		 */
		clear() {
			Campaign().set(Odin.Property.CAMPAIGN.TURN_ORDER, JSON.stringify(""));
			return this;
		}

		/**
		 * Shows the turn order.
		 * @return the instance.
		 */
		show() {
			Campaign().set(Odin.Property.CAMPAIGN.INITIATIVE_PAGE, true);
			return this;
		}

		/**
		 * Hides the turn order.
		 * @return the instance.
		 */
		hide() {
			Campaign().set(Odin.Property.CAMPAIGN.INITIATIVE_PAGE, false);
			return this;
		}

	}

	/**
	 * @return the public elements.
	 */
	return  {
		Strings: Strings,
		Type: Type,
		Property: Property,
		PokerCardColor: PokerCardColor,
		Test: Test,
		TestSuite: TestSuite,
		AbstractMessageHandler: AbstractMessageHandler,
		Dice: Dice,
		Dices: Dices,
		Roll: Roll,
		Rolls: Rolls,
		TurnOrder: TurnOrder
	};

})();