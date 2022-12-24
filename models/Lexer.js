//prędzej napisze fraszkę niż ten kod

const operators = /+-/g

class Lexer {

    constructor(content) {

        this.content = content;
        this.charIndex = 0;
        
        lexize();

    }

    lexize() {

    }

}

"2 + 2 * 4;"

[
    {
        type: "INTEGER",
        content: "2"
    },
    {
        type: "OPERATOR",
        content: "ADDITION"
    },
    {
        type: "INTEGER",
        content: "2"
    },
    {
        type: "OPERATOR",
        content: "MULTIPLICATION"
    },
    {
        type: "INTEGER",
        content: "4"
    },
    {
        type: "END",
        content: "DEFAULT"
    }
]