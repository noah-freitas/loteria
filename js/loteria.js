;(function () {
    'use strict';

    window.loteria = {
        checkCard : checkCard,
        getCards  : getCards,
        startGame : startGame,
        stopGame  : stopGame
    };

    var cards, draw, discard, gameInterval;

    // checkCard :: { card :: Card, selected :: Boolean } -> { card :: Card, selected :: Boolean }
    function checkCard(cardAndSelected) {
        // We only need to check the cards that claim to have been played.  We pass
        // through the others.
        return cardAndSelected.selected ? checkPlayed() : cardAndSelected;

        // checkPlayed :: undefined -> { card :: Card, selected :: Boolean }
        function checkPlayed() {
            // The card should be selected if it's in the discard pile.
            cardAndSelected.selected = Boolean(discard.find(function (c) { return c.title === cardAndSelected.card.title; }));
            return cardAndSelected;
        }
    }

    // drawCard :: undefined -> undefined
    function drawCard() {
        var card = draw.pop();
        if (card) {
            discard.push(card);
            showCard(card);
        } else {
            shuffleCards();
            drawCard();
        }
    }

    // getCards :: undefined -> Promise<[Card], Error>
    function getCards() {
        return cards ? Promise.resolve(cards) : fetch('/data/cards.json')
                                                    .then(json)
                                                    .then(storeCards);

        // json :: Response -> Promise<String, Error>
        function json(resp) {
            return resp.json();
        }

        // storeCards :: [Card] -> [Card]
        function storeCards(cs) {
            cards = cs;
            return cs;
        }
    }

    // showCard :: Card -> undefined
    function showCard(card) {
        $('section#card img').src = card.src;
    }

    // startGame :: undefined -> undefined
    function startGame() {
        discard = [];

        getCards().then(shuffleCards)
                  .then(startGameInterval);

        // startGameInterval :: undefined -> undefined
        function startGameInterval() {
            drawCard();
            gameInterval = setInterval(drawCard, 3000);
        }
    }

    // stopGame :: undefined -> undefined
    function stopGame() {
        clearInterval(gameInterval);
        gameInterval = null;
    }

    // shuffleCards :: undefined -> undefined
    function shuffleCards() {
        draw = shuffle(cards);

        // shuffle :: [a] -> [a]
        function shuffle(a) {
            var choice,
                choices  = a.slice(0),
                shuffled = [];

            // While there are choices, choose and remove a random element from the array.
            while (choices.length > 0) {
                choice = choices.splice(Math.ceil(Math.random() * choices.length) - 1, 1)[0];
                shuffled.push(choice);
            }

            return shuffled;
        }
    }
}());
