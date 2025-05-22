const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 500;

let blocks = [];
let blockCount = 0;
let score = 0;
let timeLeft = 15;
let gameRunning = false;
let timerInterval;

// Función para generar un número aleatorio de bloques (entre 6 y 18)
function createBlocks() {
    blocks = []; // Limpia bloques anteriores
    blockCount = Math.floor(Math.random() * 13) + 6; // Número aleatorio
    for (let i = 0; i < blockCount; i++) {
        blocks.push({
            x: 150 + Math.random() * 100 - 50, // Efecto isométrico
            y: 250 - i * 20, // Apilamiento
            width: 30,
            height: 30
        });
    }
}

// Dibuja los bloques en la perspectiva isométrica
function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blocks.forEach(block => {
        ctx.fillStyle = "red";
        ctx.fillRect(block.x, block.y, block.width, block.height);
    });
}

// Temporizador de 5 segundos con sincronización
function startTimer() {
    timeLeft = 5;
    document.getElementById("timer").innerText = `Tiempo: ${timeLeft}s`;

    if (timerInterval) clearInterval(timerInterval); // Evita múltiples temporizadores

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Tiempo: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameRunning = false;
            document.getElementById("result").innerText = "¡Tiempo agotado! Juego terminado.";
        }
    }, 1000);
}

// Inicia una nueva ronda del juego
function startGame() {
    gameRunning = true;
    createBlocks();
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
        clearInterval(timerInterval);
    }
});

// Inicia la primera ronda
startGame();
