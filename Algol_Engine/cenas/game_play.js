import {SimpleScene,SimpleSprite} from '../engine/engine.js';

class GamePlay extends SimpleScene{
    constructor(name){
        super(name);

        // define os ESTADOS e seus indices
        this.STATE_PLAY=0; // devem começar com zero!!
        this.STATE_PAUSE=1;

        // registra os ESTADOS
        this.registerState(this.STATE_PLAY);
        this.registerState(this.STATE_PAUSEs);

        // cria os sprites dessa cena
        this.chao = new SimpleSprite('assets/imgs/fundo.png');
        this.braid = new SimpleSprite('assets/imgs/braid-died.png');
        
        // coloca cada sprite nos batchs dos seus respectivos STATES
        this.putSprite(this.chao,this.STATE_PLAY);
        this.putSprite(this.braid,this.STATE_PAUSE);
    }

    // Sobrescreve para especificar como as teclas serão tratadas nessa cena
    handleEvents(){
        if(this.res.vk_up) this.changeState(this.STATE_PAUSE);
        if(this.res.vk_down)this.changeState(this.STATE_PLAY);
    }
}
export default GamePlay;