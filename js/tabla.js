;(function () {
    'use strict';

    window.getTabla   = getTabla;
    window.scoreTabla = scoreTabla;

    // Tabla :: [Card]
    // A tabla is an array of 16 cards, displayed as a 4 x 4 grid.
    //
    // A tabla is constructed by randomly choosing a permutation of
    // the input card array.

    // generateTabla :: [Card] -> Tabla
    // Given an array of cards, generates a random tabla from them.
    //
    // The Card's internal structure is not used and could be expressed
    // more generally as a type variable.
    function generateTabla(cards) {
        var choices = cards.slice(0),
            tabla   = array(16);

        return tabla.map(chooseCard);

        // chooseCard :: undefined -> Card
        function chooseCard() {
            var index = Math.ceil(Math.random() * choices.length) - 1;
            return choices.splice(index, 1)[0];
        }
    }

    // getTabla :: undefined -> Promise<Tabla, Error>
    function getTabla() {
        return loteria.getCards().then(generateTabla);
    }

    // printTabla :: Tabla -> undefined
    // Prints a tabla to the console.1
    function printTabla(tabla) {
        array(4).forEach(function (_, i) {
            console.log(tabla.slice(i * 4, i * 4 + 4));
        });
    }

    // scoreTabla :: [Boolean] -> Number
    // Scores a array of Boolean values, one per each card in a tabla,
    // where true represents a matched card and false an unmatched. The
    // returned number is the number of scoring matches.
    function scoreTabla(tabla) {
        return array(18).map(checkScore).reduce(sum, 0);

        // checkScore :: a, Number -> 0 || 1
        // Checks for one of the 18 possible Loterias on the tabla
        // by zero-based index, enumerated in the order shown on the Wikipedia
        // diagram, which is roughly: rows, columns, squares, and lastly the
        // corners.
        //
        // The first argument is thrown away.  A 1 is returned if there is
        // a Loteria at that index, 0 otherwise.
        function checkScore(_, i) {
            switch (true) {
                case i < 4  : return checkRow(i);
                case i < 8  : return checkColumn(i - 4);
                case i < 17 : return checkSquare(i - 8);
                default     : return checkCorners();
            }

            // checkColumn :: Number -> Number
            // Checks a tabla column by zero-based index.
            function checkColumn(n) {
                var col = [tabla[n], tabla[4 + n], tabla[8 + n], tabla[12 + n]];
                return col.every(isTrue) ? 1 : 0;
            }

            // checkCorners :: undefined -> Number
            // Checks the four corners of the tabla.
            function checkCorners() {
                var corners = [tabla[0], tabla[3], tabla[12], tabla[15]];
                return corners.every(isTrue) ? 1 : 0;
            }

            // checkRow :: Number -> Number
            // Checks a tabla row by zero-based index.
            function checkRow(n) {
                var i   = n * 4,
                    row = tabla.slice(i, i + 4);

                return row.every(isTrue) ? 1 : 0;
            }

            // checkSquare :: Number -> Number
            // Checks a tabla square by zero-based index.
            function checkSquare(n) {
                var squares = [
                    [0 , 1 , 4 , 5 ],
                    [1 , 2 , 5 , 6 ],
                    [2 , 3 , 6 , 7 ],
                    [4 , 5 , 8 , 9 ],
                    [5 , 6 , 9 , 10],
                    [6 , 7 , 10, 11],
                    [8 , 9 , 12, 13],
                    [9 , 10, 13, 14],
                    [10, 11, 14, 15]
                ];

                return squares[n].every(tablaIndexIsTrue) ? 1 : 0;

                // tablaIndexIsTrue :: Number -> Boolean
                function tablaIndexIsTrue(i) {
                    return isTrue(tabla[i]);
                }
            }

            // isTrue :: a -> Boolean
            function isTrue(b) {
                return b === true;
            }
        }

        // sum :: Number, Number -> Number
        function sum(a, b) {
            return a + b;
        }
    }

    /** Private Functions **/

    // array :: Number -> [String]
    function array(len) {
        return new Array(len).join(' ').split(' ');
    }
}());
