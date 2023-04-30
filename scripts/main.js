import { createBoardElement } from "./modules/domHelpers.js"

function App(){

    this.resetButton
    this.displayPlayerX
    this.displayPlayerO
    this.boardMenuContainer
    this.boardFieldsContainer
    this.boardField
    this.boardFieldsArray
    this.currentPlayerOnBoard
    this.currentPlayerClass = 'player-o'
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

    this.createBoard = function(){

        this.boardMenuContainer = createBoardElement(this.boardMenuContainer, document.body, 'board-menu-container')
        this.displayPlayerX = createBoardElement(this.displayPlayerX, this.boardMenuContainer, 'board-menu', 'fa-solid fa-xmark')
        this.resetButton = createBoardElement(this.resetButton, this.boardMenuContainer, 'board-menu', 'fa-solid fa-rotate-right')
        this.displayPlayerO = createBoardElement(this.displayPlayerO, this.boardMenuContainer, 'board-menu', 'fa-regular fa-circle')
        this.boardFieldsContainer = createBoardElement(this.boardFieldsContainer, document.body, 'board-fields-container')
        for(let i = 0; i < 9; i++){
            this.boardField = createBoardElement(this.boardField, this.boardFieldsContainer, 'board-field')
        }
    }

    this.boardFieldEvent = function(e){
        
        console.log(this.boardFieldsArray)

        this.boardFieldIndex = this.boardFieldsArray.indexOf(e.target)
        this.currentPlayerClass = this.currentPlayerClass == 'player-x' ? 'player-o' : 'player-x'
        this.currentPlayerOnBoard = createBoardElement(this.currentPlayerOnBoard, this.boardFieldsArray[boardFieldIndex], this.currentPlayerClass)
        this.currentPlayerClass == 'player-x' ? this.playerX.push(boardFieldIndex) : this.playerO.push(boardFieldIndex)

        this.animateCurrentPlayer()
        this.animateShowPlayer()
        this.animateWonPlayer(this.playerX)
        this.animateWonPlayer(this.playerO)
        this.removeEventFromEmptyFields()
    }

    this.resetButtonEvent = function(){

        this.resetButton.classList.add('anim-reset-button')
        this.resetButton.style.animationIterationCount = 'infinite'
        this.resetButton.style.color = 'var(--color4)'

        if(check(this.playerX).won || check(this.playerO).won){

            this.boardFieldsContainer.addEventListener('animationiteration', () => {

                this.boardFieldsArray.forEach((element) => {
                    if(element.hasChildNodes()){
                        element.firstChild.classList.remove('anim-won-player')
                    }
                })

                this.animateHidePlayer()
                setTimeout(() => { window.location.reload() }, this.animateHidePlayer())
            })
        }
        else{
           
            this.animateHidePlayer()
            setTimeout(() => { window.location.reload() }, this.animateHidePlayer())
        }
    }

    this.check = function(player){

        if(player.length > 2){
            for(let i = 0; i < 8; i++){
                if(player.includes(this.winingCombinations[i][0]) && 
                    player.includes(this.winingCombinations[i][1]) &&
                    player.includes(this.winingCombinations[i][2])){
                        
                    return {
                        won: true,
                        combination: [this.winingCombinations[i][0], this.winingCombinations[i][1], this.winingCombinations[i][2]]
                    }
                }
            }
        }

        return {
            won: false
        }
    }

    this.removeEventFromEmptyFields = function(){

        if(this.check(this.playerX).won || this.check(this.playerO).won){
            this.boardFieldsArray.forEach((element) => {
                if(element.hasChildNodes() == false){
                    element.removeEventListener('click', this.boardFieldEvent, {once: true})
                }
            })
        }
    }

    this.animateCurrentPlayer = function(){
        
        let anime = 'anim-current-player'

        if(this.check(this.playerX).won || this.check(this.playerO).won){
            this.displayPlayerX.classList.remove(anime)
            this.displayPlayerO.classList.remove(anime)
        }
        else{
            if(this.currentPlayerClass == 'player-o'){
                this.displayPlayerX.classList.add(anime)
                this.displayPlayerO.classList.remove(anime)
            }
            else{
                this.displayPlayerO.classList.add(anime)
                this.displayPlayerX.classList.remove(anime)
            }
        }
    }

    this.animateShowPlayer = function(){

        let anime = 'anim-show-player'
        this.currentPlayerOnBoard.classList.add(anime)
        this.currentPlayerOnBoard.addEventListener('animationend', (e) => { e.target.classList.remove(anime) })
    }

    this.animateHidePlayer = function(){

        let i = 100

        this.boardFieldsArray.forEach((element) => {
                    
            if(element.hasChildNodes()){
                setTimeout(() => {
                    element.firstChild.classList.add('anim-hide-player')
                }, i)
                i = i + 300
            }
        })

        return i + 400
    }

    this.animateWonPlayer = function(player){

        if(check(player).won){
            this.boardFieldsArray.forEach((element) => {
                if(element.hasChildNodes() && check(player).combination.includes(this.boardFieldsArray.indexOf(element))){
                    element.firstChild.classList.remove('anim-show-player')
                    element.firstChild.classList.add('anim-won-player')
                }
            })

            return true
        }
    }

    this.render = function(){

        this.createBoard()

        this.resetButton.addEventListener('click', this.resetButtonEvent)
        this.resetButton.addEventListener('mouseover', () => { this.resetButton.classList.add('anim-reset-button') })
        this.resetButton.addEventListener('animationend', () => { this.resetButton.classList.remove('anim-reset-button') })

        this.boardFieldsArray = [...document.querySelectorAll('.board-field')]
        this.boardFieldsArray.forEach((element) => element.addEventListener('click', this.boardFieldEvent, {once: true}))
    }
}

const app = new App()

app.render()