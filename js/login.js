;(function () {
    'use strict';

    if (sessionStorage.user) {
        setUser(sessionStorage.user);
    } else {
        $('section#login form').addEventListener('submit', loginUser);
    }

    // loginUser :: Event -> undefined
    function loginUser(e) {
        e.preventDefault();

        var user            = $('section#login input[name="user"]').value;
        sessionStorage.user = user;

        setUser(user);
        $('section#login form').removeEventListener('submit', loginUser);
    }

    // setUser :: String -> undefined
    function setUser(user) {
        $('section#login').style.display  = 'none';
        $('span.user-name').textContent   = user;
        $('button#loteria').style.display = 'inline-block';
        $('section#board').style.display  = 'block';
        $('section#card').style.display   = 'block';

        loteria.startGame();
    }
}());
