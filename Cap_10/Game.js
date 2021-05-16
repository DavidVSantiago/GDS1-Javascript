carregarSpritesPerson(document.getElementById("sprite_person_bola"));
carregarSpritesInimigo(document.getElementById("sprite_inimigo"));
carregarSpritesBolinha(document.getElementById("sprite_person_bola"));

var bg = document.getElementById("bg"); // imagem de fundo

// variáveis das mudanças de ESTADOS do jogo
var ESTADO = 'S';
agendarTransicao(3000, 'E');

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
    deltaTime = (tempoAtual - tempoAnterior) * (6e-2);
    handlerEvents();
    update(deltaTime);
    render();
    tempoAnterior = tempoAtual; // atualiza o tempo anterior (para o próximo quadro)
}

// 1ª função do gameloop
function handlerEvents() {
    if (ESTADO == 'E') {
        handlerEventsPerson(k_cima, k_baixo, k_esquerda, k_direita);
    }
}

// 2ª função do gameloop
function update(deltaTime) {
    if (ESTADO == 'E') {
        update_personagem(deltaTime);
        update_inimigo(deltaTime);
        update_bolinha(deltaTime);
        testeColisoes(deltaTime);
    } else if (ESTADO == 'G') {
        ESTADO = 'R';
    }
}

// 3ª função do gameloop
function render() {
    if (ESTADO == 'S') { // se o ESTADO atual for o SPLASH
        context.fillStyle = 'white';
        context.fillRect(0, 0, LARGURA_TELA, ALTURA_TELA); // desenha um fundo branco na tela
    } else if (ESTADO == 'R') { // se estiver no ESTADO REINICIANDO
        context.fillStyle = 'black';
        context.fillRect(0, 0, LARGURA_TELA, ALTURA_TELA); // desenha um fundo preto na tela
    } else { // ESTADO PAUSADO ou EXECUTANDO
        context.drawImage(bg, 0, 0); // desenha o fundo do jogo
        context.fillStyle = 'gray';
        context.fillRect(LIMITE_DIREITO, 0, 5, ALTURA_TELA); // desenha o limite do Personagem
        context.fillRect(LIMITE_ESQUERDO, 0, 5, ALTURA_TELA); // desenha o limite do Inimigo
        context.drawImage(person_atual, person_posX, person_posY);
        context.drawImage(inimigo_atual, inimigo_posX, inimigo_posY);
        context.drawImage(bolinha_atual, bolinha_posX, bolinha_posY);
        if(ESTADO == 'E'){ // se estiver no ESTADO EXECUTANDO

        }else{ // ESTADO PAUSADO
            context.fillStyle = 'rgba(0, 0, 0, 0.5)';
            context.fillRect(0, 0, LARGURA_TELA, ALTURA_TELA); // desenha um fundo preto transparente sobre a tela do jogo
        }
    }
}

function agendarTransicao(tempo, novo_ESTADO){ // agenda uma transição para o 'novo_ESTADO' após 'tempo'
    setTimeout(function(){ESTADO = novo_ESTADO}, tempo);
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
    if (person_posX <= LIMITE_DIREITO) {
        desmover_X_personagem(deltaTime);
    }

    // testa a colisão entre o inimigo e o canto superior da tela
    if (inimigo_posY + (inimigo_raio * 2) >= ALTURA_TELA) {
        desmover_Y_inimigo(deltaTime);
        inimigo_velY *= -1;
    }

    // testa a colisão entre o inimigo e o canto inferior da tela
    if (inimigo_posY <= 0) {
        desmover_Y_inimigo(deltaTime);
        inimigo_velY *= -1;
    }

    // colisão da bolinha com o lado direito do campo ------------------------------
    if (bolinha_posX + (bolinha_raio * 2) >= LARGURA_TELA) {
        bolinha_velX *= -1; // inverte a velocidde horizontal
        bolinha_posX = LARGURA_TELA - (bolinha_raio * 2); // reposiciona a bolinha no limite do lado direito
    }

    // colisão da bolinha com o lado esquerdo do campo ------------------------------
    if (bolinha_posX <= 0) {
        bolinha_velX *= -1; // inverte a velocidde horizontal
        bolinha_posX = 0; // reposiciona a bolinha no limite do lado esquerdo
    }

    // colisão da bolinha com o lado superior do campo ------------------------------
    if (bolinha_posY <= 0) {
        bolinha_velY *= -1; // inverte a velocidde vertical
        bolinha_posY = 0; // reposiciona a bolinha no limite do lado superior
    }

    // colisão da bolinha com o lado inferior do campo ------------------------------
    if (bolinha_posY + (bolinha_raio * 2) >= ALTURA_TELA) {
        bolinha_velY *= -1; // inverte a velocidde vertical
        bolinha_posY = ALTURA_TELA - (bolinha_raio * 2); // reposiciona a bolinha no limite do lado inferior
    }

    // colisão da bolinha com o personagem
    var ladoHorizontal = person_centroX - bolinha_centroX;
    var ladoVertical = person_centroY - bolinha_centroY;
    var hipotenusa = Math.sqrt((ladoHorizontal ** 2) + (ladoVertical ** 2));
    if (hipotenusa <= person_raio + bolinha_raio) {
        desmover_X_personagem(deltaTime);
        desmover_Y_personagem(deltaTime);
        var seno = ladoVertical / hipotenusa;
        var cosseno = ladoHorizontal / hipotenusa;
        bolinha_velX = (-bolinha_velBase) * cosseno;
        bolinha_velY = (-bolinha_velBase) * seno;
    }

    // colisão da bolinha com o inimigo
    ladoHorizontal = inimigo_centroX - bolinha_centroX;
    ladoVertical = inimigo_centroY - bolinha_centroY;
    hipotenusa = Math.sqrt((ladoHorizontal ** 2) + (ladoVertical ** 2));
    if (hipotenusa <= inimigo_raio + bolinha_raio) {
        desmover_X_inimigo(deltaTime);
        desmover_Y_inimigo(deltaTime);
        var seno = ladoVertical / hipotenusa;
        var cosseno = ladoHorizontal / hipotenusa;
        bolinha_velX = (-bolinha_velBase) * cosseno;
        bolinha_velY = (-bolinha_velBase) * seno;
    }
}

// função invocada quando uma tecla é pressionada
function keyPressed(e) {
    var code = e.keyCode;
    if (ESTADO == 'E') {
        switch (code) {
            case 37: k_esquerda = true; break; //Left key
            case 38: k_cima = true; break; //Up key
            case 39: k_direita = true; break; //Right key
            case 40: k_baixo = true; break; //Down key
        }
    } else if (ESTADO == 'P') {

    }
}

// função invocada quando uma tecla é solta
function keyReleased(e) {
    var code = e.keyCode;
    if (ESTADO == 'E') {
        switch (code) {
            case 37: k_esquerda = false; break; //Left key
            case 38: k_cima = false; break; //Up key
            case 39: k_direita = false; break; //Right key
            case 40: k_baixo = false; break; //Down key
        }
    }
}

setInterval(gameLoop, 17); // define as repetições do gameloop
