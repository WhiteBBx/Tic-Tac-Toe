import { createDivElement } from "./Utils.js"

export class Menu {

    constructor(){

        this.icon = {
            x: null,
            o: null
        }
    }

    drawMenu(){

        this.menuContainer = createDivElement(this.menuContainer, document.body, 'menu-container')
        this.icon.x = createDivElement(this.icon.x, this.menuContainer, 'icon', 'close')
        this.resetButton = createDivElement(this.resetButton, this.menuContainer, 'icon', 'rotate_right')
        this.icon.o = createDivElement(this.icon.o, this.menuContainer, 'icon', 'radio_button_unchecked')
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

    render(){

        this.drawMenu()
    }
}