class SceneManager{
    constructor(){
        this.STATES = new Map();
        this.actualScene={};
    }

    getActualScene(){
        return this.actualScene;
    }

    setActualScene(scene){
        this.actualScene = scene;
    }
}

export default SceneManager;