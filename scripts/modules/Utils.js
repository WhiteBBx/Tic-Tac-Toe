export function createDivElement(insert ,elementName, parentName, className, icon, out){
    
    if(icon === undefined){

        elementName = document.createElement('div')
        elementName.classList.add(className)
    }
    else{

        elementName = document.createElement('i')
        if(out === undefined) elementName.className = `${className} material-icons`
        else if(out == 'out')elementName.className = `${className} material-symbols-outlined`
        elementName.textContent = icon
    }

    if(insert == 'after') parentName.append(elementName)
    else parentName.prepend(elementName) 


    return elementName
}

export function changeColor(selector ,variable, color){

    let element = document.querySelector(selector)
    element.style.setProperty(variable, color)
}