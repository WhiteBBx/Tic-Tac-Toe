import { board } from "./board.js";

export class Animate{
    
    showPlayer(){

        board.currentPlayerOnBoard.classList.add('show-player')
        board.currentPlayerOnBoard.addEventListener('animationend', (e) => { e.target.classList.remove('show-player') })
    }

    wonPlayer(){
        
        if(board.won.combination.length){
            for(let i = 0; i < 3; i++){
                board.fieldsArray[board.won.combination[i]].firstChild.classList.remove('show-player')
                board.fieldsArray[board.won.combination[i]].firstChild.classList.add('won-player')
            }
        }
    }

    currentPlayer(){

        if(board.won.combination.length){
            board.displayPlayerX.classList.remove('current-player')
            board.displayPlayerO.classList.remove('current-player')
        }
        else{
            if(board.currentPlayerClass == 'player-o'){
                board.displayPlayerX.classList.add('current-player')
                board.displayPlayerO.classList.remove('current-player')
            }
            else{
                board.displayPlayerO.classList.add('current-player')
                board.displayPlayerX.classList.remove('current-player')
            }
        }
    }

    hidePlayer(){

        let i = 100
        board.fieldsArray.forEach((element) => {
                    
            if(element.hasChildNodes()){
                setTimeout(() => {
                    element.firstChild.classList.add('hide-player')
                }, i)
                i = i + 300
            }
        })
        return i + 400
    }

}

export const animate = new Animate()