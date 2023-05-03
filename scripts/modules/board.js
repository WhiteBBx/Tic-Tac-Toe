import { createDivElement } from "./utils.js"
import { animate } from "./animations.js"

export class Board {

    constructor(player){
        this.player = { 
            x: {
                pos: [],
                class: 'player-x',
                display: undefined,
            }, 
            o: {
                pos: [],
                class: 'player-o',
                display: undefined,
            },
            current: {
                class: player == 'x' ? 'player-x' : 'player-o',
                field: undefined
            },
            winner: {
                is: undefined,
                combination: []
            }
        }
        this.winingCombinations = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]
    }

    drawBoard(){

        this.menuContainer = createDivElement(this.menuContainer, document.body, 'board-menu-container')
        this.player.x.display = createDivElement(this.player.x.display, this.menuContainer, 'board-menu', 'fa-solid fa-xmark')
        this.resetButton = createDivElement(this.resetButton, this.menuContainer, 'board-menu', 'fa-solid fa-rotate-right')
        this.player.o.display = createDivElement(this.player.o.display, this.menuContainer, 'board-menu', 'fa-regular fa-circle')
        this.fieldsContainer = createDivElement(this.fieldsContainer, document.body, 'board-fields-container')
        for(let i = 0; i < 9; i++){
            this.boardField = createDivElement(this.boardField, this.fieldsContainer, 'board-field')
        }

        this.player.current.class == this.player.x.class ? this.player.x.display.classList.add('current-player') : this.player.o.display.classList.add('current-player')
    }

    addResetEvent(){

        this.resetButton.classList.add('reset-button')
        this.resetButton.style.animationIterationCount = 'infinite'
        this.resetButton.style.color = 'var(--color4)'

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
    }

    checkResetEvents(){

        this.resetButton.addEventListener('click', (event) => this.addResetEvent(event))
        this.resetButton.addEventListener('mouseover', () => { this.resetButton.classList.add('reset-button') })
        this.resetButton.addEventListener('animationend', () => { this.resetButton.classList.remove('reset-button') })
    }

    addBoardEvents(){

        this.fieldsArray = [...document.querySelectorAll('.board-field')]
        this.fieldsArray.forEach((element) => element.addEventListener('click', (event) => this.drawPlayer(event), {once: true}))
    }

    removeBoardEvents(){

        this.fieldsArray.forEach((element) => {
            if(element.hasChildNodes() == false){
                element.replaceWith(element.cloneNode(true))
                // Can't remove event by =>
                // element.removeEventListener('click', this.drawPlayer, {once: true})
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

    drawPlayer(event){

        this.fieldIndex = this.fieldsArray.indexOf(event.target)
        this.player.current.field = createDivElement(this.player.current.field, this.fieldsArray[this.fieldIndex], this.player.current.class)
        this.player.current.class == this.player.x.class ? this.player.x.pos.push(this.fieldIndex) : this.player.o.pos.push(this.fieldIndex)
        this.player.current.class = this.player.current.class == this.player.x.class ? this.player.o.class : this.player.x.class

        this.checkPlayer()
        animate.showPlayer(this.player)
        animate.currentPlayer(this.player)
        animate.wonPlayer(this.player, this.fieldsArray)
    }

    render(){

        this.drawBoard()
        this.addBoardEvents()
        this.checkResetEvents()
    }
}