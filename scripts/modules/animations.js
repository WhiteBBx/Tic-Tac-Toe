import { game } from "./board.js";

export class Animate{

    showPlayer(){

        game.currentPlayerOnBoard.classList.add('show-player')
        game.currentPlayerOnBoard.addEventListener('animationend', (e) => { e.target.classList.remove('show-player') })
    }

    wonPlayer(){
        
        if(game.won.combination.length){
            for(let i = 0; i < 3; i++){
                game.boardFieldsArray[game.won.combination[i]].firstChild.classList.remove('show-player')
                game.boardFieldsArray[game.won.combination[i]].firstChild.classList.add('won-player')
            }
        }
    }

    currentPlayer(){

        if(game.won.combination.length){
            game.displayPlayerX.classList.remove('current-player')
            game.displayPlayerO.classList.remove('current-player')
        }
        else{
            if(game.currentPlayerClass == 'player-o'){
                game.displayPlayerX.classList.add('current-player')
                game.displayPlayerO.classList.remove('current-player')
            }
            else{
                game.displayPlayerO.classList.add('current-player')
                game.displayPlayerX.classList.remove('current-player')
            }
        }
    }

    hidePlayer(){

        let i = 100
        game.boardFieldsArray.forEach((element) => {
                    
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