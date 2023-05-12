import { createDivElement, changeColor } from "./Utils.js"

export class LightMode {

    constructor(){

        if(localStorage.getItem('Mode') === undefined) this.current = 'dark'
        else this.current = localStorage.getItem('Mode')
    }

    readModeButtonColors(){

        this.current == 'light' ? changeColor(':root','--color1', '#e9e9e9') : changeColor(':root','--color1', '#1b1b1b')
        this.current == 'light' ? changeColor(':root','--color2', '#1b1b1b') : changeColor(':root','--color2', '#e9e9e9')
        this.current == 'light' ? this.modeButton.firstChild.textContent = 'light_mode' : this.modeButton.firstChild.textContent = 'dark_mode'
    }

    animateModeButton(){

        this.modeButton.classList.add('show-mode')
        this.modeButton.addEventListener('animationend', () => { this.modeButton.classList.remove('show-mode') })
    }

    drawModeButton(){

        this.modeContainer = createDivElement('after',this.modeContainer, document.body, 'mode-container')
        this.modeButton = createDivElement('after',this.modeButton, this.modeContainer, 'icon', 'dark_mode', 'out')
    }

    addModeButtonEvent(){

        document.body.style.transition = 'background 1s ease-in-out'
        this.current = this.current == 'light' ? 'dark' : 'light'
        localStorage.setItem('Mode', this.current)
        this.animateModeButton()
        this.readModeButtonColors()
    }

    checkModeButtonEvent(){

        this.modeButton.addEventListener('click', () => this.addModeButtonEvent() )
    }

    render(){

        this.drawModeButton()
        this.animateModeButton()
        this.readModeButtonColors()
        this.checkModeButtonEvent()
    }
}