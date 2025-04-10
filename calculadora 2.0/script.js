let display = document.getElementById("display");
let resultDisplay = document.getElementById("result-display");

let buttonSound = new Audio("sounds/quack.mp3");
let errorSound = new Audio("sounds/error.mp3");
let bubbleSound = new Audio("sounds/bubble.mp3");
let cuack = new Audio("sounds/cuack.mp3");
let duckRainSound = new Audio("sounds/duck_rain.mp3"); // Sonido para la lluvia de patitos
let duckTalkSound = new Audio("sounds/duck_talk.mp3"); // Sonido para el pato que habla

function playButtonSound() {
    buttonSound.currentTime = 0;
    buttonSound.play();
}

function playErrorSound() {
    errorSound.currentTime = 0;
    errorSound.play();
}

function scuack() {
    cuack.currentTime = 0;
    cuack.play();
}

function playDuckRainSound() {
    duckRainSound.currentTime = 0;
    duckRainSound.play();
}

function appendValue(value) {
    playButtonSound();
    display.value += value;
}

function clearDisplay() {
    playButtonSound();
    display.value = "";
}

function deleteLast() {
    playButtonSound();
    display.value = display.value.slice(0, -1);
}

function safeCalculate(expression) {
    try {
        return new Function('return ' + expression)();
    } catch (error) {
        return NaN;
    }
}

function showDuckRain() {
    let rain = "";
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    for (let i = 0; i < 30; i++) {
        let angle = Math.random() < 0.5 ? 0 : Math.PI;
        let distance = Math.random() * (window.innerWidth / 2);

        let x = Math.cos(angle) * distance;
        let y = (Math.random() * 100 - 50);

        rain += `<img src='img/pato.png' alt='Pato' class='duck-confetti' style='width: 20px; left: ${centerX + x}px; top: ${centerY + y}px; --x: ${x / distance}; --y: ${y / distance};'>`;
    }
    resultDisplay.innerHTML += rain;

    setTimeout(() => {
        let confetti = document.querySelectorAll('.duck-confetti');
        confetti.forEach(duck => duck.remove());
    }, 1500);
}

function calculateResult() {
    try {
        let result = eval(display.value);
        if (isNaN(result) || result === Infinity || result === -Infinity) {
            throw new Error();
        } else {
            showDuckRain();
        }
        display.value = result;
    } catch {
        display.value = "Error";
        playErrorSound();
    }
}



// Detectar entrada por teclado
document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (!isNaN(key) || "+-*/.".includes(key)) {
        appendValue(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
