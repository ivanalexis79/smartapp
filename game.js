const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 500;

let blocks = [];
let blockCount = 0;

// Genera bloques aleatorios que caen
function createBlock() {
    let block = {
        x: Math.random() * (canvas.width - 30),
        y: 0,
        width: 30,
        height: 30,
        speed: 2
    };
    blocks.push(block);
    blockCount++;
}

// Actualiza posición de los bloques
function updateBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    blocks.forEach(block => {
        block.y += block.speed;
        ctx.fillStyle = "red";
        ctx.fillRect(block.x, block.y, block.width, block.height);
    });

    blocks = blocks.filter(block => block.y < canvas.height);
}

// Bucle de juego
function gameLoop() {
    if (Math.random() < 0.05) { // Probabilidad de que aparezca un nuevo bloque
        createBlock();
    }
    updateBlocks();
    requestAnimationFrame(gameLoop);
}

// Verifica la respuesta del usuario
document.getElementById("checkAnswer").addEventListener("click", function() {
    let userGuess = parseInt(document.getElementById("userInput").value);
    document.getElementById("result").innerText = userGuess === blockCount
        ? "¡Correcto! 🎉"
        : "Incorrecto. Inténtalo de nuevo.";
});

// Inicia el juego
gameLoop();
