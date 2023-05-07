import { createDivElement } from "./Utils.js"

export class Animate {

    showPlayer(){

        this.player.current.field.classList.add('show-player')
        this.player.current.field.addEventListener('animationend', (e) => { e.target.classList.remove('show-player') })
    }
    
    wonPlayer(){
        
        if(this.player.winner.combination.length){
            for(let i = 0; i < 3; i++){
                this.fieldsArray[this.player.winner.combination[i]].firstChild.classList.remove('show-player')
                this.fieldsArray[this.player.winner.combination[i]].firstChild.classList.add('won-player')
            }
        }
    }
    
    hidePlayer(){
    
        let i = 100
        this.fieldsArray.forEach((element) => {
                    
            if(element.hasChildNodes()){
                setTimeout(() => {
                    element.firstChild.classList.add('hide-player')
                }, i)
                i = i + 300
            }
        })
        return i + 400
    }
}
