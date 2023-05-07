import { createDivElement } from "./Utils.js"

export class Menu {

    drawMenu(){

        this.menuContainer = createDivElement(this.menuContainer, document.body, 'menu-container')
        this.player.x.icon = createDivElement(this.player.x.icon, this.menuContainer, 'icon', 'close')
        this.resetButton = createDivElement(this.resetButton, this.menuContainer, 'icon', 'rotate_right')
        this.player.o.icon = createDivElement(this.player.o.icon, this.menuContainer, 'icon', 'radio_button_unchecked')
    }

    addResetEvent = () =>{

        this.resetButton.style.animation = 'reset-button 0.5s linear infinite'
        this.resetButton.classList.add('reset-button')
        this.resetButton.classList.add('active')
    }

    checkResetEvents(){

        this.resetButton.addEventListener('mouseover', () => { this.resetButton.classList.add('reset-button') })
        this.resetButton.addEventListener('animationend', () => { this.resetButton.classList.remove('reset-button') })
    }

    animateIcons(){

        if(this.player.winner.combination.length){
            this.player.x.icon.classList.remove('current-player')
            this.player.o.icon.classList.remove('current-player')
        }
        else{
            this.player.current.class == this.player.o.class ? this.player.o.icon.classList.add('current-player') : this.player.x.icon.classList.add('current-player')
            this.player.current.class == this.player.o.class ? this.player.x.icon.classList.remove('current-player') : this.player.o.icon.classList.remove('current-player')
        }
    }

    render(){

        this.drawMenu()
        this.checkResetEvents()
        this.player.current.class == this.player.o.class ? this.player.o.icon.classList.add('current-player') : this.player.x.icon.classList.add('current-player')
    }
}