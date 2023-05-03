import { createDivElement } from "./utils.js"
import { animate } from "./animations.js"

export class Board{

    constructor(){

        this.player = { 
            x: [], 
            o: [] 
        }
        this.won = {
            combination: [],
            player: undefined
        }
        this.currentPlayerClass = 'player-x'
        this.winingCombinations = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]
    }

    drawBoard(){

        this.boardMenuContainer = createDivElement(this.boardMenuContainer, document.body, 'board-menu-container')
        this.displayPlayerX = createDivElement(this.displayPlayerX, this.boardMenuContainer, 'board-menu', 'fa-solid fa-xmark')
        this.resetButton = createDivElement(this.resetButton, this.boardMenuContainer, 'board-menu', 'fa-solid fa-rotate-right')
        this.displayPlayerO = createDivElement(this.displayPlayerO, this.boardMenuContainer, 'board-menu', 'fa-regular fa-circle')
        this.boardFieldsContainer = createDivElement(this.boardFieldsContainer, document.body, 'board-fields-container')
        for(let i = 0; i < 9; i++){
            this.boardField = createDivElement(this.boardField, this.boardFieldsContainer, 'board-field')
        }

        this.currentPlayerClass == 'player-x' ? this.displayPlayerX.classList.add('current-player') : this.displayPlayerO.classList.add('current-player')
    }

    addResetEvent(){

        this.resetButton.classList.add('reset-button')
        this.resetButton.style.animationIterationCount = 'infinite'
        this.resetButton.style.color = 'var(--color4)'

        if(this.won.combination.length){
            this.boardFieldsContainer.addEventListener('animationiteration', () => {
                this.fieldsArray.forEach((element) => {
                    if(element.hasChildNodes()){
                        element.firstChild.classList.remove('won-player')
                    }
                })

                animate.hidePlayer()
                setTimeout(() => { window.location.reload() }, animate.hidePlayer())
            })
        }
        else{
           
            animate.hidePlayer()
            setTimeout(() => { window.location.reload() }, animate.hidePlayer())
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

        let player = this.player.x
        for(let i = 0; i < 2; i++){

            if(player.length > 2){
                for(let i = 0; i < 8; i++){
                    if(player.includes(this.winingCombinations[i][0]) && 
                        player.includes(this.winingCombinations[i][1]) &&
                        player.includes(this.winingCombinations[i][2])){

                            this.won.combination = [this.winingCombinations[i][0], this.winingCombinations[i][1], this.winingCombinations[i][2]]
                            this.won.player = this.currentPlayerClass
                            this.removeBoardEvents()
                    }
                }
            }
            player = this.player.o
        }
    }

    drawPlayer(event){

        this.fieldIndex = this.fieldsArray.indexOf(event.target)
        this.currentPlayerOnBoard = createDivElement(this.currentPlayerOnBoard, this.fieldsArray[this.fieldIndex], this.currentPlayerClass)
        this.currentPlayerClass == 'player-x' ? this.player.x.push(this.fieldIndex) : this.player.o.push(this.fieldIndex)
        this.currentPlayerClass = this.currentPlayerClass == 'player-x' ? 'player-o' : 'player-x'

        this.checkPlayer()
        animate.showPlayer()
        animate.currentPlayer()
        animate.wonPlayer()
    }

    render(){

        this.drawBoard()
        this.addBoardEvents()
        this.checkResetEvents()
    }
}

export const board = new Board()