/**
 * The Symbaroum module provides common tools for Symbaroum.
 */
var Symbaroum = (function() {
	'use strict';

	class Names {

		/**
		 * @constructor
		 */
		constructor() {
			this.data = {"names": [
			    {
			        "id": "ambrienMasculin",
			        "parts": [
			            {"part": [
			                "Der",
			                "Dr",
			                "El"
			            ]},
			            {"part": [
			                "i",
			                "ia",
			                "le",
			                "io"
			            ]},
			            {"part": [
			                "ld",
			                "lf",
			                "lg",
			                "m"
			            ]},
			            {"part": [
			                "e",
			                "e",
			                "e",
			                "e"
			            ]},
			            {"part": [
			                "g",
			                "j",
			                "k",
			                "k"
			            ]},
			            {"part": [
			                "a",
			                "en",
			                "o",
			                "ar",
			                "e"
			            ]}
			        ]
			    },
			    {
			        "id": "ambrienNoble",
			        "parts": [
			            {"part": [
			                "Ag",
			                "Al",
			                "Am"
			            ]},
			            {"part": [
			                "abag",
			                "adan",
			                "afin",
			                "agar"
			            ]}
			        ]
			    }
			]};
		}

		/**
		 * @return all families.
		 */
		families() {
			const families = [];
			for (let i=0; i<this.data['names'].length; i++) {
				families.push(this.data['names'][i]['id']);
			}
			return families;
		}

		/**
		 * Gets the specified family definition.
		 * @param family The family to get.
		 * @return the family definition.
		 */
		definition(family) {
			for (let i=0; i<this.data["names"].length; i++) {
				if (this.data["names"][i]['id'] === family) {
					return this.data["names"][i]['parts'];
				}
			}
			return null;
		}

		/**
		 * Generates the names of the specified family.
		 * @param family The family for which to generate the name.
		 * @return the name.
		 */
		generate(family) {
			const definition = this.definition(family);
			if (definition === null) {
				return "Family '" + family + "' not found, use one of [" + this.families().join('|') + "]";
			}
			let name = "";
			for (let i=0; i<definition.length; i++) {
				const part = definition[i]["part"];
				name = name + part[randomInteger(part.length) - 1];
			}
			return name;
		}

	}

	/**
	 * The EventHandler class is the main class to handle commands.
	 */
	class EventHandler {

		/**
		 * @constructor
		 */
		constructor() {
			this.names = new Names();
		}

		/**
		 * Processes the specified message.
		 * @param msg The message to process.
		 */
		processMessage(msg) {

			const args = msg.content.split(/\s+/);
			const cmd = args.shift().substring(1);

			if (cmd != 'symb') return;

			if (args.length > 0 && args[0] === 'name') {

				sendChat(
					msg.who,
					args.length === 2 ? this.names.generate(args[1]) : this.usage());

			} else {

				sendChat(msg.who, this.usage());

			}

		}

		/**
		 * @return the command usage.
		 */
		usage() {
			return "Use !symb name [" + this.names.families().join('|') + "]";
		}

	}

	/**
	 * The message handler.
	 */
	const handler = new EventHandler();

	/**
	 * @return the public elements.
	 */
	return  {
		handler: handler,
	};

})();

//The API message subscribtion.
on('ready',function() {
	'use strict';
	on('chat:message', (msg) => {
		if (msg.type != 'api') return;
		Symbaroum.handler.processMessage(msg);
	});
});