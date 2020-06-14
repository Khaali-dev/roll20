var _deadlands = _deadlands || new Odin.TestSuite("Deadlands")
	.add("Rolls as fumble without modifier", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 0) === -1;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 0) === -1;
		return fumble && skill && unskill;
	})
	.add("Rolls as fumble with modifier", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 10) === -1;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 10) === -1;
		return fumble && skill && unskill;
	})
	.add("Rolls as fail without modifier", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 4))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 0) === 0;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 0) === 0;
		return !fumble && skill && unskill;
	})
	.add("Rolls as fail with bonus", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 1) === 0;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 1) === 0;
		return !fumble && skill && unskill;
	})
	.add("Rolls as fail with malus", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 5))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, -1) === 0;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, -1) === 0;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success without modifier where max equal to target", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 5))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 0) === 1;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 0) === 0;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success with bonus where max equal to target", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 4))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 1) === 1;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 1) === 0;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success with malus where max equal to target", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, -1) === 1;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, -1) === 0;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success without modifier where max equal to one degree minus 1", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 9))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 0) === 1;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 0) === 0;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success with bonus where max equal to one degree minus 1", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 8))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 1) === 1;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 1) === 1;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success with malus where max equal to one degree minus 1", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 10))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, -1) === 1;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, -1) === 0;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success without modifier where max equal to one degree", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 10))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 0) === 2;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 0) === 1;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success with bonus where max equal to one degree", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 9))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 1) === 2;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 1) === 1;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success with malus where max equal to one degree", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 11))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, -1) === 2;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, -1) === 0;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success without modifier where max equal to two degrees minus 1", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 14))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 0) === 2;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 0) === 1;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success with bonus where max equal to two degrees minus 1", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 13))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 1) === 2;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 1) === 1;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success with malus where max equal to two degrees minus 1", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 15))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, -1) === 2;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, -1) === 1;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success without modifier where max equal to two degrees", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 15))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 0) === 3;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 0) === 1;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success with bonus where max equal to two degrees", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 14))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, 1) === 3;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, 1) === 1;
		return !fumble && skill && unskill;
	})
	.add("Rolls as success with malus where max equal to two degrees", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 16))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const fumble = Deadlands.RollInterpreter.isFumble(rolls);
		const skill = Deadlands.RollInterpreter.skill(rolls, 5, -1) === 3;
		const unskill = Deadlands.RollInterpreter.unskill(rolls, 5, -1) === 1;
		return !fumble && skill && unskill;
	})
	;

// The API message subscribtion.
on('ready',function() {
	'use strict';
	on('chat:message', (msg) => {
		Odin.EventHandler.handleCommand(msg, Odin.TestSuite.processCommand, _deadlands);
	});
});