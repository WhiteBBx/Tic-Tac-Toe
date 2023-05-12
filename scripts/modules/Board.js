import { createDivElement } from "./Utils.js"
import { Animate } from "./Animations.js"
import { LightMode } from "./LightMode.js"
import { Menu } from "./Menu.js"
import { History } from "./History.js"

export class Board {

    constructor(player){

        this.mode = new LightMode()
        this.menu = new Menu()
        this.history = new History()
        this.animate = new Animate()

        this.player = { 
            x: {
                pos: [],
                class: 'player-x',
            }, 
            o: {
                pos: [],
                class: 'player-o',
            },
            current: {
                class: player == 'x' ? 'player-x' : 'player-o',
                field: null
            },
            winner: {
                is: null,
                combination: []
            }
        }

        this.historyArr = []
        this.history.player = this.player
        this.history.animate = this.animate
        this.menu.player = this.player
        this.menu.animate = this.animate
        this.animate.player = this.player

        this.winingCombinations = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]
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

    drawBoard(){

        this.fieldsContainer = createDivElement('after',this.fieldsContainer, document.body, 'fields-container')
        for(let i = 0; i < 9; i++) this.boardField = createDivElement('after',this.boardField, this.fieldsContainer, 'board-field')
    }

    checkBoardEvents(){

        this.fieldsArray = [...document.querySelectorAll('.board-field')]
        this.fieldsContainer.addEventListener('click', this.drawPlayer)

        this.history.fieldsArray = this.fieldsArray
        this.menu.fieldsArray = this.fieldsArray
        this.animate.fieldsArray = this.fieldsArray
        this.menu.fieldsContainer = this.fieldsContainer
        this.history.fieldsContainer = this.fieldsContainer
    }

    removeBoardEvents(){

        this.fieldsContainer.removeEventListener('click', this.drawPlayer)
    }

    checkPlayer(){

        let player = this.player.x.pos
        for(let i = 0; i < 2; i++){

            if(player.length > 2){
                for(let i = 0; i < 8; i++){
                    if(player.includes(this.winingCombinations[i][0]) && 
                        player.includes(this.winingCombinations[i][1]) &&
                        player.includes(this.winingCombinations[i][2])){

                            this.player.winner.combination = [this.winingCombinations[i][0], this.winingCombinations[i][1], this.winingCombinations[i][2]]
                            this.player.current.class == this.player.x.class ? this.player.winner.is = this.player.o.class : this.player.winner.is = this.player.x.class
                            this.removeBoardEvents()
                            this.writeHistory()
                            this.history.drawItem()
                    }
                }
            }
            player = this.player.o.pos
        }
    }

    drawPlayer = (e) =>{

        if(!e.target.hasChildNodes()){

            this.fieldIndex = this.fieldsArray.indexOf(e.target)
            this.player.current.field = createDivElement('after',this.player.current.field, this.fieldsArray[this.fieldIndex], this.player.current.class)
            this.player.current.class == this.player.x.class ? this.player.x.pos.push(this.fieldIndex) : this.player.o.pos.push(this.fieldIndex)
            this.player.current.class = this.player.current.class == this.player.x.class ? this.player.o.class : this.player.x.class

            this.checkPlayer()
            this.animate.currentPlayer()
            this.animate.showPlayer()
            this.animate.wonPlayer()
        }
    }

    render(){
        
        this.mode.render()
        this.menu.render()
        this.drawBoard()
        this.history.render()
        this.checkBoardEvents()
    }
}