import { createDivElement } from "./Utils.js"

export class History{

    constructor(){

        this.historyIconArr = []
        this.historyArr = []
        this.currentItem
        this.previusItem 
        this.selected
    }

    writeHistory(){
        
        this.historyArr = JSON.parse(localStorage.getItem('History'))   
        if(this.player.winner.is){
            if(this.historyArr){
                if(this.historyArr.length >= 10){
                    this.historyArr.pop()
                    this.historyArr.unshift(this.player)
                }
                else this.historyArr.unshift(this.player)
            }
            else{
                this.historyArr = []
                this.historyArr.unshift(this.player)
            }
        }

        localStorage.setItem('History', JSON.stringify(this.historyArr))
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
            this.readHistory()
            this.player.winner.is == 'player-o' ? this.icon = 'radio_button_unchecked' : this.icon = 'close'
            this.historyIcon = createDivElement('before', this.historyIcon, this.historyContainer, 'icon', this.icon)
            this.historyIconArr.unshift(this.historyIcon)
        }
        else{
            this.history[i].winner.is == 'player-o' ? this.icon = 'radio_button_unchecked' : this.icon = 'close'
            this.historyIcon = createDivElement('after', this.historyIcon, this.historyContainer, 'icon', this.icon)
            this.historyIconArr.push(this.historyIcon)
        }

        if(this.historyIconArr.length >= 10){

            this.historyContainer.removeChild(this.historyContainer.lastChild)
            this.historyIconArr.pop()
        }
    }

    checkEvents(){

        this.historyContainer.addEventListener('click', this.addEvent)
    }

    addEvent = (e) => {

        if(e.target !== e.currentTarget){

            console.log(this.history)
            console.log(this.historyIconArr)
            
            this.previusItem = this.currentItem
            this.currentItem = this.historyIconArr.indexOf(e.target)

            if(this.currentItem != this.previusItem){

                this.historyIconArr.forEach((element) => { element.classList.remove('active') })
                this.historyIconArr[this.historyIconArr.indexOf(e.target)].classList.add('active')
    
                this.fieldsArray.forEach((element) => {
                    if(element.hasChildNodes()){
                        element.removeChild(element.firstChild)
                    }
                })
                
                for(let i = 0; i < this.history[this.historyIconArr.indexOf(e.target)].x.pos.length; i++){
        
                    this.player.current.field = createDivElement('after', this.player.current.field, this.fieldsArray[this.history[this.historyIconArr.indexOf(e.target)].x.pos[i]], this.player.x.class)
                    this.player.current.field.classList.add('show-player')
                }
        
                for(let i = 0; i < this.history[this.historyIconArr.indexOf(e.target)].o.pos.length; i++){
        
                    this.player.current.field = createDivElement('after', this.player.current.field, this.fieldsArray[this.history[this.historyIconArr.indexOf(e.target)].o.pos[i]], this.player.o.class)
                    this.player.current.field.classList.add('show-player')
                }
                    
                for(let i = 0; i < this.history[this.historyIconArr.indexOf(e.target)].winner.combination.length; i++){
                    
                    this.fieldsArray[this.history[this.historyIconArr.indexOf(e.target)].winner.combination[i]].firstChild.addEventListener('animationend', (a) => {
                        
                        this.fieldsArray[this.history[this.historyIconArr.indexOf(e.target)].winner.combination[i]].firstChild.classList.replace('show-player', 'won-player')
                    })
                }
            }
        }

        this.selected = this.history[this.historyIconArr.indexOf(e.target)]
    }

    render(){
        
        this.readHistory()
        this.drawContainer()
        if(this.history){
            this.drawHistory()
            this.checkEvents()
        }
    }
}

