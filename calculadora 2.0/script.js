let display = document.getElementById("display");

let buttonSound = new Audio("sounds/boton.mp3");
let errorSound = new Audio("sounds/error.mp3");

function playButtonSound() {
    buttonSound.currentTime = 0; 
    buttonSound.play();
}

function playErrorSound() {
    errorSound.currentTime = 0;
    errorSound.play();
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

function calculateResult() {
    try {
        let result = eval(display.value);
        if (isNaN(result) || result === Infinity || result === -Infinity) {
            throw new Error();
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

