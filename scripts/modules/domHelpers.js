export function createBoardElement(elementName, parentName, className, fontAwesome){
    
    function createDiv(){

        elementName = document.createElement('div')
        elementName.classList.add(className)
        parentName.appendChild(elementName)
    }

    function createIco(){

        let ico = document.createElement('i')
        ico.className = fontAwesome
        elementName.appendChild(ico)
    }

    if(fontAwesome === undefined){
        createDiv()
    }
    else{
        createDiv()
        createIco()
    }

    return elementName
}