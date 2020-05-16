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

/**
 * The Roll class defines a pool of dices rolls. It provides some utilities to
 * interpret the result according to the game system.
 */
class Rolls {

	/**
	 * Constructor.
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
	 * Filters the rolls which satisfies the specified predicate.
	 * @param predicate The predicate to satisfy.
	 * @return the filtered rolls.
	 */
	filter(predicate) {
		var filter = new Rolls();
		_.filter(this.rolls, predicate).forEach(r => filter.add(r));
		return filter;
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
	 * Indicates if the maximum result is greater or equal than the specified threshold.
	 * @param threshold The threshold to reach.
	 * @return true if the threshold has been reached.
	 */
	atLeast(threshold) {
		return this.some(function (r) { return r.value >= threshold; });
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
	
}