class SceneManager{
    constructor(){
        this.scenesList=[];
        this.actualScene;
    }

    registerScene(scene){
        this.scenesList.push(scene);
        // se a cena for a primeira a ser registrada, ela será a atual
        if(this.scenesList.length==1) this.actualScene=scene;
    }
    
    getActualScene(){
        return this.actualScene;
    }

    setActualScene(sceneName){
        for(let i=0;i<this.scenesList.length;i++){
            if(this.scenesList[i].name==sceneName) this.actualScene=startScene;
        }
    }
}
export default SceneManager;