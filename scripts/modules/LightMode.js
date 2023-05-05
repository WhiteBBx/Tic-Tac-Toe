import { createDivElement, changeColor } from "./Utils.js"

export class LightMode {

    constructor(){

        if(localStorage.getItem('Mode') === undefined) this.current = 'dark'
        else this.current = localStorage.getItem('Mode')
    }

    loadColors(){

        this.current == 'light' ? changeColor(':root','--color1', '#e9e9e9') : changeColor(':root','--color1', '#1b1b1b')
        this.current == 'light' ? changeColor(':root','--color2', '#1b1b1b') : changeColor(':root','--color2', '#e9e9e9')
        this.current == 'light' ? this.light.firstChild.textContent = 'light_mode' : this.light.firstChild.textContent = 'dark_mode'
    }

    drawModeButton(){

        this.modeContainer = createDivElement(this.modeContainer, document.body, 'mode-container')
        this.light = createDivElement(this.light, this.modeContainer, 'icon', 'dark_mode', 'out')
        this.light.firstChild.textContent = 'dark_mode'
    }

    addModeButtonEvent(){
        
        this.current = this.current == 'light' ? 'dark' : 'light'
        localStorage.setItem('Mode', this.current)
        this.loadColors()
    }

    checkModeButtonEvent(){

        this.light.addEventListener('click', () => this.addModeButtonEvent() )
    }

    render(){

        this.drawModeButton()
        this.loadColors()
        this.checkModeButtonEvent()
    }
}