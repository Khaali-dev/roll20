var _deadlands = _deadlands || new TestSuite("deadlands")
	.add("Rolls as fumble", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2))
			.result(5) === -1;
	})
	.add("Rolls as fail", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 4))
			.add(new Roll(new Dice(6), 2))
			.result(5) === 0;
	})
	.add("Rolls as success with max equal to target", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 5))
			.add(new Roll(new Dice(6), 2))
			.result(5) === 1;
	})
	.add("Rolls as success with max equal to one degree minus 1", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 9))
			.add(new Roll(new Dice(6), 2))
			.result(5) === 1;
	})
	.add("Rolls as success with max equal to one degree", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 10))
			.add(new Roll(new Dice(6), 2))
			.result(5) === 2;
	})
	.add("Rolls as success with max equal to two degrees minus 1", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 14))
			.add(new Roll(new Dice(6), 2))
			.result(5) === 2;
	})
	.add("Rolls as success with max equal to two degrees", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 15))
			.add(new Roll(new Dice(6), 2))
			.result(5) === 3;
	})
	;

// The API message subscribtion.
on('ready',function() {
	'use strict';
	on('chat:message', (msg) => {
		_deadlands.handleMessage(msg);
	});
});