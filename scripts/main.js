import { createBoardElement } from "./modules/domHelpers.js"

function App(){

    let resetButton
    let displayPlayerX
    let displayPlayerO
    let boardMenuContainer
    let boardFieldsContainer
    let boardField
    let boardFieldsArray
    let currentPlayerOnBoard
    let currentPlayerClass = 'player-o'
    let playerX = []
    let playerO = []
    let winingCombinations = [

        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]

    ]

    function createBoard(){

        boardMenuContainer = createBoardElement(boardMenuContainer, document.body, 'board-menu-container')
        displayPlayerX = createBoardElement(displayPlayerX, boardMenuContainer, 'board-menu', 'fa-solid fa-xmark')
        resetButton = createBoardElement(resetButton, boardMenuContainer, 'board-menu', 'fa-solid fa-rotate-right')
        displayPlayerO = createBoardElement(displayPlayerO, boardMenuContainer, 'board-menu', 'fa-regular fa-circle')
        boardFieldsContainer = createBoardElement(boardFieldsContainer, document.body, 'board-fields-container')
        for(let i = 0; i < 9; i++){
            boardField = createBoardElement(boardField, boardFieldsContainer, 'board-field')
        }
    }

    function boardFieldEvent(e){
        
        let boardFieldIndex = boardFieldsArray.indexOf(e.target)

        currentPlayerClass = currentPlayerClass == 'player-x' ? 'player-o' : 'player-x'

        currentPlayerOnBoard = createBoardElement(currentPlayerOnBoard, boardFieldsArray[boardFieldIndex], currentPlayerClass)

        currentPlayerClass == 'player-x' ? playerX.push(boardFieldIndex) : playerO.push(boardFieldIndex)

        animateCurrentPlayer()
        animateShowPlayer()
        animateWonPlayer(playerX)
        animateWonPlayer(playerO)
        removeEventFromEmptyFields()
    }

    function resetButtonEvent(){

        resetButton.classList.add('anim-reset-button')
        resetButton.style.animationIterationCount = 'infinite'
        resetButton.style.color = 'var(--color4)'

        if(check(playerX).won || check(playerO).won){

            boardFieldsContainer.addEventListener('animationiteration', () => {

                boardFieldsArray.forEach((element) => {
                    if(element.hasChildNodes()){
                        element.firstChild.classList.remove('anim-won-player')
                    }
                })

                animateHidePlayer()
                setTimeout(() => { window.location.reload() }, animateHidePlayer())
            })
        }
        else{
           
            animateHidePlayer()
            setTimeout(() => { window.location.reload() }, animateHidePlayer())
        }
    }

    function check(player){

        if(player.length > 2){
            for(let i = 0; i < 8; i++){
                if(player.includes(winingCombinations[i][0]) && 
                    player.includes(winingCombinations[i][1]) &&
                    player.includes(winingCombinations[i][2])){
                        
                    return {
                        won: true,
                        combination: [winingCombinations[i][0], winingCombinations[i][1], winingCombinations[i][2]]
                    }
                }
            }
        }

        return {
            won: false
        }
    }

    function removeEventFromEmptyFields(){

        if(check(playerX).won || check(playerO).won){
            boardFieldsArray.forEach((element) => {
                if(element.hasChildNodes() == false){
                    element.removeEventListener('click', boardFieldEvent, {once: true})
                }
            })
        }
    }

    function animateCurrentPlayer(){
        
        let anime = 'anim-current-player'

        if(check(playerX).won || check(playerO).won){
            displayPlayerX.classList.remove(anime)
            displayPlayerO.classList.remove(anime)
        }
        else{
            if(currentPlayerClass == 'player-o'){
                displayPlayerX.classList.add(anime)
                displayPlayerO.classList.remove(anime)
            }
            else{
                displayPlayerO.classList.add(anime)
                displayPlayerX.classList.remove(anime)
            }
        }
    }

    function animateShowPlayer(){

        let anime = 'anim-show-player'
        currentPlayerOnBoard.classList.add(anime)
        currentPlayerOnBoard.addEventListener('animationend', (e) => { e.target.classList.remove(anime) })
    }

    function animateHidePlayer(){

        let i = 100

        boardFieldsArray.forEach((element) => {
                    
            if(element.hasChildNodes()){
                setTimeout(() => {
                    element.firstChild.classList.add('anim-hide-player')
                }, i)
                i = i + 300
            }
        })

        return i + 400
    }

    function animateWonPlayer(player){

        if(check(player).won){
            boardFieldsArray.forEach((element) => {
                if(element.hasChildNodes() && check(player).combination.includes(boardFieldsArray.indexOf(element))){
                    element.firstChild.classList.remove('anim-show-player')
                    element.firstChild.classList.add('anim-won-player')
                }
            })

            return true
        }
    }

    createBoard()

    resetButton.addEventListener('click', resetButtonEvent)
    resetButton.addEventListener('mouseover', () => { resetButton.classList.add('anim-reset-button') })
    resetButton.addEventListener('animationend', () => { resetButton.classList.remove('anim-reset-button') })

    boardFieldsArray = [...document.querySelectorAll('.board-field')]
    boardFieldsArray.forEach((element) => element.addEventListener('click', boardFieldEvent, {once: true}))
}

App()