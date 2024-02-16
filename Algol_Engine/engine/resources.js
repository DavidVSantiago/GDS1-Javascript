class Resources{
static singleton;

static getInstance(){
    if(!this.singleton){
        this.singleton = new this();
    }
    return this.singleton;
}

init(width,height){
    this.canvas = document.createElement('canvas');
    this.canvas.width=width;
    this.canvas.height=height;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.offscreen = new OffscreenCanvas(width,height);
    this.offCtx = this.offscreen.getContext("2d");
}

}
export default Resources;