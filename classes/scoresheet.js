class Scoresheet {
    constructor() {
        // Upper section
        this.ones = 0;
        this.twos = 0;
        this.threes = 0;
        this.fours = 0;
        this.fives = 0;
        this.sixes = 0;

        // Lower section
        this.threeOfAKind = 0;
        this.fourOfAKind = 0;
        this.fullHouse = 0;
        this.smallStraight = 0;
        this.largeStraight = 0;
        this.yahtzee = 0;
        this.extraYahtzee = 0;
        this.chance = 0;

        // Totals
        this.upperTotal = 0;
        this.bonus = false;
        this.upperGrandTotal = 0;
        this.lowerTotal = 0;
        this.grandTotal = 0;
    }
    setUpperTotal() {this.upperTotal = this.ones + this.twos + this.threes + this.fours + this.fives + this.sixes;}
    setBonus() {this.bonus = this.upperTotal > 62;}
    setUpperGrandTotal() {
        if (this.bonus) {
            this.upperGrandTotal = (this.upperTotal + 35);
        }
    }
    setLowerTotal() {this.lowerTotal = this.threeOfAKind + this.fourOfAKind + this.fullHouse + this.smallStraight + this.largeStraight + this.yahtzee + this.extraYahtzee + this.chance;}
    setGrandTotal() {this.grandTotal = this.upperGrandTotal + this.lowerTotal;}
}