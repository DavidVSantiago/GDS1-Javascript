import {Engine} from './engine/engine.js';
import GamePlay from './cenas/game_play.js';

window.addEventListener('load',()=>{
    window.game = new Game();
});

class Game extends Engine{
    constructor(){
        super(1000,435);// Obrigatorio. inicializa o jogo especificando as dimensões

        // cria e registra as cenas
        let gamePlay =new GamePlay('GAME_PLAY');
        this.registerScene(gamePlay);

        this.start(); // inicia o gameloop  
    }
}