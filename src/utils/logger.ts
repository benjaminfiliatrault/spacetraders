class Logger {
    constructor() {
        if(!(this instanceof Logger)) {
            return new Logger();
        }
    }

    print(...message: any[]) {
        console.log(...message);
    }

    clear() {
        console.clear();
    }
}

export default new Logger();