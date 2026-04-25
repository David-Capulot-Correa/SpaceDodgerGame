🚀 Space Shooter Game

Um jogo 2D feito em JavaScript + Canvas, onde você controla uma nave e precisa sobreviver desviando e destruindo asteroides enquanto coleta power-ups.

🎮 Como jogar
Use as teclas:
⬅️ Seta esquerda → mover para a esquerda
➡️ Seta direita → mover para a direita
O objetivo é:
Desviar dos asteroides ☄️
Destruí-los com tiros 🔫
Coletar power-ups ⚡
Fazer a maior pontuação possível 🏆
⚡ Power-ups

O jogo possui dois tipos de power-ups:

🛡️ Shield (Escudo)
Protege contra colisões por alguns segundos
🔥 Auto Shoot
Ativa disparo automático
🧠 Mecânicas do jogo
Asteroides caem continuamente do topo da tela
A velocidade e quantidade aumentam com o tempo
Cada asteroide desviado ou destruído aumenta o score
Colidir sem escudo = Game Over
🖼️ Assets necessários

Coloque as imagens na pasta images/:

images/
├── fundo.png
├── nave.png
├── asteroid.png
├── powerup.png
└── powerup_shield.png
▶️ Como rodar
Crie um arquivo index.html
Adicione um <canvas>:
<canvas id="gameCanvas"></canvas>
<button onclick="startGame()">Start</button>
<div id="menu">Clique para jogar</div>
Inclua seu script JS:
<script src="game.js"></script>
Abra no navegador 🌐
🛠️ Tecnologias usadas
JavaScript
HTML5 Canvas
📈 Melhorias futuras
Sistema de vidas ❤️
Sons e música 🎵
Menu mais elaborado 🎨
Dificuldade progressiva ⚠️
Chefão (boss fight) 👾
👨‍💻 Autor

Desenvolvido como projeto de jogo simples em JavaScript.
