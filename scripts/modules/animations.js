export const animate = {

    showPlayer(player){

        player.current.field.classList.add('show-player')
        player.current.field.addEventListener('animationend', (e) => { e.target.classList.remove('show-player') })
    },
    
    wonPlayer(player, fieldsArray){
        
        if(player.winner.combination.length){
            for(let i = 0; i < 3; i++){
                fieldsArray[player.winner.combination[i]].firstChild.classList.remove('show-player')
                fieldsArray[player.winner.combination[i]].firstChild.classList.add('won-player')
            }
        }
    },
    
    currentPlayer(player){
    
        if(player.winner.combination.length){
            player.x.display.classList.remove('current-player')
            player.o.display.classList.remove('current-player')
        }
        else{
            if(player.current.class == player.o.class){
                player.x.display.classList.add('current-player')
                player.o.display.classList.remove('current-player')
            }
            else{
                player.o.display.classList.add('current-player')
                player.x.display.classList.remove('current-player')
            }
        }
    },
    
    hidePlayer(fieldsArray){
    
        let i = 100
        fieldsArray.forEach((element) => {
                    
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
