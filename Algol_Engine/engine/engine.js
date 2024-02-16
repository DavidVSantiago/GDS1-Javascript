import StaticSprite from './sprites/static_sprite.js';
import SpriteBatch from './sprite_batch.js';
import Scene from './scenes/scene.js';
import SceneManager from './scenes/scene_manager.js';
import Resources from './resources.js';
class Engine{
    constructor(width,height){
        let resources = Resources.getInstance();
        resources.init(width,height);
        

        // atributos da Engine
        this.vk_up=false,this.vk_down=false,this.vk_left=false,this.vk_right=false,this.vk_esc=false;
        this.sceneManager = new SceneManager();

        // registra os eventos de pressionamento e soltura das teclas
        window.addEventListener('keydown', this.keyPressed, false);
        window.addEventListener('keyup', this.keyReleased, false);
    }

    /*****************************************************************************/
    /* MÉTODOS DO GAMELOOP */
    /*****************************************************************************/

    handleEvents(){
        //console.log('handleEvents - ENGINE');
        if(this.vk_up) console.log('Tecla cima');
        if(this.vk_down) console.log('Tecla baixo');
        if(this.vk_left) console.log('Tecla esquerda');
        if(this.vk_right) console.log('Tecla direita');
        if(this.vk_esc) console.log('Tecla esc');
    }
    
    update(){
        //console.log('update - ENGINE');
    }

    render(){
        //console.log('render - ENGINE');
        this.sceneManager.getActualScene().render();
    }
    gameloop=()=>{
        this.handleEvents();
        this.update();
        this.render();
        requestAnimationFrame(this.gameloop);
    }

    /*****************************************************************************/
    /* MÉTODOS DE EVENTOS */
    /*****************************************************************************/
    keyPressed=(e)=>{
        switch (e.keyCode) {
            case 37: this.vk_left = true; break; // Left key
            case 38: this.vk_up = true; break; // Up key
            case 39: this.vk_right = true; break; // Right key
            case 40: this.vk_down = true; break; // Down key
            case 27: this.vk_esc = true; break; // Esc key
        }
    }
    keyReleased=(e)=>{
        switch (e.keyCode) {
            case 37: this.vk_left = false; break; // Left key
            case 38: this.vk_up = false; break; // Up key
            case 39: this.vk_right = false; break; // Right key
            case 40: this.vk_down = false; break; // Down key
            case 27: this.vk_esc = false; break; // Esc key
        }
    }
}

export {Engine,StaticSprite,SpriteBatch,Scene,SceneManager};