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

// Genera bloques aleatorios
function createBlocks() {
    blocks = [];
    blockCount = Math.floor(Math.random() * 13) + 6; 
    for (let i = 0; i < blockCount; i++) {
        blocks.push({
            x: 150 + Math.random() * 100 - 50, 
            y: 250 - i * 20, 
            size: 30
        });
    }
}

// Dibuja un cubo isométrico
function drawIsoCube(x, y, size) {
    ctx.strokeStyle = "#000";

    let topX = x + size / 2, topY = y - size / 2;
    let rightX = x + size, rightY = y;
    let bottomX = x + size / 2, bottomY = y + size / 2;

    ctx.fillStyle = "#ff4d4d";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(topX, topY);
    ctx.lineTo(rightX, rightY);
    ctx.lineTo(bottomX, bottomY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#cc0000";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(bottomX, bottomY);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

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

// Renderiza los cubos
function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blocks.forEach(block => {
        drawIsoCube(block.x, block.y, block.size);
    });
}

// Inicia el temporizador
function startTimer() {
    timeLeft = 15;
    document.getElementById("timer").innerText = `Tiempo: ${timeLeft}s`;

    if (timerInterval) clearInterval(timerInterval);

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

// Genera seis opciones de respuesta con un botón correcto aleatorio
function generateAnswerButtons() {
    const buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.innerHTML = "";
    
    let possibleAnswers = new Set();
    while (possibleAnswers.size < 6) {
        possibleAnswers.add(Math.floor(Math.random() * 13) + 6);
    }
    let answersArray = Array.from(possibleAnswers);
    
    if (!answersArray.includes(blockCount)) {
        answersArray[Math.floor(Math.random() * 6)] = blockCount;
    }

    answersArray.forEach(num => {
        let button = document.createElement("button");
        button.innerText = num;
        button.classList.add("option-button");
        button.onclick = () => checkAnswer(num);
        buttonContainer.appendChild(button);
    });
}

// Verifica la respuesta
function checkAnswer(selectedNumber) {
    if (!gameRunning) return;

    if (selectedNumber === blockCount) {
        score++;
        document.getElementById("score").innerText = `Puntos: ${score}`;
        document.getElementById("result").innerText = "¡Correcto! 🚀 Nueva ronda...";
        startGame();
    } else {
        document.getElementById("result").innerText = "Incorrecto. ¡Juego terminado!";
        gameRunning = false;
        clearInterval(timerInterval);
    }
}

// Inicia el juego
function startGame() {
    gameRunning = true;
    createBlocks();
    drawBlocks();
    generateAnswerButtons();
    startTimer();
}

// Inicia el juego al cargar la página
startGame();
