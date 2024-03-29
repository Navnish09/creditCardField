//==== Optional chaining( ?. ) is used to prevent the TypeError and handle the null value


// Enable a field
export const enableInput = (elem) => {
    elem.disabled = false
}

// Focus a specific element
export const focusElement = (elem) => {
    elem.focus();
}

// Focus next sibling of the element
export const focusNextElement = (nextElem) => {
    // Check if the next elem is available or not.
    if (nextElem) {
        enableInput(nextElem);
        focusElement(nextElem) // focus next element
    }   
}


// Focus previous sibling of the element
export const focusPreviousElement = (prevElem) => {
     // Check if the previous elem is available or not.
    if (prevElem) {
        focusElement(prevElem) // focus previous element
    }
}


// Limit text length to n number
export const limitInputTextLength = (elem, limit) => {
    elem.value = elem.value.substr(0, limit);
}


// Create empty array with n number of empty values
export const getEmptyArray = (limit, defaultValue = "") => {
    return Array(limit).fill(defaultValue);
}

//Split text into n parts with n length value in each
export const splitText = (text, byValue) => {
    let chunk = [];
    const trimmedtext = trimAllWhiteSpaces(text);   

    for (let i = 0, j = 0; i < byValue; i++, j += byValue) {
        chunk[i] = trimmedtext.substr(j, byValue);
    }
    
    return chunk;
} 

//Remove white spaces from text
export const trimAllWhiteSpaces = (text) => {
    return text.replace(/\s+/g, '');
}