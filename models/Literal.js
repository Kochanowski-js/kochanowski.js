class Literal {

    constructor(content, type) {

        this.content = content;
        this.grammar = {};
        this.type = type;

    }

}

// number was taken
class Zahlen extends Literal {

    constructor(content) {
        super(content);

        //parse int here

        this.type = "NUMBER";

    }

}

let x = new Zahlen(1,)
console.log(x)