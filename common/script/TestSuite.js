var testsuite = testsuite || new TestSuite()
	.add("Dice serialization", () => {
		return new Dice(6).toString() === "d6";
	})
	.add("Open dice roll value", () => {
		const dice = new Dice(4);
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
		const dice = new Dice(4).close();
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
		return new RegExp('\\d+\\(d\\d+\\)').test(new Dice(6).roll().toString());
	})
	.add("Roll serialization", () => {
		return new Roll(new Dice(10), 15).toString() === "15(d10)";
	})
	.add("Dices serialization", () => {
		return new Dices()
			.add(new Dice(4), 2)
			.add(new Dice(6), 3)
			.toString() === "2d4, 3d6";
	})
	.add("Rolls serialization", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2));
		return rolls.toString() === "1(d4), 3(d4), 1(d6), 6(d6), 2(d6)";
	})
	.add("Number of rolls", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2));
		return rolls.size() === 5;
	})
	.add("Roll values", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2));
		const values = rolls.values();
		return values.length === 5 &&
		       values[0] === 1 &&
		       values[1] === 3 &&
		       values[2] === 1 &&
		       values[3] === 6 &&
		       values[4] === 2;
	})
	.add("Min of rolls", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2));
		return rolls.min() === 1;
	})
	.add("Max of rolls", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2));
		return rolls.max() === 6;
	})
	.add("Sum of rolls", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2));
		return rolls.sum() === 13;
	})
	.add("Transform rolls", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2))
			.transform(function (r) { return new Roll(r.dice, r.value + 1); });
		const values = rolls.values();
		return values.length === 5 &&
		       values[0] === 2 &&
		       values[1] === 4 &&
		       values[2] === 2 &&
		       values[3] === 7 &&
		       values[4] === 3;
	})
	.add("Reject rolls", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2))
			.reject(function (r) { return r.value === 1; });
		const values = rolls.values();
		return values.length === 3 &&
		       values[0] === 3 &&
		       values[1] === 6 &&
		       values[2] === 2;
	})
	.add("Filter rolls", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2))
			.filter(function (r) { return r.value > 1; });
		const values = rolls.values();
		return values.length === 3 &&
		       values[0] === 3 &&
		       values[1] === 6 &&
		       values[2] === 2;
	})
	.add("Some rolls", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2));
		return rolls.some(function (r) { return r.value === 1; }) === true &&
		       rolls.some(function (r) { return r.value === 5; }) === false;
	})
	.add("Count rolls", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2));
		return rolls.count(function (r) { return r.value === 1; }) === 2 &&
		       rolls.count(function (r) { return r.value === 5; }) === 0;
	})
	.add("Number of rolls", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2));
		return rolls.numberOf(1) === 2 && rolls.numberOf(5) === 0;
	})
	.add("One roll at least", () => {
		const rolls = new Rolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 4))
			.add(new Roll(new Dice(6), 2));
		return rolls.atLeast(3) === true && rolls.atLeast(5) === false;
	})
	;

// The API message subscribtion.
on('ready',function() {
	'use strict';
	on('chat:message', (msg) => {
		testsuite.handleMessage(msg);
	});
});