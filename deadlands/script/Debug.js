on('ready',function() {
	'use strict';

	on('chat:message', (msg) => {

        // Catch message
	    if (msg.type != 'api') return;
		var args = msg.content.split(/\s+/);
		var cmd = args.shift().substring(1);
	    if (cmd != 'debug') return;

        // Identifiers
        const deckId = "-M8pqKN-SnT3CwJJqRcz";

        // cardId: ["-M8r0TYwIpBy2pqUmWDT","-M8swSMJ14TuhK_a-h8J","-M8swFEwkeFq7f_se9OT","-M8swNpKKC6Ujo0SvBel"]

        //const player = new Odin.Players().findName("no").only();
        const player = new Odin.Players().findName("Marshall").only();
        
        log(player);

	});

});