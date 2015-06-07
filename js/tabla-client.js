;(function () {
    'use strict';

    var cards = $$('section#board > article');

    getTabla().then(function (tabla) {
        tabla.forEach(function (cardData, i) {
            var card                  = cards[i];
            card.card                 = cardData;
            $('img', card).src        = cardData.src;
            $('h1', card).textContent = cardData.title;
        });
    });

    $('section#board').addEventListener('click', function (e) {
        if (!e.target.tagName.toLowerCase() === 'img') return;

        e.target.classList.toggle('selected');
    });

    $('button#loteria').addEventListener('click', function () {
        loteria.stopGame();

        var answers  = cards.map(cardAndSelectedState).map(loteria.checkCard),
            selected = answers.map(selectedState),
            score    = scoreTabla(selected);

        if (score > 0) {
            alert('You win with a score of ' + score);
        } else {
            alert('You lose!');
        }

        // cardAndSelectedState :: Element -> { card :: Card, selected :: Boolean }
        function cardAndSelectedState(el) {
            return {
                card     : el.card,
                selected : $('img', el).classList.contains('selected')
            };
        }

        // selectedState :: { card :: Card, selected :: Boolean } -> Boolean
        function selectedState(cardAndSelected) {
            return cardAndSelected.selected;
        }
    });
}());
