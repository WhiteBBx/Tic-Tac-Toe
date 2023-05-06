import { createDivElement } from "./Utils.js"
import { Animate } from "./Animations.js"
import { LightMode } from "./LightMode.js"
import { Menu } from "./Menu.js"

let mode = new LightMode()
let menu = new Menu()
let animate = new Animate()

export class Board {

    constructor(player){

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
        this.winingCombinations = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]
    }

    drawBoard(){

        mode.render()
        menu.render()
        this.fieldsContainer = createDivElement(this.fieldsContainer, document.body, 'fields-container')
        for(let i = 0; i < 9; i++){ this.boardField = createDivElement(this.boardField, this.fieldsContainer, 'board-field') }
    }

    checkResetEvent(){

        menu.resetButton.addEventListener('click', () => { 
            menu.addResetEvent()
            if(this.player.winner.combination.length){
                this.fieldsContainer.addEventListener('animationiteration', () => {
                    this.fieldsArray.forEach((element) => {
                        if(element.hasChildNodes()){
                            element.firstChild.classList.remove('won-player')
                        }
                    })
                    setTimeout(() => { window.location.reload() }, animate.hidePlayer(this.fieldsArray))
                })
            }
            else{
                setTimeout(() => { window.location.reload() }, animate.hidePlayer(this.fieldsArray))
            }
        })
    }

    checkBoardEvents(){

        this.fieldsArray = [...document.querySelectorAll('.board-field')]
        this.fieldsArray.forEach((element) => element.addEventListener('click', this.drawPlayer, {once: true}))
    }

    removeBoardEvents(){

        this.fieldsArray.forEach((element) => {
            if(element.hasChildNodes() == false){
                element.removeEventListener('click', this.drawPlayer, {once: true})
            }
        })
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

        this.fieldIndex = this.fieldsArray.indexOf(e.target)
        this.player.current.field = createDivElement(this.player.current.field, this.fieldsArray[this.fieldIndex], this.player.current.class)
        this.player.current.class == this.player.x.class ? this.player.x.pos.push(this.fieldIndex) : this.player.o.pos.push(this.fieldIndex)
        this.player.current.class = this.player.current.class == this.player.x.class ? this.player.o.class : this.player.x.class

        this.checkPlayer()
        animate.showPlayer(this.player)
        animate.wonPlayer(this.player, this.fieldsArray)
    }

    render(){
        
        this.drawBoard()
        this.checkResetEvent()
        this.checkBoardEvents()
    }
}