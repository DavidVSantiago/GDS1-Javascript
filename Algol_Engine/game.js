import {Engine,SpriteBatch,StaticSprite,Scene}  from './engine/engine.js';

window.addEventListener('load',()=>{
    window.game = new Game();
    requestAnimationFrame(window.game.gameloop);// inicia o gameloop
});

class Game extends Engine{
    constructor(){
        super(640,480); // define as dimensões da tela
        
        // Cria as Scenes do jogo
        this.faseJogo = new Scene();
        // Cria um spriteBatch para a scene
        this.batch = new SpriteBatch();
        // criar os sprites desse spritebatch
        this.bg = new StaticSprite('assets/imgs/bg.png');
        this.braid = new StaticSprite('assets/imgs/braid-died.png');
        // coloca os sprites no spritebatch
        this.batch.putSprite(this.bg);
        this.batch.putSprite(this.braid);
        // registra o spritebatch na cena e o estado
        this.faseJogo.registerState('PLAY',this.batch);
        
        this.sceneManager.setActualScene(this.faseJogo);
    }
    
    handleEvents(){
        super.handleEvents(); //OBRIGATÓRIO!
    }
    
    update(){
        super.update(); //OBRIGATÓRIO!
    }

    render(){
        super.render(); //OBRIGATÓRIO!
    }
}