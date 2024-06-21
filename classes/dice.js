class Dice {
    holdState;
    value;

    constructor() {
        this.holdState = false;
        this.value = null;
    }
    setValue(newValue) {this.value = newValue;}

    getValue() {return this.value;}

    setHoldState(bool) {
        this.holdState = bool;
    }

    getHoldState() {
        return this.holdState;
    }
}