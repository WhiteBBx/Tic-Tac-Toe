export function createDivElement(elementName, parentName, className, icon, out){
    
    function createDiv(){

        elementName = document.createElement('div')
        elementName.classList.add(className)
        parentName.appendChild(elementName)
    }

    function createIco(){

        let ico = document.createElement('i')
        if(out === undefined) ico.className = 'material-icons' 
        else if(out == 'out') ico.className = 'material-symbols-outlined'
        ico.textContent = icon
        elementName.appendChild(ico)
    }

    if(icon === undefined){
        createDiv()
    }
    else{
        createDiv()
        createIco()
    }

    return elementName
}

export function changeColor(selector ,variable, color){

    let element = document.querySelector(selector)
    element.style.setProperty(variable, color)
}