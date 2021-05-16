carregarSpritesPerson(document.getElementById("sprite"));
carregarSpritesInimigo(document.getElementById("sprite"));

var bg = document.getElementById("bg"); // imagem de fundo

// variáveis de normalização de tempo
var tempoAtual;
var tempoAnterior = performance.now(); // obtém o tempo inicial (do primeiro quadro)
var deltaTime;

// variáveis usadas no gerenciamento das teclas direcionais
var k_cima = false;
var k_baixo = false;
var k_esquerda = false;
var k_direita = false;

// registra os eventos de pressionamento e soltura das teclas
window.addEventListener('keydown', keyPressed, false);
window.addEventListener('keyup', keyReleased, false);

function gameLoop() {
    tempoAtual = performance.now(); // obtém o tempo atual
    deltaTime = (tempoAtual - tempoAnterior)*(6e-2);
    handlerEvents();
    update(deltaTime);
    render();
    tempoAnterior = tempoAtual; // atualiza o tempo anterior (para o próximo quadro)
}


// 1ª função do gameloop
function handlerEvents() {
    handlerEventsPerson(k_cima, k_baixo, k_esquerda, k_direita);
}

// 2ª função do gameloop
function update(deltaTime) {
    update_personagem(deltaTime);
    update_inimigo(deltaTime);
    testeColisoes(deltaTime);
}

// 3ª função do gameloop
function render() {
    
    context.drawImage(bg, 0, 0); // desenha o fundo
    context.fillStyle = 'gray';
    context.fillRect(LIMITE_DIREITO, 0, 5, ALTURA_TELA); // desenha o limite do Personagem
    context.fillRect(LIMITE_ESQUERDO, 0, 5, ALTURA_TELA); // desenha o limite do Inimigo
	
    context.drawImage(person_atual, person_posX, person_posY);
    context.drawImage(inimigo_atual, inimigo_posX, inimigo_posY);

}

// função invocada para testar as colisões
function testeColisoes(deltaTime) {
    // testa as colisões entre o personagem e os cantos direito e esquerdo da tela
    if (person_posX + (person_raio * 2) >= LARGURA_TELA || person_posX <= 0) {
        desmover_X_personagem(deltaTime);
    }
    // testa as colisões entre o personagem e os cantos superior e inferior da tela
    if (person_posY + (person_raio * 2) >= ALTURA_TELA || person_posY <= 0) {
        desmover_Y_personagem(deltaTime);
    }

    // colisão do jogador com o limite direito do campo ------------------------------
	if(person_posX <= LIMITE_DIREITO) {
        desmover_X_personagem(deltaTime);
    }
}


// função invocada quando uma tecla é pressionada
function keyPressed(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: k_esquerda = true; break; //Left key
        case 38: k_cima = true; break; //Up key
        case 39: k_direita = true; break; //Right key
        case 40: k_baixo = true; break; //Down key
    }
}

// função invocada quando uma tecla é solta
function keyReleased(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: k_esquerda = false; break; //Left key
        case 38: k_cima = false; break; //Up key
        case 39: k_direita = false; break; //Right key
        case 40: k_baixo = false; break; //Down key
    }
}

setInterval(gameLoop, 17); // define as repetições do gameloop
