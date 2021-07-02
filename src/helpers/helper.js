//==== Optional chaining( ?. ) is used to prevent the TypeError and handle the null value


// Disable a field
export const disableInput = (elem) => {
    elem.disabled = true
}

// Enable a field
export const enableInput = (elem) => {
    elem.disabled = false
}

export const focusElement = (elem) => {
    elem.focus();
}


// Focus next sibling of the element
export const focusNextElement = (elem) => {
    const nextElem = elem.nextElementSibling;
    
    // Check if the next elem is available or not.
    if (nextElem) {
        enableInput(nextElem);
        focusElement(nextElem) // focus next element
    }   
}


// Focus previous sibling of the element
export const focusPreviousElement = (elem) => {
    const prevElem = elem.previousElementSibling;

     // Check if the previous elem is available or not.
    if (prevElem) {
        disableInput(elem);
        focusElement(prevElem) // focus previous element
    }
}


// Limit text length to n number
export const limitInputTextLength = (elem, limit) => {
    elem.value = elem.value.substr(0, limit);
}


// Create empty array with n number of empty values
export const getEmptyArray = (limit) => {
    return Array(limit).fill("");
}

//Split text into n parts with n length value in each
export const splitText = (text, byValue) => {
    const trimmedtext = trimAllWhiteSpaces(text);   

    let chunk = [];

    for (let i = 0, j = 0; i < byValue; i++, j += byValue) {
        chunk[i] = trimmedtext.substr(j, byValue);
    }
    
    return chunk;
} 

//Remove white spaces from text
export const trimAllWhiteSpaces = (text) => {
    return text.replace(/\s+/g, '');
}