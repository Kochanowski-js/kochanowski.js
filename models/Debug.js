function debugStringWithHighlight(str, index) {
    str = index > str.length - 1 ? str.padEnd(index + 1, ' ') : str;
    return `${str.slice(0, index)}\x1b[43m${str.charAt(index)}\x1b[0m${str.slice(index + 1)}`
}

export {
    debugStringWithHighlight
}