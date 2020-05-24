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
		const values = rolls.values();
		return values.length === 5 &&
		       values[0] === 1 &&
		       values[1] === 3 &&
		       values[2] === 1 &&
		       values[3] === 6 &&
		       values[4] === 2;
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
		const values = rolls.values();
		return values.length === 5 &&
		       values[0] === 2 &&
		       values[1] === 4 &&
		       values[2] === 2 &&
		       values[3] === 7 &&
		       values[4] === 3;
	})
	.add("Reject rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2))
			.reject(function (r) { return r.value === 1; });
		const values = rolls.values();
		return values.length === 3 &&
		       values[0] === 3 &&
		       values[1] === 6 &&
		       values[2] === 2;
	})
	.add("Filter rolls", () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2))
			.filter(function (r) { return r.value > 1; });
		const values = rolls.values();
		return values.length === 3 &&
		       values[0] === 3 &&
		       values[1] === 6 &&
		       values[2] === 2;
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
	.add("Parse the current turn order", () => {
		const turnOrder = Odin.TurnOrder.parse();
		log(turnOrder);
		return true;
	})
	.add("Add some turns to the turn order", () => {
		const turns = [
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 1),
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 2),
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 3),
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 4),
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 5),
		];
		const turnOrder = new Odin.TurnOrder();
		turnOrder.add(turns);
		log(turnOrder.parse());
		return true;
	})
	.add("Pop first turn from turn order", () => {
		const turnOrder = new Odin.TurnOrder();
		log(turnOrder.pop());
		return true;
	})
	.add("Insert turns to turn order", () => {
		const turns = [
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 10),
			new Odin.Turn("-M7lbGZnSu6SItqBzU4n", 20)
		];
		new Odin.TurnOrder().insert(turns);
		return true;
	})
	.add("Gets data", () => {
		log(Odin.Data.getPlayers());
		log(Odin.Data.getPlayer("-M5rtkkXsEkckPk1v0DL"));
		log(Odin.Data.getPage("-M5xeoigOD2b0Vsz4stI"));
		log(Odin.Data.getGraphic("-M7lbGZnSu6SItqBzU4n"));
		log(Odin.Data.getCard("-M7lbGZnSu6SItqBzU4n"));
		log(Odin.Data.getToken("-M7lbGZnSu6SItqBzU4n"));
		log(Odin.Data.getCharacter("-M7laLPHxEwBBvSma4gh"));
	})
	;

// The API message subscribtion.
on('ready',function() {
	'use strict';
	on('chat:message', (msg) => {
		_odin.handleMessage(msg);
	});
});