/**
 * The Strings class is an utility class with static methods.
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
 * The AbstractMessageHandler class is the base class to define a message handler.
 */
class AbstractMessageHandler {

	/**
	 * Constructor.
	 */
	constructor() {
		if (this.constructor === AbstractMessageHandler) {
			throw new TypeError("Abstract class AbstractMessageHandler cannot be instantiated directly");
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
	 * @param assert The function which defines the assertion to satisfy.
	 */
	constructor(name, assert) {
		this.name = name;
		this.assert = assert;
	}

	/**
	 * @returns the specified test evaluation.
	 */
	evaluate() {
		log((this.assert() === true ? "[OK    ]" : "[   NOK]") + ": " + this.name);
	}

}

/**
 * The AbstractTestSuite class is the base class to define a testsuite.
 */
class TestSuite extends AbstractMessageHandler {

	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.tests = [];
	}

	/**
	 * @Override.
	 */
	handleMessage(msg) {
		this.handleCommand(msg);
	}

	/**
	 * @Override.
	 */
	processCommand(cmd, args) {
		if (cmd != 'tu') return;
		this.tests.forEach(t => t.evaluate());
	}

	/**
	 * Add the specified test.
	 * @param name   The name of the test.
	 * @param assert The assertion to satisfy.
	 * @return the instance.
	 */
	add(name, assert) {
		this.tests.push(new Test(name, assert));
		return this;
	}

}
