const _playerId_1 = "-M5rtkkXsEkckPk1v0DL";
const _pageId_1 = "-M5xeoigOD2b0Vsz4stI";
const _tokenId_1 = "-M7lbGZnSu6SItqBzU4n";
const _tokenId_2 = "-M7lbEbIk_ER_Mt51qZF";
const _characterId_1 = "-M7laLPHxEwBBvSma4gh"; // Lincoln
const _characterId_2 = "-M63mpWsG_c3BwN1b3DU"; // Sadie
const _deckId_1 = "-M8pqKN-SnT3CwJJqRcz"; // Actions
const _cardId_1 = "-M8swNpKKC6Ujo0SvBel";
const _cardId_2 = "-M8r0TYwIpBy2pqUmWDT";
const _handId_1 = "-M7ie833VkosbYjj8rbX";

var _odin = _odin || new Odin.TestSuite("Odin")

	// Dice
	// ------------------------------------------------------------------------


	// Dice
	// ------------------------------------------------------------------------

	.add("Dice serialization", false, () => {
		return new Odin.Dice(6).toString() === "d6";
	})

	.add("Open dice roll value", false, () => {
		const dice = new Odin.Dice(4);
		let min = 100;
		let max = 0;
		for (let i=0; i<100; i++) {
			let value = dice.value();
			if (value > max) {
				max = value;
			}
			if (value < min) {
				min = value;
			}
		}
		return min>0 && max>4 && min<100 && max<100;
	})

	.add("Close dice roll value", false, () => {
		const dice = new Odin.Dice(4).close();
		let min = 5;
		let max = 0;
		for (let i=0; i<100; i++) {
			let value = dice.value();
			if (value > max) {
				max = value;
			}
			if (value < min) {
				min = value;
			}
		}
		return min>0 && max>0 && min<5 && max<5;
	})

	.add("Dice roll", false, () => {
		return new RegExp('\\d+\\(d\\d+\\)').test(new Odin.Dice(6).roll().toString());
	})

	// Roll
	// ------------------------------------------------------------------------

	.add("Roll serialization", false, () => {
		return new Odin.Roll(new Odin.Dice(10), 15).toString() === "15(d10)";
	})

	// Dices
	// ------------------------------------------------------------------------

	.add("Dices serialization", false, () => {
		return new Odin.Dices()
			.add(new Odin.Dice(4), 2)
			.add(new Odin.Dice(6), 3)
			.toString() === "2d4, 3d6";
	})

	// Rolls
	// ------------------------------------------------------------------------

	.add("Rolls serialization", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.toString() === "1(d4), 3(d4), 1(d6), 6(d6), 2(d6)";
	})

	.add("Number of rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.size() === 5;
	})

	.add("Roll values", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return Odin.Test.assertArrayEqual([1, 3, 1, 6, 2], rolls.values());
	})

	.add("Min of rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.min() === 1;
	})

	.add("Max of rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.max() === 6;
	})

	.add("Sum of rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.sum() === 13;
	})

	.add("Transform rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2))
			.transform(function (r) { return new Odin.Roll(r.dice, r.value + 1); });
		return Odin.Test.assertArrayEqual([2, 4, 2, 7, 3], rolls.values());
	})

	.add("Reject rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2))
			.reject(function (r) { return r.value === 1; });
		return Odin.Test.assertArrayEqual([3, 6, 2], rolls.values());
	})

	.add("Filter rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2))
			.filter(function (r) { return r.value > 1; });
		return Odin.Test.assertArrayEqual([3, 6, 2], rolls.values());
	})

	.add("Some rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return Odin.Test.assertTrue(rolls.some(function (r) { return r.value === 1; })) &&
		       Odin.Test.assertFalse(rolls.some(function (r) { return r.value === 5; }));
	})

	.add("Count rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.count(function (r) { return r.value === 1; }) === 2 &&
		       rolls.count(function (r) { return r.value === 5; }) === 0;
	})

	.add("Number of rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return rolls.numberOf(1) === 2 && rolls.numberOf(5) === 0;
	})

	.add("One roll at least", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 4))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		return Odin.Test.assertTrue(rolls.atLeast(3)) &&
		       Odin.Test.assertFalse(rolls.atLeast(5));
	})

	.add("Replace some rolls", false, () => {
		const rolls = new Odin.Rolls()
			.add(new Odin.Roll(new Odin.Dice(4), 1))
			.add(new Odin.Roll(new Odin.Dice(4), 3))
			.add(new Odin.Roll(new Odin.Dice(6), 1))
			.add(new Odin.Roll(new Odin.Dice(6), 6))
			.add(new Odin.Roll(new Odin.Dice(6), 2));
		const gets = rolls.get(function (r) { return r.value === 1; });
		gets[0].value = 2;
		return rolls.toString() === "2(d4), 3(d4), 1(d6), 6(d6), 2(d6)";
	})

	// Poker cards
	// ------------------------------------------------------------------------

	.add("Sort poker cards", false, () => {
		const turns = [
			{'id':_tokenId_1, 'pr':'6♣', 'custom':'', '_pageid':_pageId_1},
			{'id':_tokenId_2, 'pr':'RJo', 'custom':'', '_pageid':_pageId_1},
			{'id':_tokenId_1, 'pr':'9♣', 'custom':'', '_pageid':_pageId_1},
			{'id':_tokenId_2, 'pr':'4♥', 'custom':'', '_pageid':_pageId_1},
			{'id':_tokenId_2, 'pr':'2♠', 'custom':'', '_pageid':_pageId_1}];
		const expected = [
			{'id':_tokenId_2, 'pr':'RJo', 'custom':'', '_pageid':_pageId_1},
			{'id':_tokenId_1, 'pr':'9♣', 'custom':'', '_pageid':_pageId_1},
			{'id':_tokenId_1, 'pr':'6♣', 'custom':'', '_pageid':_pageId_1},
			{'id':_tokenId_2, 'pr':'4♥', 'custom':'', '_pageid':_pageId_1},
			{'id':_tokenId_2, 'pr':'2♠', 'custom':'', '_pageid':_pageId_1}];
		return Odin.Test.assertArrayEqual(
			expected,
			_.sortBy(turns, function(turn)
					{ return Odin.PokerCards.rank(turn.pr); 
			}));
	})

	// Turn order
	// ------------------------------------------------------------------------

	.add("Parse the current turn order", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.TurnOrder(null).parse());
	})

	.add("Clears the turn order", false, () => {
		return Odin.Test.assertEmptyArray(new Odin.TurnOrder().clear().parse());
	})

	.add("Add some turns to the turn order", false, () => {
		const turns = [
			new Odin.Turn(_tokenId_1, 1),
			new Odin.Turn(_tokenId_1, 2),
			new Odin.Turn(_tokenId_1, 3),
			new Odin.Turn(_tokenId_1, 4),
			new Odin.Turn(_tokenId_1, 5),
		];
		return _.size(new Odin.TurnOrder().clear().add(turns).parse()) === 5
	})

	.add("Pop first turn from turn order", false, () => {
		return Odin.Test.assertNotNull(new Odin.TurnOrder()
			.clear()
			.add([new Odin.Turn(_tokenId_1, 10)])
			.pop());
	})

	.add("Insert turns to turn order", false, () => {
		return Odin.Test.assertArrayEqual(
			new Odin.TurnOrder()
				.clear()
				.add([new Odin.Turn(_tokenId_1, 20)])
				.insert([new Odin.Turn(_tokenId_1, 10)])
				.parse(),
			[{'id':_tokenId_1, 'pr':10, 'custom':''}, {'id':_tokenId_1, 'pr':20, 'custom':''}]);
	})

	// Players
	// ------------------------------------------------------------------------

	.async().add("Fetches all players", false, async () => {
		const players = new Odin.Players();
		await Odin.Players.fetchAll(players);
		return Odin.Test.assertNotEmptyArray(players.objs);
	})

	.async().add("Fetches online players", false, async () => {
		const onlines = new Odin.Players();
		const offlines = new Odin.Players();
		await Odin.Players.fetchOnline(onlines, true);
		await Odin.Players.fetchOnline(offlines, false);
		return Odin.Test.assertNotEmptyArray(onlines.objs) && Odin.Test.assertNotEmptyArray(offlines.objs);
	})

	.async().add("Filters players if game master", false, async () => {
		const masters = new Odin.Players();
		const players = new Odin.Players();
		await Odin.Players.fetchAll(masters);
		await Odin.Players.fetchAll(players);
		return Odin.Test.assertNotEmptyArray(masters.filterMaster(true).objs) && Odin.Test.assertNotEmptyArray(players.filterMaster(false).objs);
	})

	// Player
	// ------------------------------------------------------------------------

	.async().add("Fetches a player by id", false, async () => {
		const player = new Odin.Player();
		await Odin.Player.fetchId(player, _playerId_1);
		return Odin.Test.assertNotEmptyObject(player.obj);
	})

	.async().add("Fetches a player by name", false, async () => {
		const marshall = new Odin.Player();
		const unknown = new Odin.Player();
		await Odin.Player.fetchName(marshall, 'Marshall');
		await Odin.Player.fetchName(unknown, 'Unknown');
		return Odin.Test.assertNotEmptyObject(marshall.obj) && Odin.Test.assertEmptyObject(unknown.obj);
	})

	.async().add("Player is game master", false, async () => {
		const player = new Odin.Player();
		await Odin.Player.fetchId(player, _playerId_1);
		return Odin.Test.assertTrue(player.isMaster()) && Odin.Test.assertFalse(player.isPlayer());
	})

	// Pages
	// ------------------------------------------------------------------------

	.async().add("Fetches all pages", false, async () => {
		const pages = new Odin.Pages();
		await Odin.Pages.fetchAll(pages);
		return Odin.Test.assertNotEmptyArray(pages.objs);
	})

	// Page
	// ------------------------------------------------------------------------

	.async().add("Fetches a page by id", false, async () => {
		const page = new Odin.Page();
		await Odin.Page.fetchId(page, _pageId_1);
		return Odin.Test.assertNotEmptyObject(page.obj);
	})

	// Decks
	// ------------------------------------------------------------------------

	.async().add("Fetches all decks", false, async () => {
		const decks = new Odin.Decks();
		await Odin.Decks.fetchAll(decks);
		return Odin.Test.assertNotEmptyArray(decks.objs);
	})

	.add("Recalls and shuffles decks", false, () => {
		const decks = new Odin.Decks().findAll().recall().shuffle();
		const deck = new Odin.Deck().findName('Actions');
		const maxSize = _.size(deck.obj.get('currentDeck').split(/\s*,\s*/));
		giveCardToPlayer(_cardId_1, _playerId_1);
		giveCardToPlayer(_cardId_2, _playerId_1);
		decks.shuffle();
		const size = _.size(deck.obj.get('currentDeck').split(/\s*,\s*/));
		return maxSize === size + 2;
	})

	// Deck
	// ------------------------------------------------------------------------

	.async().add("Fetches a deck by id", false, async () => {
		const deck = new Odin.Deck();
		await Odin.Deck.fetchId(deck, _deckId_1);
		return Odin.Test.assertNotEmptyObject(deck.obj);
	})

	.async().add("Fetches a deck by name", false, async () => {
		const actions = new Odin.Deck();
		const unknown = new Odin.Deck();
		await Odin.Deck.fetchName(actions, 'Actions');
		await Odin.Deck.fetchName(unknown, 'Unknown');
		return Odin.Test.assertNotEmptyObject(actions.obj) && Odin.Test.assertEmptyObject(unknown.obj);
	})

	.add("Recalls cards and shuffle deck", false, () => {
		const deck = new Odin.Deck().findName('Actions');
		deck.recall().shuffle();
		const maxSize = _.size(deck.obj.get('currentDeck').split(/\s*,\s*/));
		giveCardToPlayer(_cardId_1, _playerId_1);
		giveCardToPlayer(_cardId_2, _playerId_1);
		deck.shuffle();
		const size = _.size(deck.obj.get('currentDeck').split(/\s*,\s*/));
		return maxSize === size + 2;
	})

	.add("Cards since last shuffle", false, () => {
		const deck = new Odin.Deck().findName('Actions').recall().shuffle();
		const maxSize = _.size(deck.lastShuffle().objs);
		giveCardToPlayer(_cardId_1, _playerId_1);
		giveCardToPlayer(_cardId_2, _playerId_1);
		const before = _.size(deck.lastShuffle().objs);
		const after = _.size(deck.shuffle().lastShuffle().objs);
		return maxSize === before && maxSize === after + 2;
	})

	// Cards
	// ------------------------------------------------------------------------

	.async().add("Fetches all cards on table", false, async () => {
		const decks = new Odin.Decks().recall();
		const deck = new Odin.Deck().findName('Actions').shuffle();
		const cards = new Odin.Cards();
		playCardToTable(_cardId_1);
		await Odin.Cards.fetchTable(cards);
		const success = cards.objs.length === 1;
		return success;
	})

	.add("Recall cards", true, () => {
		// Test: new Odin.Decks().recall()
		return true;
	})

	.add("Shuffle cards", true, () => {
		// Test: new Odin.Decks().shuffle()
		return true;
	})

	.add("Finds all cards", true, () => {
		//return Odin.Test.assertNotEmptyArray(new Odin.Cards().findAll().objs);
		return true;
	})

	// Card
	// ------------------------------------------------------------------------

	.async().add("Fetches a card by id", false, async () => {
		const card = new Odin.Card();
		await Odin.Card.fetchId(card, _cardId_1);
		return Odin.Test.assertNotEmptyObject(card.obj);
	})

	// Hands
	// ------------------------------------------------------------------------

	.async().add("Fetches all hands", false, async () => {
		const hands = new Odin.Hands();
		await Odin.Hands.fetchAll(hands);
		return Odin.Test.assertNotEmptyArray(hands.objs);
	})

	// Hand
	// ------------------------------------------------------------------------

	.async().add("Fetches a hand by id", false, async () => {
		const hand = new Odin.Hand();
		await Odin.Hand.fetchId(hand, _handId_1);
		return Odin.Test.assertNotEmptyObject(hand.obj);
	})

	// Tokens
	// ------------------------------------------------------------------------

	.add("Finds all tokens", true, () => {
		//return Odin.Test.assertNotEmptyArray(new Odin.Tokens().findAll().objs);
		return true;
	})

	// Token
	// ------------------------------------------------------------------------

	.add("Finds a token by id", true, () => {
		//return Odin.Test.assertNotEmptyObject(new Odin.Token().findId(_tokenId_1).obj);
		return true;
	})

	// Characters
	// ------------------------------------------------------------------------

	.async().add("Fetches all characters", false, async () => {
		const characters = new Odin.Characters();
		await Odin.Characters.fetchAll(characters);
		return Odin.Test.assertNotEmptyArray(characters.objs);
	})

	.add("Finds characters by name", false, () => {
		return Odin.Test.assertNotEmptyArray(new Odin.Characters().findName('Lincoln').objs);
	})

	// Character
	// ------------------------------------------------------------------------

	.async().add("Fetches a character by id", false, async () => {
		const character = new Odin.Character();
		await Odin.Character.fetchId(character, _characterId_1);
		return Odin.Test.assertNotEmptyObject(character.obj);
	})

	.async().add("Character is a player character", false, async () => {
		const pc = new Odin.Character();
		const npc = new Odin.Character();
		await Odin.Character.fetchId(pc, _characterId_1);
		await Odin.Character.fetchId(npc, _characterId_2);
		return Odin.Test.assertFalse(pc.isPlayerCharacter()) && Odin.Test.assertTrue(npc.isPlayerCharacter());
	})

	;

// The API message subscribtion.
on('ready',function() {
	'use strict';
	on('chat:message', (msg) => {
		(async () => {
			await Odin.EventHandler.handleCommand(msg, Odin.TestSuite.processCommand, _odin);
		})();
	});
	on("add:graphic", function(obj) {
		log(obj);
	});
});