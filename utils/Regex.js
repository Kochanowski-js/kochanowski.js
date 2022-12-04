// Regexes
const regex = {
    firstCharLower: /^[a-z]/,
    sentencesDots: /\.(?=(?:(?:[^"]*"){2})*[^"]*$)/g,
    anythingOutsideQuotes: /.(?=(?:(?:[^"]*"){2})*[^"]*$)/g
}

/**
 * Get sentences divided by dots that are not in quotes
 * @param content Content string
 * @returns Array of sentences
 */
function getSentences(content) {
    return content.split(regex.sentencesDots).map(e => e.trim()).filter(Boolean)
}

/**
 * Sanitizes regex
 * @param content User input
 * @returns Sanitized regex
 */
function sanitizeRegex(content) {
    const chars = "\\^$*+?.()|{}[]";
    
    for (let char of chars)
        content = content.replaceAll(char, `\\${char}`);
    
    return content
}

/**
 * Construct a regex that matches all occurences outside qoutes
 * @param match The character to match
 */
function outsideConstructor(match) {
    return new RegExp(`${sanitizeRegex(match)}(?=(?:(?:[^"]*"){2})*[^"]*$)`, 'g')
}

/**
 * Count characters outside quotes
 * @param content Content
 * @param match The character to match
 * @returns How many occurences
 */
function matchOutsideQuotes(content, match) {
    return (content.match(outsideConstructor(match)) || []).length;
}


export default regex
export { getSentences, matchOutsideQuotes, outsideConstructor}