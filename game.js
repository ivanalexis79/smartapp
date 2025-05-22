const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 500;

let blocks = [];
let blockCount = 0;
let score = 0;
let timeLeft = 5;
let gameRunning = false;

// Genera bloques en espacio isométrico
function createBlock() {
    let block = {
        x: 150 + Math.random() * 100 - 50, // Efecto isométrico
        y: 250 - blockCount * 20, // Apilamiento
        width: 30,
        height: 30
    };
    blocks.push(block);
    blockCount++;
}

// Dibuja bloques en una perspectiva isométrica
function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    blocks.forEach(block => {
        ctx.fillStyle = "red";
        ctx.fillRect(block.x, block.y, block.width, block.height);
    });
}

// Temporizador de 5 segundos
function startTimer() {
    timeLeft = 5;
    document.getElementById("timer").innerText = `Tiempo: ${timeLeft}s`;

    let timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Tiempo: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameRunning = false;
            document.getElementById("result").innerText = "¡Tiempo agotado! Juego terminado.";
        }
    }, 1000);
}

// Inicia el juego con bloques aleatorios
function startGame() {
    return;
    gameRunning = true;
    blocks = [];
    blockCount = Math.floor(Math.random() * 13) + 6; // Entre 6 y 18 bloques
    for (let i = 0; i < blockCount; i++) {
        createBlock();
    }
    drawBlocks();
    startTimer();
}

// Verifica la respuesta del usuario
document.getElementById("checkAnswer").addEventListener("click", function() {
    if (!gameRunning) return;

    let userGuess = parseInt(document.getElementById("userInput").value);
    if (userGuess === blockCount) {
        score++;
        document.getElementById("score").innerText = `Puntos: ${score}`;
        document.getElementById("result").innerText = "¡Correcto! 🚀 Nueva ronda...";
        startGame();
    } else {
        document.getElementById("result").innerText = "Incorrecto. ¡Juego terminado!";
        gameRunning = false;
    }
});

// Inicia la primera ronda
startGame();
