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