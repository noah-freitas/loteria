;(function () {
    'use strict';

    var proto = Object.assign(Object.create(HTMLElement.prototype), {
        attachedCallback : attachedCallback,
        createdCallback  : createdCallback
    });

    window.LoteriaTablaElement = document.registerElement('loteria-tabla', { prototype : proto });

    // attachedCallback :: @LoteriaTablaElement, undefined -> undefined
    function attachedCallback() {
        var frag = document.createDocumentFragment();
        this.cards.forEach(attachCard(frag));
        this.appendChild(frag);

        // attachCard :: DocumentFragment -> (LoteriaCardElement -> undefined)
        function attachCard(frag) {
            return function (card) {
                frag.appendChild(card);
            };
        }
    }

    // createdCallback :: @LoteriaTablaElement, undefined -> undefined
    function createdCallback() {
        this.cards = makeCards();
    }

    // makeCards :: undefined -> [LoteriaCardElement]
    function makeCards() {
        return new Array(16).join(' ').split(' ').map(makeCard);

        // makeCard :: undefined -> LoteriaCardElement
        function makeCard() {
            var card         = document.createElement('loteria-card');
            card.dataset.src = 
            return card;
        }
    }
}());
