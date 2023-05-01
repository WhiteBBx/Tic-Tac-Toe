import { createDivElement } from "./utils.js"
import { animate } from "./animations.js"

export class Game{

    constructor(){

        this.won = {

            combination: [],
            player: undefined
        }
        this.currentPlayerClass = 'player-o'
        this.boardFieldsArray
        this.boardFieldIndex
        this.playerX = []
        this.playerO = []
        this.winingCombinations = [

            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
    
        ]
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
    }

    addResetEvent(){

        this.resetButton.classList.add('reset-button')
        this.resetButton.style.animationIterationCount = 'infinite'
        this.resetButton.style.color = 'var(--color4)'

        if(this.won.combination.length){
            this.boardFieldsContainer.addEventListener('animationiteration', () => {
                this.boardFieldsArray.forEach((element) => {
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

        this.boardFieldsArray = [...document.querySelectorAll('.board-field')]
        this.boardFieldsArray.forEach((element) => element.addEventListener('click', (event) => this.drawPlayer(event), {once: true}))
    }

    removeBoardEvents(){

        this.boardFieldsArray.forEach((element) => {
            if(element.hasChildNodes() == false){
                element.replaceWith(element.cloneNode(true))
                // Can't remove event by =>
                // element.removeEventListener('click', this.drawPlayer, {once: true})
            }
        })
    }

    checkPlayer(){

        let player = this.playerX
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
            player = this.playerO
        }
    }

    drawPlayer(event){

        this.boardFieldIndex = this.boardFieldsArray.indexOf(event.target)
        this.currentPlayerClass = this.currentPlayerClass == 'player-x' ? 'player-o' : 'player-x'
        this.currentPlayerOnBoard = createDivElement(this.currentPlayerOnBoard, this.boardFieldsArray[this.boardFieldIndex], this.currentPlayerClass)
        this.currentPlayerClass == 'player-x' ? this.playerX.push(this.boardFieldIndex) : this.playerO.push(this.boardFieldIndex)

        this.checkPlayer()
        animate.showPlayer()
        animate.wonPlayer()
        animate.currentPlayer()
    }

    render(){

        this.drawBoard()
        this.addBoardEvents()
        this.checkResetEvents()
    }
}

export const game = new Game()