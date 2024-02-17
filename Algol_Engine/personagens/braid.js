import {SimpleSprite} from '../engine/engine.js';

class Braid extends SimpleSprite{
    constructor(name){
        super(name);
        // registra um novo estado denominado 'PLAY'
        this.registerState('PLAY');

        // cria os sprites dessa cena
        this.chao = new SimpleSprite('assets/imgs/bg.png');
        this.braid = new SimpleSprite('assets/imgs/braid-died.png');
        
        // coloca os sprites no spritebatch do estado 'PLAY'
        this.putSprite(this.chao,'PLAY');
        this.putSprite(this.braid,'PLAY');
    }
}
export default GamePlay;