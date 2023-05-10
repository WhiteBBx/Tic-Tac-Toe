import { createDivElement } from "./Utils.js"

export class History{

    getFromLocal(){

        this.history = localStorage.getItem('History')
        this.history = JSON.parse(this.history)
    }

    drawHistory(){

        this.historyContainer = createDivElement(this.historyContainer, document.body, 'history-container')
        this.history.winner.is == 'player-o' ? this.icon = 'radio_button_unchecked' : this.icon = 'close'
        this.historyIcon = createDivElement(this.historyIcon, this.historyContainer, 'icon', this.icon)
    }

    addEvent = () => {

        this.state = this.state == 'show' ? 'hidde' : 'show'

        if(this.state == 'show'){

            for(let i = 0; i < this.history.x.pos.length; i++){
                this.history.current.field = createDivElement(this.history.current.field, this.fieldsArray[this.history.x.pos[i]], this.history.x.class)
                this.history.current.field.classList.add('show-player')
            }
    
            for(let i = 0; i < this.history.o.pos.length; i++){
                this.history.current.field = createDivElement(this.history.current.field, this.fieldsArray[this.history.o.pos[i]], this.history.o.class)
                this.history.current.field.classList.add('show-player')
            }
        }
    }

    checkEvent(){

        this.historyIcon.addEventListener('click', this.addEvent)
    }

    render(){

        this.getFromLocal()
        this.drawHistory()
        this.checkEvent()
    }
}

