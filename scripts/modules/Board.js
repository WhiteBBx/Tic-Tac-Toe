import { createDivElement } from "./Utils.js"
import { Animate } from "./Animations.js"
import { LightMode } from "./LightMode.js"
import { Menu } from "./Menu.js"

export class Board {

    constructor(player){

        this.mode = new LightMode()
        this.menu = new Menu()
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

        this.menu.player = this.player
        this.menu.animate = this.animate
        this.animate.player = this.player

        this.winingCombinations = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]
    }

    drawBoard(){

        this.fieldsContainer = createDivElement(this.fieldsContainer, document.body, 'fields-container')
        for(let i = 0; i < 9; i++){ this.boardField = createDivElement(this.boardField, this.fieldsContainer, 'board-field') }
    }

    checkBoardEvents(){

        this.fieldsArray = [...document.querySelectorAll('.board-field')]
        this.fieldsContainer.addEventListener('click', this.drawPlayer)

        this.animate.fieldsArray = this.fieldsArray
        this.menu.fieldsArray = this.fieldsArray
        this.menu.fieldsContainer = this.fieldsContainer
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
                            this.player.winner.is = this.player.current.class
                            this.removeBoardEvents()
                    }
                }
            }
            player = this.player.o.pos
        }
    }

    drawPlayer = (e) =>{

        if(!e.target.hasChildNodes()){

            this.fieldIndex = this.fieldsArray.indexOf(e.target)
            this.player.current.field = createDivElement(this.player.current.field, this.fieldsArray[this.fieldIndex], this.player.current.class)
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
        this.checkBoardEvents()
    }
}