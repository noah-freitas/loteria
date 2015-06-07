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
        return cardAndSelected.selected ? checkPlayed() : cardAndSelected;

        // checkPlayed :: undefined -> { card :: Card, selected :: Boolean }
        function checkPlayed() {
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
        getCards().then(shuffleCards)
                  .then(startGameInterval);

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

    // shuffle :: [a] -> [a]
    function shuffle(a) {
        var choice,
            choices  = a.slice(0),
            shuffled = [];

        while (choices.length > 0) {
            choice = choices.splice(Math.ceil(Math.random() * choices.length) - 1, 1)[0];
            shuffled.push(choice);
        }

        return shuffled;
    }

    // shuffleCards :: undefined -> undefined
    function shuffleCards() {
        draw    = shuffle(cards);
        discard = [];
    }
}());
