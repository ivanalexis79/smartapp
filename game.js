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
            size: 30
        });
    }
}

// Dibuja un cubo en perspectiva isométrica
function drawIsoCube(x, y, size) {
    ctx.strokeStyle = "#000"; // Bordes negros

    // Calculamos los puntos para la perspectiva isométrica
    let topX = x + size / 2;
    let topY = y - size / 2;
    let rightX = x + size;
    let rightY = y;
    let bottomX = x + size / 2;
    let bottomY = y + size / 2;

    // Dibujamos la cara frontal (roja)
    ctx.fillStyle = "#ff4d4d";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(topX, topY);
    ctx.lineTo(rightX, rightY);
    ctx.lineTo(bottomX, bottomY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dibujamos la cara lateral (oscura)
    ctx.fillStyle = "#cc0000";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(bottomX, bottomY);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dibujamos la cara superior (más clara)
    ctx.fillStyle = "#ff6666";
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(rightX, rightY);
    ctx.lineTo(rightX - size / 2, rightY + size / 2);
    ctx.lineTo(bottomX, bottomY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// Renderiza todos los cubos en pantalla
function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blocks.forEach(block => {
        drawIsoCube(block.x, block.y, block.size);
    });
}

// Temporizador de 15 segundos con sincronización
function startTimer() {
    timeLeft = 15;
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
