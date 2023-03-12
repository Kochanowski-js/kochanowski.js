// [type, message, hint]
// types:
// 0 - error
// 1 - warning
// 2 - success (?)
// 3 - debug


export default {
    0: [0, "No configuration file", "Add \'konfiguracja.zojs\' to the root of your project."],
    1: [0, "Config file parse error."],
    2: [0, "Error not found"], //what
    101: [0, "Parenthesis do not match", "Add missing closing brackets to your code."],
    102: [0, ""],
    200: [1, "Invalid Addition Type", "You can only add integers together."],
    201: [1, "Invalid Substraction Type", "You can only substract integers together."],
    202: [1, "Invalid Multiplier", "Right side of multiplication must be an integer."],
    203: [1, "String Multiplicand error", "Can only multiply a string by a integer"],
    204: [1, "Invalid divisor", "Replace the divisor by a number other than 0"],
    205: [1, "Invalid Division Type", "Both dividend and divisor must be integers"],
    300: [3, "Found EOF"]
}