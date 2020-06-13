on('ready',function() {
	'use strict';

	on('chat:message', (msg) => {

        // Catch message
	    if (msg.type != 'api') return;
		var args = msg.content.split(/\s+/);
		var cmd = args.shift().substring(1);
	    if (cmd != 'debug') return;

        // Identifiers
        const _playerId_1 = "-M5rtkkXsEkckPk1v0DL";
        const _pageId_1 = "-M5xeoigOD2b0Vsz4stI";
        const _tokenId_1 = "-M7lbGZnSu6SItqBzU4n";
        const _tokenId_2 = "-M7lbEbIk_ER_Mt51qZF";
        const _characterId_1 = "-M7laLPHxEwBBvSma4gh"; // Lincoln
        const _characterId_2 = "-M63mpWsG_c3BwN1b3DU"; // Sadie
        const _deckId_1 = "-M8pqKN-SnT3CwJJqRcz"; // Actions
        const _cardId_1 = "-M8swNpKKC6Ujo0SvBel";
        const _cardId_2 = "-M8r0TYwIpBy2pqUmWDT";

    function resolveAfter2Seconds(x) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(x);
        }, 2000);
      });
    }
    
    const f1 = async () => {
      var x = await resolveAfter2Seconds(10);
      log(x);
      return x;
    }
    
    const mainF1 = async () => {
        const result = await f1()
        return result
    }
    
    log("BEGIN");
    
    (async () => {
        log(await mainF1());
    })();

    log("END");


/*
        log("Begin");

        var cards = null;
        
        const asyncFindCards = async () => {
            log("asyncFindCards.1");
            var _cards = null;
            log("asyncFindCards.2");
            await new Promise(resolve => {
                setTimeout(function() {
                    log("find table in setTimeout");
                    cards = new Odin.Cards().findTable().objs;
                }, 100);
            });
            log("asyncFindCards.3");
            return _cards;
        }
        
        const findCards = async () => {
            log("findCards.1");
            const cards = await asyncFindCards();
            log("findCards.2");
            return cards;
        }
        
        
        (async () => {
            log("IIFE");
            log(await findCards());
        })();

        log("End");

        /*
        

        const findCards = async () => {
            const cards = await 
        }
        
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }

        const doSomething = async () => {
            log("1.1");
            await sleep(100);
            log("1.2");
            cards = new Odin.Cards().findTable().objs;
            log("1.3");
            log(cards);
        }

        playCardToTable(_cardId_1);
        
        

        
        doSomething();
        log("2");
        log(cards);

        */

        /*
        var cards = null;
        const start = Date.now();

        const findCards = (size, timeout) => {
          cards = new Odin.Cards().findTable().objs;
          if (_.size(cards) < size && Date.now() - start < timeout) {
              setTimeout(findCards, 100);
          }
        };

	    const waitCards = (size, timeout) => {
	        var start = Date.now();
	        cards = new Odin.Cards().findTable().objs;
	        while (_.size(cards) < size && Date.now() - start < timeout) {
	            findCards(size, timeout);
	            log(cards);
	        }
        };

        playCardToTable(_cardId_1);
        waitCards(1, 5000);
	    log("-----------------> ");
        log(cards);
        */

	});

});