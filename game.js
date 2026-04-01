const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ===== IMAGENS =====
const bgImage = new Image();
bgImage.src = "images/fundo.png";

const playerImg = new Image();
playerImg.src = "images/nave.png";

const asteroidImg = new Image();
asteroidImg.src = "images/asteroid.png";

const powerPointImg = new Image();
powerPointImg.src = "images/powerup.png";

const powerShieldImg = new Image();
powerShieldImg.src = "images/powerup_shield.png";

// ===== GAME STATE =====
let gameRunning = false;
let score = 0;

// ===== PLAYER =====
let player = {
  x: canvas.width / 2,
  y: canvas.height - 120,
  size: 60,
  speed: 10,
  shield: false,
  shoot: false
};

// ===== ARRAYS =====
let asteroids = [];
let bullets = [];
let powerUps = [];

// ===== CONTROLES =====
let keys = {};

// ===== FUNDO =====
let bgY = 0;

// ===== EFEITO =====
let powerEffectTime = 0;
let powerColor = "yellow";

// ===== START =====
function startGame() {
  document.getElementById("menu").style.display = "none";
  gameRunning = true;
  gameLoop();
}

// ===== INPUT =====
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// ===== LOOP =====
function gameLoop() {
  if (!gameRunning) return;

  update();
  draw();

  requestAnimationFrame(gameLoop);
}

// ===== UPDATE =====
function update() {

  // Movimento
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  // Limites
  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));

  // Tiro automático
  if (player.shoot && Math.random() < 0.3) {
    bullets.push({ x: player.x + player.size/2 - 5, y: player.y });
  }

  // Asteroides
  if (Math.random() < 0.05) {
    asteroids.push({
      x: Math.random() * canvas.width,
      y: -40,
      size: 40 + Math.random()*20
    });
  }

  asteroids.forEach((a, i) => {
    a.y += 6;

    // Colisão
    if (
      a.x < player.x + player.size &&
      a.x + a.size > player.x &&
      a.y < player.y + player.size &&
      a.y + a.size > player.y
    ) {
      if (!player.shield) {
        alert("GAME OVER! Score: " + score);
        location.reload();
      }
    }

    if (a.y > canvas.height) {
      asteroids.splice(i, 1);
      score++;
    }
  });

  // Balas
  bullets.forEach((b, i) => {
    b.y -= 12;

    asteroids.forEach((a, j) => {
      if (
        b.x < a.x + a.size &&
        b.x + 10 > a.x &&
        b.y < a.y + a.size &&
        b.y + 20 > a.y
      ) {
        asteroids.splice(j, 1);
        bullets.splice(i, 1);
        score += 5;
      }
    });
  });

  // PowerUps
  if (Math.random() < 0.01) {
    powerUps.push({
      x: Math.random() * canvas.width,
      y: -30,
      type: ["shield", "shoot"][Math.floor(Math.random() * 2)]
    });
  }

  powerUps.forEach((p, i) => {
    p.y += 4;

    if (
      p.x < player.x + player.size &&
      p.x + 30 > player.x &&
      p.y < player.y + player.size &&
      p.y + 30 > player.y
    ) {
      powerEffectTime = 20;

      if (p.type === "shield") {
        player.shield = true;
        powerColor = "cyan";
        setTimeout(() => player.shield = false, 4000);
      }

      if (p.type === "shoot") {
        player.shoot = true;
        powerColor = "orange";
        setTimeout(() => player.shoot = false, 4000);
      }

      powerUps.splice(i, 1);
    }
  });
}

// ===== DRAW =====
function draw() {

  // Fundo rolando
  bgY += 2;
  if (bgY >= canvas.height) bgY = 0;

  ctx.drawImage(bgImage, 0, bgY, canvas.width, canvas.height);
  ctx.drawImage(bgImage, 0, bgY - canvas.height, canvas.width, canvas.height);

  // Efeito power
  if (powerEffectTime > 0) {
    ctx.fillStyle = powerColor;
    ctx.beginPath();
    ctx.arc(player.x + player.size/2, player.y + player.size/2, player.size, 0, Math.PI * 2);
    ctx.fill();
    powerEffectTime--;
  }

  // Escudo
  if (player.shield) {
    ctx.fillStyle = "rgba(0,255,255,0.3)";
    ctx.beginPath();
    ctx.arc(player.x + player.size/2, player.y + player.size/2, player.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Player
  ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);

  // Asteroides
  asteroids.forEach(a => {
    ctx.drawImage(asteroidImg, a.x, a.y, a.size, a.size);
  });

  // Balas
  ctx.fillStyle = "red";
  bullets.forEach(b => {
    ctx.fillRect(b.x, b.y, 10, 20);
  });

  // PowerUps
  powerUps.forEach(p => {
    if (p.type === "shield") {
      ctx.drawImage(powerShieldImg, p.x, p.y, 30, 30);
    } else {
      ctx.drawImage(powerPointImg, p.x, p.y, 30, 30);
    }
  });

  // Score
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, 20, 40);
}