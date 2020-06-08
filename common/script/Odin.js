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
	 * The Rankable class defines rankable object.
	 */
	class Rankable {

		/**
		 * @constructor
		 * @param name The name of the rankable object.
		 * @param rank The rank of the rankable object, from 1 to the lower priority.
		 */
		constructor(name, rank) {
			this.name = name;
			this.rank = rank;
		}

	}

	/**
	 * The Rankables class defines rankable objects. Name of the rankable objects are
	 * used for registration.
	 */
	class Rankables {

		/**
		 * @constructor
		 * @param name The name of the rankable object.
		 * @param rank The rank of the rankable object, from 1 to the lower priority.
		 */
		constructor(name, rank) {
			this.rankables = new Map();
		}

		/**
		 * Registers the specified rankable object.
		 * @param rankable The rankable object to register.
		 * @return the instance.
		 */
		withRankable(rankable) {
			this.rankables.set(rankable.name, rankable);
			return this;
		}

		/**
		 * Returns the rank of the specified object.
		 * @param name The name of the object for which to get the rank.
		 * @return the rank.
		 */
		rank(name) {
			const r = this.rankables.get(name);
			return r == null ? null : r.rank;
		}

	}

	/**
	 * The AbstractEventHandler class is the base class to define a message handler.
	 */
	class AbstractEventHandler {

		/**
		 * @constructor
		 */
		constructor() {
			if (this.constructor === AbstractEventHandler) {
				throw new TypeError("Abstract class AbstractEventHandler cannot be instantiated directly");
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
		 * @param wip    True if work in progress.
		 * @param assert The function which defines the assertion to satisfy.
		 */
		constructor(name, wip, assert) {
			this.name = name;
			this.wip = wip;
			this.assert = assert;
		}

		/**
		 * @returns the specified test evaluation.
		 */
		evaluate() {
			const inProgress = this.wip === true ? "[WIP] " : "[   ] ";
			try {
				log(inProgress + (this.assert() === true ? "[OK    ]" : "[   NOK]") + ": " + this.name);
			} catch (exception) {
				log(inProgress + "[   NOK]: " + this.name + " because exception has been raised");
			}
		}

		/**
		 * Asserts the specified assertion is true.
		 * @param assertion The assertion to evaluate.
		 * @return true if the specified assertion is true.
		 */
		static assertTrue(assertion) {
			return assertion === true;
		}

		/**
		 * Asserts the specified assertion is false.
		 * @param assertion The assertion to evaluate.
		 * @return true if the specified assertion is false.
		 */
		static assertFalse(assertion) {
			return assertion === false;
		}

		/**
		 * Checks the value is not null.
		 * @param value The value to check.
		 * @return true if value is not null;
		 */
		static assertNotNull(value) {
			const assert = value != null;
			if (!assert) {
				log(assert);
			}
			return assert;
		}

		/**
		 * Checks the array is not null or empty.
		 * @param array The array to check.
		 * @return true if array is not empty or null;
		 */
		static assertNotEmptyArray(array) {
			const assert = Array.isArray(array) && array.length > 0;
			if (!assert) {
				log(assert);
			}
			return assert;
		}

		/**
		 * Checks the array is empty.
		 * @param array The array to check.
		 * @return true if array is empty;
		 */
		static assertEmptyArray(array) {
			const assert = Array.isArray(array) && _.size(array) === 0;
			if (!assert) {
				log(assert);
			}
			return assert;
		}

		/**
		 * Checks the object is null or empty.
		 * @param object The object to check.
		 * @return true if object is empty or null;
		 */
		static assertEmptyObject(object) {
			const assert = !_.isObject(object) || _.isEmpty(object);
			if (!assert) {
				log(assert);
			}
			return assert;
		}

		/**
		 * Checks the object is not null or empty.
		 * @param object The object to check.
		 * @return true if object is not empty or null;
		 */
		static assertNotEmptyObject(object) {
			const assert = _.isObject(object) && !_.isEmpty(object);
			if (!assert) {
				log(assert);
			}
			return assert;
		}
	
		/**
		 * Checks both arrays are equals.
		 * @param array1 The first array to check.
		 * @param array2 The second array to check.
		 * @return true if both arrays are equals.
		 */
		static assertArrayEqual(array1, array2) {
			return JSON.stringify(array1)==JSON.stringify(array2)
		}

	}

	/**
	 * The AbstractTestSuite class is the base class to define a testsuite.
	 */
	class TestSuite extends AbstractEventHandler {

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
		 * @Override
		 */
		handleMessage(msg) {
			this.handleCommand(msg);
		}

		/**
		 * @Override
		 */
		processCommand(cmd, args) {
			if (cmd != 'test' || args[0] != this.name) return;
			log("--------> Launch all tests for module " + this.name);
			this.tests.forEach(t => t.evaluate());
		}

		/**
		 * Add the specified test.
		 * @param name   The name of the test.
		 * @param wip    True if work in progress.
		 * @param assert The assertion to satisfy.
		 * @return the instance.
		 */
		add(name, wip, assert) {
			this.tests.push(new Test(name, wip, assert));
			return this;
		}

	}

	/**
	 * The PokerColor class defines poker color.
	 */
	class PokerColor extends Rankable {

		/**
		 * @constructor
		 * @param name The name of the poker color.
		 * @param rank The rank of the color, from 1 to the lower priority.
		 * 
		 */
		constructor(name, rank) {
			super(name, rank);
		}

	}

	/**
	 * The PokerCard class defines poker card.
	 */
	class PokerCard extends Rankable {

		/**
		 * @constructor
		 * @param name The name of the poker card.
		 * @param rank The rank of the card, from 1 to the lower priority.
		 * 
		 */
		constructor(name, rank) {
			super(name, rank);
		}

	}

	/**
	 * The poker card colors.
	 */
	const PokerColors = new Rankables()
		.withRankable(new PokerColor('♠', 1))
		.withRankable(new PokerColor('♥', 2))
		.withRankable(new PokerColor('♦', 3))
		.withRankable(new PokerColor('♣', 4));

	/**
	 * The poker cards.
	 */
	const PokerCards = new Rankables()
		.withRankable(new PokerCard('RJo', 1))
		.withRankable(new PokerCard('A♠', 2))
		.withRankable(new PokerCard('A♥', 3))
		.withRankable(new PokerCard('A♦', 4))
		.withRankable(new PokerCard('A♣', 5))
		.withRankable(new PokerCard('K♠', 6))
		.withRankable(new PokerCard('K♥', 7))
		.withRankable(new PokerCard('K♦', 8))
		.withRankable(new PokerCard('K♣', 9))
		.withRankable(new PokerCard('Q♠', 10))
		.withRankable(new PokerCard('Q♥', 11))
		.withRankable(new PokerCard('Q♦', 12))
		.withRankable(new PokerCard('Q♣', 13))
		.withRankable(new PokerCard('Ja♠', 14))
		.withRankable(new PokerCard('Ja♥', 15))
		.withRankable(new PokerCard('Ja♦', 16))
		.withRankable(new PokerCard('Ja♣', 17))
		.withRankable(new PokerCard('10♠', 18))
		.withRankable(new PokerCard('10♥', 19))
		.withRankable(new PokerCard('10♦', 20))
		.withRankable(new PokerCard('10♣', 21))
		.withRankable(new PokerCard('9♠', 22))
		.withRankable(new PokerCard('9♥', 23))
		.withRankable(new PokerCard('9♦', 24))
		.withRankable(new PokerCard('9♣', 25))
		.withRankable(new PokerCard('8♠', 26))
		.withRankable(new PokerCard('8♥', 27))
		.withRankable(new PokerCard('8♦', 28))
		.withRankable(new PokerCard('8♣', 29))
		.withRankable(new PokerCard('7♠', 30))
		.withRankable(new PokerCard('7♥', 31))
		.withRankable(new PokerCard('7♦', 32))
		.withRankable(new PokerCard('7♣', 33))
		.withRankable(new PokerCard('6♠', 34))
		.withRankable(new PokerCard('6♥', 35))
		.withRankable(new PokerCard('6♦', 36))
		.withRankable(new PokerCard('6♣', 37))
		.withRankable(new PokerCard('5♠', 38))
		.withRankable(new PokerCard('5♥', 39))
		.withRankable(new PokerCard('5♦', 40))
		.withRankable(new PokerCard('5♣', 41))
		.withRankable(new PokerCard('4♠', 42))
		.withRankable(new PokerCard('4♥', 43))
		.withRankable(new PokerCard('4♦', 44))
		.withRankable(new PokerCard('4♣', 45))
		.withRankable(new PokerCard('3♠', 46))
		.withRankable(new PokerCard('3♥', 47))
		.withRankable(new PokerCard('3♦', 48))
		.withRankable(new PokerCard('3♣', 49))
		.withRankable(new PokerCard('2♠', 50))
		.withRankable(new PokerCard('2♥', 51))
		.withRankable(new PokerCard('2♦', 52))
		.withRankable(new PokerCard('2♣', 53))
		.withRankable(new PokerCard('BJo', 54));

	/**
	 * The base class for all roll20 wrapped object.
	 */
	class Object {

		/**
		 * @constructor.
		 * @param type    The type of the object.
		 * @param subtype The optional subtype of the object.
		 */
		constructor(type, subtype) {
			this.type = type;
			this.subtype = subtype;
			this.obj = null;
		}

		/**
		 * Finds the object with the specified identifier.
		 * @param id The identifier of the object to find.
		 * @return the instance.
		 */
		findId(id) {
			if (this.subtype != null) {
				const o = getObj(this.type, id);
				this.obj = o != null && o.get('_subtype') === this.subtype ? o : null;
			} else {
				this.obj = getObj(this.type, id);
			}
			return this;
		}

		/**
		 * Sets the specified object.
		 * @param obj The object to set.
		 * @return the instance.
		 */
		setObject(obj) {
			this.obj = obj;
			return this;
		}

		/**
		 * Finds the only object with the specified property. The object is reset if no or more than one object match.
		 * @param type    The type of the objects to get.
		 * @param subtype The subtype of the objects to get.
		 * @param key     The name of the property used to query the object.
		 * @param value   The value of the property used to query the object.
		 * @return the instance.
		 */
		static _findProperty(type, subtype, key, value) {
			return Objects._only(Objects._findProperty(type, subtype, key, value));
		}

	}

	/**
	 * The base class for roll20 object collections.
	 */
	class Objects {

		/**
		 * @constructor.
		 * @param type    The type of the object.
		 * @param subtype The optional subtype of the object.
		 */
		constructor(type, subtype) {
			this.type = type;
			this.subtype = subtype;
			this.objs = null;
		}

		/**
		 * @return all objects.
		 */
		findAll() {
			this.objs = Objects._findAll(this.type, this.subtype);
			return this;
		}

		/**
		 * Filters the objects
		 * @param predicate The predicate to realize.
		 * @return the instance.
		 */
		filter(predicate) {
			this.objs = _.filter(this.objs, predicate);
			return this;
		}

		/**
		 * Sets the specified objects.
		 * @param objs The objects to set.
		 * @return the instance.
		 */
		setObjects(objs) {
			this.objs = objs;
			return this;
		}

		/**
		 * Gets the only objects of the specified collection.
		 * @param objs The objects to watch.
		 * @return the only object or null if none or more than one.
		 */
		static _only(objs) {
			return _.isUndefined(objs) || _.size(objs) === 0 || _.size(objs) > 1 ? null : _.first(objs);
		}

		/**
		 * Finds all the objects.
		 * @param type    The type of the objects to get.
		 * @param subtype The subtype of the objects to get.
		 * @return the matching objects.
		 */
		static _findAll(type, subtype) {
			return subtype != null ?
				findObjs({_type: type, _subtype: subtype}) :
				findObjs({_type: type});
		}

		/**
		 * Finds the objects with the specified property.
		 * @param type    The type of the objects to get.
		 * @param subtype The subtype of the objects to get.
		 * @param key     The name of property of the objects to get.
		 * @param value   The value of property of the objects to get.
		 * @return the matching objects.
		 */
		static _findProperty(type, subtype, key, value) {
			const query = subtype != null ? { _type: type, _subtype: subtype } : { _type: type };
			query[key] = value;
			return findObjs(query);
		}

	}

	/**
	 * The Player class provides features to get and manipulate a player.
	 */
	class Player extends Object {

		/**
		 * @constructor.
		 */
		constructor() {
			super('player', null);
		}

		/**
		 * Finds the specified player.
		 * @param name The name of the player to find.
		 * @return the instance.
		 */
		findName(name) {
			this.obj = Object._findProperty(this.type, this.subtype, '_displayname', name);
			return this;
		}

		/**
		 * @eturn true if the player is online.
		 */
		isOnline() {
			return this.obj != null && this.obj.get('_online') === true;
		}

		/**
		 * @return true if the player is online and a game master. 
		 */
		isMaster() {
			return this.obj != null && playerIsGM(this.obj.get('id')) === true;
		}

		/**
		 * @return true if the player is online and not a game master. 
		 */
		isPlayer() {
			return this.obj != null && playerIsGM(this.obj.get('id')) === false;
		}

	}

	/**
	 * The Players class provides functionnalities to get and filter players.
	 */
	class Players extends Objects {

		/**
		 * @constructor.
		 */
		constructor() {
			super('player', null);
		}

		/**
		 * Finds the online or offline players.
		 * @param online True if players must be online.
		 * @return the instance.
		 */
		findOnline(online) {
			this.objs = Objects._findProperty(this.type, this.subtype, '_online', online);
			return this;
		}

		/**
		 * Finds the players or the game masters.
		 * @param master True if players must be game master.
		 * @return filtered players.
		 */
		filterMaster(master) {
			return this.filter(function(obj) { return (playerIsGM(obj.get('id')) === master); });
		}

	}

	/**
	 * The Page class provides features to get and manipulate a page.
	 */
	class Page extends Object {

		/**
		 * @constructor.
		 */
		constructor() {
			super('page', null);
		}

	}

	/**
	 * The Pages class provides functionnalities to get and filter pages.
	 */
	class Pages extends Objects {

		/**
		 * @constructor.
		 */
		constructor() {
			super('page', null);
		}

	}

	/**
	 * The Character class provides features to get and manipulate a character.
	 */
	class Character extends Object {

		/**
		 * @constructor.
		 */
		constructor() {
			super('character', null);
		}

		/**
		 * @return true if the character is a player character. 
		 */
		isPlayerCharacter() {
			return this.obj != null && this.obj.get('controlledby') != '';
		}

	}

	/**
	 * The Characters class provides functionnalities to get and filter characters.
	 */
	class Characters extends Objects {

		/**
		 * @constructor.
		 */
		constructor() {
			super('character', null);
		}

		/**
		 * Finds the specified characters.
		 * @param name The name of the characters to find.
		 * @return the instance.
		 */
		findName(name) {
			this.objs = Objects._findProperty(this.type, this.subtype, 'name', name);
			return this;
		}

	}

	/**
	 * The Token class provides features to get and manipulate a token.
	 * Token must be on the table since getters only returns visible tokens.
	 */
	class Token extends Object {

		/**
		 * @constructor.
		 */
		constructor() {
			super('graphic', 'token');
		}

	}

	/**
	 * The Tokens class provides functionnalities to get and filter tokens.
	 * Tokens must be on the table since getters only returns visible tokens.
	 */
	class Tokens extends Objects {

		/**
		 * @constructor.
		 */
		constructor() {
			super('graphic', 'token');
		}

	}

	/**
	 * The Deck class provides features to get and manipulate a deck.
	 */
	class Deck extends Object {

		/**
		 * @constructor.
		 */
		constructor() {
			super('deck', null);
		}

		/**
		 * Finds the specified deck.
		 * @param name The name of the deck to find.
		 * @return the instance.
		 */
		findName(name) {
			this.obj = Object._findProperty(this.type, this.subtype, 'name', name);
			return this;
		}

		/**
		 * Recalls cards.
		 * @return the instance.
		 */
		recall() {
			recallCards(this.obj.get('id'));
			return this;
		}

		/**
		 * Shuffles cards.
		 * @return the instance.
		 */
		shuffle() {
			shuffleDeck(this.obj.get('id'));
			return this;
		}

	}

	/**
	 * The Decks class provides functionnalities to get and filter decks.
	 */
	class Decks extends Objects {

		/**
		 * @constructor.
		 */
		constructor() {
			super('deck', null);
		}

	}

	/**
	 * The Card class provides features to get and manipulate a token.
	 */
	class Card extends Object {

		/**
		 * @constructor.
		 */
		constructor() {
			super('graphic', 'card');
		}

		/**
		 * Finds the card with the specified id.
		 * @param id The identifier of the card to find, that is not the graphic id.
		 * @return the instance.
		 */
		findId(id) {
			this.obj = getObj(this.subtype, id);
			return this;
		}

	}

	/**
	 * The Cards class provides functionnalities to get and filter cards.
	 */
	class Cards extends Objects {

		/**
		 * @constructor.
		 */
		constructor() {
			super('graphic', 'card');
		}

		/**
		 * Finds all cards on the table regardless of the decks.
		 * @return the instance.
		 */
		findTable() {
			this.objs = _.chain(this.findAll().objs)
			             .map(obj => getObj(Property.GRAPHIC.CARD, obj.get('cardid')))
			             .reject(_.isUndefined)
			             .value();
			return this;
		}

		/**
		 * Finds all cards from the specified deck since the last shuffle.
		 * @param id The identifier of the deck where to find cards.
		 * @return the instance.
		 */
		findDeck(id) {
			const deck = new Odin.Deck().findId(id);
			if (deck != null && deck.obj != null) {
				this.objs = _.chain(deck.obj.get('currentDeck').split(/\s*,\s*/))
				             .map(cardid => getObj('card', cardid))
				             .reject(_.isUndefined)
				             .value();
			} else {
				this.objs = null;
			}
			return this;
		}

	}

	/**
	 * The Hand class provides features to get and manipulate a hand.
	 */
	class Hand extends Object {

		/**
		 * @constructor.
		 */
		constructor() {
			super('hand', null);
		}

	}

	/**
	 * The Hands class provides functionnalities to get and filter hands.
	 */
	class Hands extends Objects {

		/**
		 * @constructor.
		 */
		constructor() {
			super('hand', null);
		}

	}

	/**
	 * The Dice class is the class used to manage dice roll.
	 */
	class Dice {

		/**
		 * @constructor
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
		 * @constructor
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
		 * @constructor
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
		 * @constructor
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
	 * The Turn class defines registrable item of the turn order.
	 */
	class Turn {

		/**
		 * @constructor
		 * @param id The identifier of the graphic object.
		 * @param pr The value of the turn.
		 */
		constructor(id, pr) {
			this.id = id;
			this.pr = pr;
			this.custom = "";
		}

	}

	/**
	 * The TurnOrder class provides functionnalities to manage intiative, turns and rounds.
	 */
	class TurnOrder {

		/**
		 * @constructor
		 * @param order The function which defines the order to set.
		 */
		constructor(order) {
			this.order = order;
		}

		/**
		 * @return true if the turn order is displayed.
		 */
		isDisplayed() {
			return Campaign().get('initiativepage');
		}

		/**
		 * @return the turn order from parsing the campaign property.
		 */
		parse() {
			const to = Campaign().get('turnorder');
			return to === "" ? [] : JSON.parse(to);
		}

		/**
		 * Clears the current turn order.
		 * @return the instance.
		 */
		clear() {
			Campaign().set('turnorder', '[]');
			return this;
		}

		/**
		 * Sets the specified turn order to the campaign property according to the specified order if defined.
		 * @param turnOrder The turn order to set.
		 * @return the instance.
		 */
		set(turnOrder) {
			const turns = this.order != null ? _.sortBy(turnOrder, this.order) : turnOrder;
			Campaign().set('turnorder', JSON.stringify(turns));
			return this;
		}

		/**
		 * Adds the specified turns.
		 * @param turns The turns to add.
		 * @return the instance.
		 */
		add(turns) {
			return this.set(this.parse().concat(turns));
		}

		/**
		 * Inserts the specified turns at the top of the turn order, regardless of the order.
		 * @param turns The turns sto insert.
		 * @return the instance.
		 */
		insert(turns) {
			const _turns = this.parse();
			_.each(turns, function(t) {
				_turns.unshift(t);
			})
			Campaign().set('turnorder', JSON.stringify(_turns));
			return this;
		}

		/**
		 * Pops the first turn.
		 * @return the identifier of the token.
		 */
		pop() {
			const turns = this.parse();
			const turn = turns.shift();
			this.set(turns);
			return turn == null ? null : turn.id;
		}

		/**
		 * Shows the turn order.
		 * @return the instance.
		 */
		show() {
			Campaign().set('initiativepage', true);
			return this;
		}

		/**
		 * Hides the turn order.
		 * @return the instance.
		 */
		hide() {
			Campaign().set('initiativepage', false);
			return this;
		}

	}

	/**
	 * @return the public elements.
	 */
	return  {
		Strings: Strings,
		Rankable: Rankable,
		Rankables: Rankables,
		Test: Test,
		TestSuite: TestSuite,
		AbstractEventHandler: AbstractEventHandler,
		Player: Player,
		Players: Players,
		Page: Page,
		Pages: Pages,
		Character: Character,
		Characters: Characters,
		Token: Token,
		Tokens: Tokens,
		Deck: Deck,
		Decks: Decks,
		Card: Card,
		Cards: Cards,
		Hand: Hand,
		Hands: Hands,
		PokerColor: PokerColor,
		PokerCard: PokerCard,
		PokerColors: PokerColors,
		PokerCards: PokerCards,
		Dice: Dice,
		Dices: Dices,
		Roll: Roll,
		Rolls: Rolls,
		Turn: Turn,
		TurnOrder: TurnOrder
	};

})();