import { board } from "./board.js";

export class Animate{
    
    showPlayer(){

        board.player.current.field.classList.add('show-player')
        board.player.current.field.addEventListener('animationend', (e) => { e.target.classList.remove('show-player') })
    }

    wonPlayer(){
        
        if(board.player.winner.combination.length){
            for(let i = 0; i < 3; i++){
                board.fieldsArray[board.player.winner.combination[i]].firstChild.classList.remove('show-player')
                board.fieldsArray[board.player.winner.combination[i]].firstChild.classList.add('won-player')
            }
        }
    }

    currentPlayer(){

        if(board.player.winner.combination.length){
            board.player.x.display.classList.remove('current-player')
            board.player.o.display.classList.remove('current-player')
        }
        else{
            if(board.currentPlayerClass == 'player-o'){
                board.player.x.display.classList.add('current-player')
                board.player.o.display.classList.remove('current-player')
            }
            else{
                board.player.o.display.classList.add('current-player')
                board.player.x.display.classList.remove('current-player')
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