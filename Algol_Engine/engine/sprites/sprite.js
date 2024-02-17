import Resources from '../resources.js';

class Sprite{
    constructor(fileSource){
        this.posX=0.0,this.posY=0.0;
        this.speedX=0.0,this.speedY=0.0;
        this.loaded=false;
        this.frames=new Image();
        this.frames.src = fileSource;
        this.frames.onload=()=>{
            this.loaded=true;
        }
    }
    render(ctx){
        ctx.drawImage(this.getFrame(),Math.floor(this.posX),Math.floor(this.posY));
    }

    getFrame(){return this.frames;}
    getPosX(){return this.posX;}
    getPosY(){return this.posY;}
}

export default Sprite;