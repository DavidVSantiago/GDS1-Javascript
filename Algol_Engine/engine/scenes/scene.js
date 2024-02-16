class Scene{
    constructor(){
        this.STATES = new Map();
        this.actualState={};
    }

    /** Registra um novo Estado e o seu spriteBatch associado */
    registerState(stateName,spriteBatch){
        this.STATES.set(stateName,spriteBatch);
        if(this.STATES.size==1) this.changeState(stateName); // se for o primeiro Estado registrado, o configura como atual
    }

    /** Altera o State atual*/
    changeState(stateName){
        this.actualState = {
            name:stateName,
            batch:this.STATES.get(stateName)
        };
    }

    /** Retorna o nome do Estado */
    getStateName(){
        return this.actualState.name;
    }

    render(){
        // renderiza o srpitebatch do stado atual
        this.actualState.batch.render();
    }
}

export default Scene;