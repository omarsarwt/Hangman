/*jslint this:true,
        devel: true,
        eval: true,
        browser: true,
        for:true,
        es6
*/
/*global window*/

var lettersArray = Array.from("abcdefghijklmnopqrstuvwxyz"),
    letterDiv = document.querySelector('.container .row .letter'),
    wrong = 0,
    spc = false,
    correct = 0;

/*Start letter for clicks*/
lettersArray.forEach(function (letter) {
    "use strcit";
    var span = document.createElement('span');
    span.setAttribute('class', 'letter-box');
    span.textContent = letter;
    letterDiv.appendChild(span);
});
/*End letter for clicks*/

/*Start choose category and item*/
var words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

var allkeys = Object.keys(words),
    randomKeyIndex = Math.floor(Math.random() * allkeys.length),
    randomkey = allkeys[randomKeyIndex],
    randomValue = words[randomkey],
    randomValueIndex = Math.floor(Math.random() * randomValue.length),
    randomValueValue = randomValue[randomValueIndex];

document.querySelector('.container .game-info .game-category span').textContent = randomkey;

var randomValueValueArray = Array.from(randomValueValue.toLowerCase());
randomValueValueArray.forEach(function (chr) {
    "use strict";
    var span = document.createElement('span');
    if (chr === " ") {
        spc = true;
        span.className = 'white-space';
    }
    document.querySelector('.container .letter-guess').appendChild(span);
});
/*End choose category and item*/

document.addEventListener('click', function (e) {
    "use strict";
    var allGuessSpan = document.querySelectorAll('.container .letter-guess span'),
        isFound = false;
    if (e.target.className === 'letter-box') {
        e.target.classList.add('clicked');
        randomValueValueArray.forEach(function (randomChr, index) {
            if (randomChr === e.target.textContent) {
                isFound = true;
                correct += 1;
                allGuessSpan[index].textContent = randomChr.toUpperCase();
            }
        });
        if (!isFound) {
            document.getElementById('fail').play();
            wrong += 1;
            document.querySelector('.container .row .hangman-draw').classList.add(`wrong-${wrong}`);
            if (wrong === 8) {
                document.querySelector('.container .row .letter').classList.add('no-click');
                document.getElementById('result').classList.add('result');
                document.getElementById('failed').classList.add('failed');
                document.getElementById('failed').textContent = `Failed! Correct Word is ${randomValueValue}`;
            }
        } else {
            document.getElementById('success').play();
            if ((spc && correct === randomValueValue.length - 1) || (!spc && correct === randomValueValue.length)) {
                document.querySelector('.container .row .letter').classList.add('no-click');
                document.getElementById('result').classList.add('result');
                document.getElementById('successed').classList.add('successed');
                document.getElementById('successed').textContent = `Successed! Congratulation`;
            }
        }
    }
});


