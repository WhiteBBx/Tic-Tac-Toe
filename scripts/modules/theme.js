import { createDivElement } from "./utils.js"

export const theme = {

    drawTheme(){

        this.themeContainer = createDivElement(this.themeContainer, document.body, 'theme-container')
        this.light = createDivElement(this.light, this.themeContainer, 'menu-icon', 'light_mode', 'out')
        this.dark = createDivElement(this.dark, this.themeContainer, 'menu-icon', 'dark_mode', 'out')
    },

    lightEvent(){

        this.curent = 'light'
        console.log( this.curent )
        this.light.classList.add('active')
    },

    darkEvent(){

    },

    checkEvent(){

        this.light.addEventListener('click', this.lightEvent)
    },

    render(){

        this.drawTheme()
        this.checkEvent()
    }
}