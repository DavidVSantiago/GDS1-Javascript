var inimigo_atual;
var inimigo_raio = 50;
var inimigo_velBase = 3;
var inimigo_velX = 0;
var inimigo_velY = inimigo_velBase;
var inimigo_posX = LARGURA_TELA * ( 1.0 / 8.0 ) - inimigo_raio;
var inimigo_posY = (ALTURA_TELA / 2) - inimigo_raio;
var inimigo_centroX = inimigo_posX + inimigo_raio;
var inimigo_centroY = inimigo_posY + inimigo_raio;

function carregarSpritesInimigo(sprite){
	cortarImagem(300,100,100,100,sprite).then((valor) => {inimigo_atual = valor;});
}

function update_inimigo(deltaTime){
	mover_inimigo(deltaTime);
	inimigo_centroX = inimigo_posX + inimigo_raio;
	inimigo_centroY = inimigo_posY + inimigo_raio;
}

function mover_inimigo(deltaTime){
	inimigo_posX += (inimigo_velX*deltaTime);
	inimigo_posY += (inimigo_velY*deltaTime);
}

function desmover_X_inimigo(deltaTime){
	inimigo_posX -= (inimigo_velX*deltaTime);
}

function desmover_Y_inimigo(deltaTime){
	inimigo_posY -= (inimigo_velY*deltaTime);
}