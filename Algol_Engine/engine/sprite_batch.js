import Sprite from './sprites/sprite.js';
import Resources from './resources.js';

class SpriteBatch{
    constructor(){
        this.spritesQueue = []; // pilha de sprites renderizaveis
        this.resouces=Resources.getInstance();
    }

    render(){
        // renderiza todos os sprites no imageBuffer
        this.spritesQueue.forEach(sprite => {
            sprite.render(this.resouces.offCtx);
        });
        // renderiza o imageBuffer na tela
        this.resouces.ctx.drawImage(this.resouces.offscreen,0,0);
    }

    putSprite(sprite){
        this.spritesQueue.push(sprite);
    }
}

export default SpriteBatch;