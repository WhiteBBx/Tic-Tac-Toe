import { createDivElement } from "./Utils.js"

export class History{

    constructor(){

        this.historyIconArr = []
    }

    readHistory(){

        this.history = JSON.parse(localStorage.getItem('History'))
    }

    drawContainer(){

        this.historyContainer = createDivElement('after', this.historyContainer, document.body, 'history-container')
    }

    drawHistory(){

        for(let i = 0; i < this.history.length; i++) this.drawItem(i)
    }

    drawItem(i){

        if(i === undefined){
            this.player.winner.is == 'player-o' ? this.icon = 'radio_button_unchecked' : this.icon = 'close'
            this.historyIcon = createDivElement('before', this.historyIcon, this.historyContainer, 'icon', this.icon)
        }
        else{
            this.history[i].winner.is == 'player-o' ? this.icon = 'radio_button_unchecked' : this.icon = 'close'
            this.historyIcon = createDivElement('after', this.historyIcon, this.historyContainer, 'icon', this.icon)
        }
        this.historyIconArr.push(this.historyIcon)
    }   

    render(){
        
        this.readHistory()
        this.drawContainer()
        if(this.history) this.drawHistory()
    }
}

