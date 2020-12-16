

export function getTimeDifferenceString(start, end){
    const d = end - start;
    const hours = toHours(d)
    if (hours < 1) return "minutes"
    if (hours > 48) {
        const days = Math.round(hours / 24)
        if (days === 1) return "1 day";
        if (days > 21) return "weeks"
        return days + " days"
    }
    if (Math.round(hours) === 1) return "1 hour";
    return Math.round(hours) + " hours"
}

const msToHour = 0.000000278
function toHours(ms){
    return ms * msToHour
}

export function clampString(str, length = 50) {
    if (!str) return str;
    if (str.length > length)
        return str.substring(0, length-3) + "...";
    return str;
}

//string is blank or contains only white-space:
export function stringIsEmpty(str) {
    return (str.length === 0 || !str.trim());
}

export const removeAllSpaces = (str) => str = str.replace(/\s/g, '');
export const removeExtraSpaces = (str) => str.trim().split(/ +/).join(' ');
export const spaceToUnderscore = (str) => str.replace(/ /g, "_")
export const firstCharUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
