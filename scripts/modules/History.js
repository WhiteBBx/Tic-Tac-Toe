import { createDivElement } from "./Utils.js"

export class History{

    getFromLocal(){

        this.history = JSON.parse(localStorage.getItem('History'))
    }

    drawHistory(){

        this.historyIconArr = []
        this.historyContainer = createDivElement(this.historyContainer, document.body, 'history-container')
        for(let i = 0; i < this.history.length; i++){

            this.history[i].winner.is == 'player-o' ? this.icon = 'radio_button_unchecked' : this.icon = 'close'
            this.historyIcon = createDivElement(this.historyIcon, this.historyContainer, 'icon', this.icon)
            this.historyIconArr.push(this.historyIcon)
        }
    }

    addEvent = (e) => {

        console.log(this.historyIconArr.indexOf(e.target))
    }

    checkEvent(){

        this.historyContainer.addEventListener('click', this.addEvent)
    }

    render(){
        
        this.getFromLocal()
        if(this.history){
            this.drawHistory()
            this.checkEvent()
        }
    }
}

