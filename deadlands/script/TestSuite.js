var _deadlands = _deadlands || new TestSuite("deadlands")
	.add("Rolls as fumble without modifier", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2))
			.result(5, 0) === -1;
	})
	.add("Rolls as fumble with modifier", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2))
			.result(5, 10) === -1;
	})
	.add("Rolls as fail without modifier", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 4))
			.add(new Roll(new Dice(6), 2))
			.result(5, 0) === 0;
	})
	.add("Rolls as fail with bonus", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 3))
			.add(new Roll(new Dice(6), 2))
			.result(5, 1) === 0;
	})
	.add("Rolls as fail with malus", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 5))
			.add(new Roll(new Dice(6), 2))
			.result(5, -1) === 0;
	})
	.add("Rolls as success without modifier where max equal to target", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 5))
			.add(new Roll(new Dice(6), 2))
			.result(5, 0) === 1;
	})
	.add("Rolls as success with bonus where max equal to target", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 4))
			.add(new Roll(new Dice(6), 2))
			.result(5, 1) === 1;
	})
	.add("Rolls as success with malus where max equal to target", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 6))
			.add(new Roll(new Dice(6), 2))
			.result(5, -1) === 1;
	})
	.add("Rolls as success without modifier where max equal to one degree minus 1", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 9))
			.add(new Roll(new Dice(6), 2))
			.result(5, 0) === 1;
	})
	.add("Rolls as success with bonus where max equal to one degree minus 1", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 8))
			.add(new Roll(new Dice(6), 2))
			.result(5, 1) === 1;
	})
	.add("Rolls as success with malus where max equal to one degree minus 1", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 10))
			.add(new Roll(new Dice(6), 2))
			.result(5, -1) === 1;
	})
	.add("Rolls as success without modifier where max equal to one degree", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 10))
			.add(new Roll(new Dice(6), 2))
			.result(5, 0) === 2;
	})
		.add("Rolls as success with bonus where max equal to one degree", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 9))
			.add(new Roll(new Dice(6), 2))
			.result(5, 1) === 2;
	})
	.add("Rolls as success with malus where max equal to one degree", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 11))
			.add(new Roll(new Dice(6), 2))
			.result(5, -1) === 2;
	})
	.add("Rolls as success without modifier where max equal to two degrees minus 1", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 14))
			.add(new Roll(new Dice(6), 2))
			.result(5, 0) === 2;
	})
	.add("Rolls as success with bonus where max equal to two degrees minus 1", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 13))
			.add(new Roll(new Dice(6), 2))
			.result(5, 1) === 2;
	})
	.add("Rolls as success with malus where max equal to two degrees minus 1", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 15))
			.add(new Roll(new Dice(6), 2))
			.result(5, -1) === 2;
	})
	.add("Rolls as success without modifier where max equal to two degrees", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 15))
			.add(new Roll(new Dice(6), 2))
			.result(5, 0) === 3;
	})
	.add("Rolls as success with bonus where max equal to two degrees", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 14))
			.add(new Roll(new Dice(6), 2))
			.result(5, 1) === 3;
	})
	.add("Rolls as success with malus where max equal to two degrees", () => {
		return new DeadlandsRolls()
			.add(new Roll(new Dice(4), 1))
			.add(new Roll(new Dice(4), 3))
			.add(new Roll(new Dice(6), 1))
			.add(new Roll(new Dice(6), 16))
			.add(new Roll(new Dice(6), 2))
			.result(5, -1) === 3;
	})
	;

// The API message subscribtion.
on('ready',function() {
	'use strict';
	on('chat:message', (msg) => {
		_deadlands.handleMessage(msg);
	});
});