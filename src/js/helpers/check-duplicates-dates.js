import { isInvalid } from './const';
export const checkDuplicates = (arrayToCheck, element, elementIndex) => {
    const isDateTaken = Array.prototype.slice.call(arrayToCheck).filter((el, elIndex) => {
        if (elIndex !== elementIndex) {
            return el;
        }
    }).find(filteredEl => filteredEl.value === element.value);
    if (isDateTaken) {
        element.classList.add(isInvalid);
    } else {
        element.classList.remove(isInvalid);
    }
}

export const getDuplicates  = function (arr, element, elementIndex) {
    const duplicates = {};
    const nodeToArr = Array.from(arr)
    for (let i = 0; i < nodeToArr.length; i ++) {
        if(duplicates.hasOwnProperty(nodeToArr[i].value)) {
            duplicates[nodeToArr[i].value].push(i);
        } else if (nodeToArr.lastIndexOf(nodeToArr[i].value) !== i) {
            duplicates[nodeToArr[i].value] = [i];
        }
    }

    return duplicates;
};

export const markDuplicated = (duplicatedObject, arrayToMark) => {
    const duplicatesArray = Object.values(duplicatedObject);
    console.log(duplicatesArray)
    duplicatesArray.forEach(item => {
        const itemsLength = item.length;
        if (itemsLength > 1) {
            item.forEach(inputIndex => arrayToMark[inputIndex].classList.add(isInvalid));
            console.log(item)
        } else if (itemsLength === 1) {
            arrayToMark[item[0]].classList.remove(isInvalid);
            console.log(item)
        }
    });
}