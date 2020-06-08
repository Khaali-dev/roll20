const _playerId_1 = "-M5rtkkXsEkckPk1v0DL";
const _pageId_1 = "-M5xeoigOD2b0Vsz4stI";
const _tokenId_1 = "-M7lbGZnSu6SItqBzU4n";
const _tokenId_2 = "-M7lbEbIk_ER_Mt51qZF";
const _characterId_1 = "-M7laLPHxEwBBvSma4gh";
const _cardId_1 = "-M8swNpKKC6Ujo0SvBel";

var _odin = _odin || new Odin.TestSuite("Odin")

	// Dice
	// ------------------------------------------------------------------------

	.add("Dice serialization", false, () => {
		return new Odin.Dice(6).toString() === "d6";
	})

	.add("Open dice roll value", false, () => {
		const dice = new Odin.Dice(4);
		let min = 100;
		let max = 0;
		for (let i=0; i<100; i++) {
			let value = dice.value();
			if (value > max) {
				max = value;
			}
			if (value < min) {
				min = value;
			}
		}
		return min>0 && max>4 && min<100 && max<100;
	})

	.add("Close dice roll value", false, () => {
		const dice = new Odin.Dice(4).close();
		let min = 5;
		let max = 0;
		for (let i=0; i<100; i++) {
			let value = dice.value();
			if (value > max) {
				max = value;
			}
			if (value < min) {
				min = value;
			}
		}
		return min>0 && max>0 && min<5 && max<5;
	})

	.add("Dice roll", false, () => {
		return new RegExp('\\d+\\(d\\d+\\)').test(new Odin.Dice(6).roll().toString());
	})

	// Roll
	// ------------------------------------------------------------------------

	.add("Roll serialization", false, () => {
		return new Odin.Roll(new Odin.Dice(10), 15).toString() === "15(d10)";
	})

	// Dices
	// ------------------------------------------------------------------------

	.add("Dices serialization", false, () => {
		return new Odin.Dices()
			.add(new Odin.Dice(4), 2)
			.add(new Odin.Dice(6), 3)
			.toString() === "2d4, 3d6";
	})

	// Rolls
	// ------------------------------------------------------------------------

	.add("Rolls serialization", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.toString() === "1(d4), 3(d4), 1(d6), 6(d6), 2(d6)";
	})

	.add("Number of rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.size() === 5;
	})

	.add("Roll values", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return Odin.Test.assertArrayEqual([1, 3, 1, 6, 2], rolls.values());
	})

	.add("Min of rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.min() === 1;
	})

	.add("Max of rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.max() === 6;
	})

	.add("Sum of rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.sum() === 13;
	})

	.add("Transform rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2))
			.transform(function (r) { return new Odin.Roll(r.dice, r.value + 1); });
		return Odin.Test.assertArrayEqual([2, 4, 2, 7, 3], rolls.values());
	})

	.add("Reject rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2))
			.reject(function (r) { return r.value === 1; });
		return Odin.Test.assertArrayEqual([3, 6, 2], rolls.values());
	})

	.add("Filter rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2))
			.filter(function (r) { return r.value > 1; });
		return Odin.Test.assertArrayEqual([3, 6, 2], rolls.values());
	})

	.add("Some rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return Odin.Test.assertTrue(rolls.some(function (r) { return r.value === 1; })) &&
		       Odin.Test.assertFalse(rolls.some(function (r) { return r.value === 5; }));
	})

	.add("Count rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.count(function (r) { return r.value === 1; }) === 2 &&
		       rolls.count(function (r) { return r.value === 5; }) === 0;
	})

	.add("Number of rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.numberOf(1) === 2 && rolls.numberOf(5) === 0;
	})

	.add("One roll at least", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 4))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return Odin.Test.assertTrue(rolls.atLeast(3)) &&
		       Odin.Test.assertFalse(rolls.atLeast(5));
	})

	.add("Replace some rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const gets = rolls.get(function (r) { return r.value === 1; });
		gets[0].value = 2;
		return rolls.toString() === "2(d4), 3(d4), 1(d6), 6(d6), 2(d6)";
	})

	// Poker cards
	// ------------------------------------------------------------------------

	.add("Sort poker cards", false, () => {
		const turns = [
			{"id":_tokenId_1, "pr":"6♣", "custom":"","_pageid":_pageId_1},
			{"id":_tokenId_2,"pr":"RJo","custom":"","_pageid":_pageId_1},
			{"id":_tokenId_1,"pr":"9♣","custom":"","_pageid":_pageId_1},
			{"id":_tokenId_2,"pr":"4♥","custom":"","_pageid":_pageId_1},
			{"id":_tokenId_2,"pr":"2♠","custom":"","_pageid":_pageId_1}];
		const expected = [
			{"id":_tokenId_2,"pr":"RJo","custom":"","_pageid":_pageId_1},
			{"id":_tokenId_1,"pr":"9♣","custom":"","_pageid":_pageId_1},
			{"id":_tokenId_1, "pr":"6♣", "custom":"","_pageid":_pageId_1},
			{"id":_tokenId_2,"pr":"4♥","custom":"","_pageid":_pageId_1},
			{"id":_tokenId_2,"pr":"2♠","custom":"","_pageid":_pageId_1}];
		return Odin.Test.assertArrayEqual(
			expected,
			_.sortBy(turns, function(turn)
					{ return Odin.PokerCards.rank(turn.pr); 
			}));
	})

	// Turn order
	// ------------------------------------------------------------------------

	.add("Parse the current turn order", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.TurnOrder(null).parse());
	})

	.add("Clears the turn order", false, () => {
		return Odin.Test.assertEmptyArray(new Odin.TurnOrder().clear().parse());
	})

	.add("Add some turns to the turn order", false, () => {
		const turns = [
			new Odin.Turn(_tokenId_1, 1),
			new Odin.Turn(_tokenId_1, 2),
			new Odin.Turn(_tokenId_1, 3),
			new Odin.Turn(_tokenId_1, 4),
			new Odin.Turn(_tokenId_1, 5),
		];
		return _.size(new Odin.TurnOrder().clear().add(turns).parse()) === 5
	})

	.add("Pop first turn from turn order", false, () => {
		return Odin.Test.assertNotNull(new Odin.TurnOrder()
			.clear()
			.add([new Odin.Turn(_tokenId_1, 10)])
			.pop());
	})

	.add("Insert turns to turn order", false, () => {
		return Odin.Test.assertArrayEqual(
			new Odin.TurnOrder()
				.clear()
				.add([new Odin.Turn(_tokenId_1, 20)])
				.insert([new Odin.Turn(_tokenId_1, 10)])
				.parse(),
			[{"id":_tokenId_1,"pr":10,"custom":""},{"id":_tokenId_1,"pr":20,"custom":""}]);
	})

	// Players
	// ------------------------------------------------------------------------

	.add("Finds all players", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Players().findAll().objs);
	})

	.add("Finds players by name", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Players().findName("Marshall").objs) &&
		       Odin.Test.assertEmptyArray(new Odin.Players().findName("Unknown").objs);
	})

	.add("Finds online players", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Players().findOnline(true).objs) &&
		       Odin.Test.assertNotEmptyArray(new Odin.Players().findOnline(false).objs);
	})

	.add("filters game masters", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Players().findAll().filterMasters().objs);
	})

	.add("filters players", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Players().findAll().filterPlayers().objs);
	})

	// Player
	// ------------------------------------------------------------------------

	.add("Finds a player by id", false, () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Player().findId(_playerId_1).obj);
	})

	.add("Finds a player by name", false, () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Player().findName("Marshall").obj) &&
		       Odin.Test.assertEmptyObject(new Odin.Player().findName("Unknown").obj);
	})

	.add("Player is game master", false, () => {
		return Odin.Test.assertTrue(new Odin.Player().findId(_playerId_1).isMaster()) &&
		       Odin.Test.assertFalse(new Odin.Player().findId(_playerId_1).isPlayer());
	})

	// Pages
	// ------------------------------------------------------------------------

	.add("Finds all pages", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Pages().findAll().objs);
	})

	// Page
	// ------------------------------------------------------------------------

	.add("Finds a page by id", false, () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Page().findId(_pageId_1).obj);
	})

	// Decks
	// ------------------------------------------------------------------------

	.add("Finds all decks", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Decks().findAll().objs);
	})

	// Deck
	// ------------------------------------------------------------------------

	.add("Finds a deck by id", false, () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Deck().findId("-M8pqKN-SnT3CwJJqRcz").obj);
	})

	// Cards
	// ------------------------------------------------------------------------

	.add("Finds all cards on table", false, () => {
		// new Odin.Decks().findAll().recall().shuffle();
		// Plays N cards on the table
		// Compare cards on the table by calling new Odin.Cards().findTable().objs 
		return true;
	})

	.add("Recall cards", true, () => {
		// Test: new Odin.Decks().recall()
		return true;
	})

	.add("Shuffle cards", true, () => {
		// Test: new Odin.Decks().shuffle()
		return true;
	})

	.add("Finds all cards", true, () => {
		//return Odin.Test.assertNotEmptyArray(new Odin.Cards().findAll().objs);
		return true;
	})

	// Card
	// ------------------------------------------------------------------------

	.add("Finds a card by id", false, () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Card().findId(_cardId_1).obj);
	})

	// Cards
	// ------------------------------------------------------------------------

	.add("Find cards from deck", true, () => {
		// Test: new Odin.Cards().findDeck(deckId)
		return true;
	})

	// Hands
	// ------------------------------------------------------------------------

	.add("Finds all hands", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Hands().findAll().objs);
	})

	// Hand
	// ------------------------------------------------------------------------

	.add("Finds a hand by id", true, () => {
		//return Odin.Test.assertNotEmptyObject(new Odin.Hand().findId("-M8r15WD7wDam7lAX_bW").obj);
		return true;
	})

	// Tokens
	// ------------------------------------------------------------------------

	.add("Finds all tokens", true, () => {
		//return Odin.Test.assertNotEmptyArray(new Odin.Tokens().findAll().objs);
		return true;
	})

	// Token
	// ------------------------------------------------------------------------

	.add("Finds a token by id", true, () => {
		//return Odin.Test.assertNotEmptyObject(new Odin.Token().findId(_tokenId_1).obj);
		return true;
	})

	// Characters
	// ------------------------------------------------------------------------

	.add("Finds all characters", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Characters().findAll().objs);
	})

	// Character
	// ------------------------------------------------------------------------

	.add("Finds a character by id", false, () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Character().findId(_characterId_1).obj);
	})

	;

// The API message subscribtion.
on('ready',function() {
	'use strict';
	on('chat:message', (msg) => {
		_odin.handleMessage(msg);
	});
	on("add:graphic", function(obj) {
		log(obj);
	});
});