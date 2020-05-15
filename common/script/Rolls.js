/**
 * The Dice class is the class used to manage dice roll.
 */
class Dice {

	/**
	 * Constructor.
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
	 * @return the dice roll.
	 */
	roll() {
		var value = randomInteger(this.side);
		return this.open === true && this.side === value ? value + this.roll() : value;
	}

	/**
	 * @return the textual expression of the instance.
	 */
	toString() {
		return "d" + this.side;
	}

}

/**
 * The Dices class is the class to manage pool of dices. Dices can be rolled to get rolls.
 */
class Dices {

	/**
	 * Constructor.
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
	 * @return a dices rolls.
	 */
	roll() {
		var rolls = new Rolls();
		for (let [dice,size] of this.dices) {
			for (let i=0; i<size; i++) {
				rolls.add(new Roll(dice, dice.roll()));
			}
		}
		return rolls;
	}

}

class Roll {

	/**
	 * Constructor.
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

class Rolls {

	/**
	 * Constructor.
	 */
	constructor() {
		this.rolls = [];

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
		var sum = 0;
		this.rolls.forEach(r => sum = sum + r.value);
		return sum;
	}

	/**
	 * Indicates if the maximum result is greater or equal than the specified threshold.
	 * @param threshold The threshold to reach.
	 * @return true if the threshold has been reached.
	 */
	atLeast(threshold) {
		return this.max() >= threshold;
	}

	/**
	 * Gets the number of rolls for which the value is equal to the specified one.
	 * @param value The value to search.
	 * @return the number of matching roll.
	 */
	matches(value) {
		return this.rolls.filter(r => r.value === value).length;
	} 

	/**
	 * @return true if the rolls is a fumble.
	 */
	fumble() {
		return this.matches(1) >= Math.floor(this.rolls.length/2);
	}

	success(tn,step) {
		if (this.atLeast(tn)) {
			return Math.floor((this.max()-tn)/step);
		} else {
			return 0;
		}
	}

	/**
	 * @return all values.
	 */
	values() {
		var values = [];
		this.rolls.forEach(r => values.push(r.value));
		return values;
	}

	/**
	 * @return the textual expression of the rolls.
	 */
	toString() {
		return Strings.toString(this.rolls, ", ");
	}

}