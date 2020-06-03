var _odin = _odin || new Odin.TestSuite("Odin")
	.add("Dice serialization", () => {
		return new Odin.Dice(6).toString() === "d6";
	})
	.add("Open dice roll value", () => {
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
	.add("Close dice roll value", () => {
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
	.add("Dice roll", () => {
		return new RegExp('\\d+\\(d\\d+\\)').test(new Odin.Dice(6).roll().toString());
	})
	.add("Roll serialization", () => {
		return new Odin.Roll(new Odin.Dice(10), 15).toString() === "15(d10)";
	})
	.add("Dices serialization", () => {
		return new Odin.Dices()
			.add(new Odin.Dice(4), 2)
			.add(new Odin.Dice(6), 3)
			.toString() === "2d4, 3d6";
	})
	.add("Rolls serialization", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.toString() === "1(d4), 3(d4), 1(d6), 6(d6), 2(d6)";
	})
	.add("Number of rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.size() === 5;
	})
	.add("Roll values", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return Odin.Test.assertArrayEqual([1, 3, 1, 6, 2], rolls.values());
	})
	.add("Min of rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.min() === 1;
	})
	.add("Max of rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.max() === 6;
	})
	.add("Sum of rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.sum() === 13;
	})
	.add("Transform rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2))
			.transform(function (r) { return new Odin.Roll(r.dice, r.value + 1); });
		return Odin.Test.assertArrayEqual([2, 4, 2, 7, 3], rolls.values());
	})
	.add("Reject rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2))
			.reject(function (r) { return r.value === 1; });
		return Odin.Test.assertArrayEqual([3, 6, 2], rolls.values());
	})
	.add("Filter rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2))
			.filter(function (r) { return r.value > 1; });
		return Odin.Test.assertArrayEqual([3, 6, 2], rolls.values());
	})
	.add("Some rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.some(function (r) { return r.value === 1; }) === true &&
		       rolls.some(function (r) { return r.value === 5; }) === false;
	})
	.add("Count rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.count(function (r) { return r.value === 1; }) === 2 &&
		       rolls.count(function (r) { return r.value === 5; }) === 0;
	})
	.add("Number of rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.numberOf(1) === 2 && rolls.numberOf(5) === 0;
	})
	.add("One roll at least", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 4))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.atLeast(3) === true && rolls.atLeast(5) === false;
	})
	.add("Replace some rolls", () => {
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
	.add("Sort poker cards", () => {
		const turns = [
			{"id":"-M7lbGZnSu6SItqBzU4n", "pr":"6♣", "custom":"","_pageid":"-M5xeoigOD2b0Vsz4stI"},
			{"id":"-M7lbEbIk_ER_Mt51qZF","pr":"RJo","custom":"","_pageid":"-M5xeoigOD2b0Vsz4stI"},
			{"id":"-M7lbGZnSu6SItqBzU4n","pr":"9♣","custom":"","_pageid":"-M5xeoigOD2b0Vsz4stI"},
			{"id":"-M7lbEbIk_ER_Mt51qZF","pr":"4♥","custom":"","_pageid":"-M5xeoigOD2b0Vsz4stI"},
			{"id":"-M7lbEbIk_ER_Mt51qZF","pr":"2♠","custom":"","_pageid":"-M5xeoigOD2b0Vsz4stI"}];
		const expected = [
			{"id":"-M7lbEbIk_ER_Mt51qZF","pr":"RJo","custom":"","_pageid":"-M5xeoigOD2b0Vsz4stI"},
			{"id":"-M7lbGZnSu6SItqBzU4n","pr":"9♣","custom":"","_pageid":"-M5xeoigOD2b0Vsz4stI"},
			{"id":"-M7lbGZnSu6SItqBzU4n", "pr":"6♣", "custom":"","_pageid":"-M5xeoigOD2b0Vsz4stI"},
			{"id":"-M7lbEbIk_ER_Mt51qZF","pr":"4♥","custom":"","_pageid":"-M5xeoigOD2b0Vsz4stI"},
			{"id":"-M7lbEbIk_ER_Mt51qZF","pr":"2♠","custom":"","_pageid":"-M5xeoigOD2b0Vsz4stI"}];
		return Odin.Test.assertArrayEqual(
				expected,
				_.sortBy(turns, function(turn)
						{ return Odin.PokerCards.rank(turn.pr); 
				}));
	})
	.add("Parse the current turn order", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.TurnOrder(null).parse());
	})
	.add("Clears the turn order", () => {
		return Odin.Test.assertEmptyArray(new Odin.TurnOrder().clear().parse());
	})
	.add("Add some turns to the turn order", () => {
		const turns = [
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 1),
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 2),
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 3),
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 4),
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 5),
		];
		return _.size(new Odin.TurnOrder().clear().add(turns).parse()) === 5
	})
	.add("Pop first turn from turn order (Expected failed)", () => {
		return Odin.Test.assertNotNull(new Odin.TurnOrder()
			.clear()
			.add([new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 10)])
			.pop());
	})
	.add("Insert turns to turn order", () => {
		return Odin.Test.assertArrayEqual(
			new Odin.TurnOrder()
				.clear()
				.add([new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 20)])
				.insert([new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 10)])
				.parse(),
			[{"id":"-M7lbGZnSu6SItqBzU4n","pr":10,"custom":""},{"id":"-M7lbGZnSu6SItqBzU4n","pr":20,"custom":""}]);
	})
	.add("Finds all players", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Players().findAll().objs);
	})
	.add("Filters online players", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Players().findAll().filterOnline().objs);
	})
	.add("filters offline players", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Players().findAll().filterOffline().objs);
	})
	.add("filters game masters", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Players().findAll().filterMasters().objs);
	})
	.add("filters players", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Players().findAll().filterPlayers().objs);
	})
	.add("Finds a player by id", () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Player().findId("-M5rtkkXsEkckPk1v0DL").obj);
	})
	.add("Player is game master", () => {
		return new Odin.Player().findId("-M5rtkkXsEkckPk1v0DL").isMaster() === true &&
		       new Odin.Player().findId("-M5rtkkXsEkckPk1v0DL").isPlayer() === false;
	})
	.add("Finds all pages", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Pages().findAll().objs);
	})
	.add("Finds a page by id", () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Page().findId("-M5xeoigOD2b0Vsz4stI").obj);
	})
	.add("Finds all decks", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Decks().findAll().objs);
	})
	.add("Finds a deck by id", () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Deck().findId("-M8pqKN-SnT3CwJJqRcz").obj);
	})
	.add("Finds all cards", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Cards().findAll().objs);
	})
	.add("Finds a card by id", () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Card().findId("-M8swNpKKC6Ujo0SvBel").obj);
	})
	.add("Finds all hands", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Hands().findAll().objs);
	})
	.add("Finds a hand by id", () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Hand().findId("-M8r15WD7wDam7lAX_bW").obj);
	})
	.add("Finds all tokens", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Tokens().findAll().objs);
	})
	.add("Finds a token by id", () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Token().findId("-M7lbGZnSu6SItqBzU4n").obj);
	})
	.add("Finds all characters", () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Characters().findAll().objs);
	})
	.add("Finds a character by id", () => {
		return Odin.Test.assertNotEmptyObject(new Odin.Character().findId("-M7laLPHxEwBBvSma4gh").obj);
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