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