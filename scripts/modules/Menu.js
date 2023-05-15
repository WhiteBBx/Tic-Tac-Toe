import { createDivElement } from "./Utils.js"

export class Menu {

    drawMenu(){

        this.menuContainer = createDivElement('after',this.menuContainer, document.body, 'menu-container')
        this.player.x.icon = createDivElement('after',this.player.x.icon, this.menuContainer, 'icon', 'close')
        this.resetButton = createDivElement('after',this.resetButton, this.menuContainer, 'icon', 'rotate_right')
        this.player.o.icon = createDivElement('after',this.player.o.icon, this.menuContainer, 'icon', 'radio_button_unchecked')

        this.player.current.class == this.player.o.class ? this.player.o.icon.classList.add('current-player') : this.player.x.icon.classList.add('current-player')
    }

    addResetEvent = () =>{

        if(this.history.selected != null) this.player = this.history.selected

        this.resetButton.style.animation = 'reset-button 0.5s linear infinite'
        this.resetButton.classList.add('reset-button')
        this.resetButton.classList.add('active')

        if(this.player.winner.combination.length){
            this.fieldsContainer.addEventListener('animationiteration', () => {
                this.fieldsArray.forEach((element) => {
                    if(element.hasChildNodes()){
                        element.firstChild.classList.remove('won-player')
                        element.firstChild.classList.remove('show-player')
                    }
                })
                setTimeout(() => window.location.reload(), this.animate.hidePlayer())
            })
        }
        else{
            setTimeout(() => window.location.reload(), this.animate.hidePlayer())
        }
    }

    checkResetEvents(){

        this.resetButton.addEventListener('mouseover', () => { this.resetButton.classList.add('reset-button') })
        this.resetButton.addEventListener('animationend', () => { this.resetButton.classList.remove('reset-button') })
        this.resetButton.addEventListener('click', this.addResetEvent, { once: true })
    }

    render(){
        
        this.drawMenu()
        this.checkResetEvents()
    }
}