class Scoresheet {
    // ones;
    // twos;
    // threes;
    // fours;
    // fives;
    // sixes;
    // threeOfAKind;
    // fourOfAKind;
    // fullHouse;
    // smallStraight;
    // largeStraight;
    // yahtzee;
    // extraYahtzee;
    // chance;

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
        this.upperTotal = null;
        this.bonus = false;
        this.upperGrandTotal = null;
        this.lowerTotal = null;
        this.grandTotal = null;

        this.totalTurns = null;
    }
    checkUpperComplete() {
        return ((this.ones != null) &&
            (this.twos != null) &&
            (this.threes != null) &&
            (this.fours != null) &&
            (this.fives != null) &&
            (this.sixes != null));
    }
    setUpperTotal() {
        this.upperTotal =
            this.ones +
            this.twos +
            this.threes +
            this.fours +
            this.fives +
            this.sixes;
        this.setBonus();
    }
    setBonus() {
        this.bonus = (this.upperTotal > 62);
    }

    getBonus() {
        return this.bonus;
    }

    setUpperGrandTotal() {
        if (this.bonus) {
            this.upperGrandTotal = (this.upperTotal + 35);
        }
        else {
            this.upperGrandTotal = this.upperTotal;
        }
    }
    checkLowerComplete() {
        return ((this.threeOfAKind != null) &&
            (this.fourOfAKind != null) &&
            (this.fullHouse != null) &&
            (this.smallStraight != null) &&
            (this.largeStraight != null) &&
            (this.yahtzee != null) &&
            (this.chance != null));
    }

    setLowerTotal() {
        if (this.checkLowerComplete()) {
            this.lowerTotal =
                this.threeOfAKind +
                this.fourOfAKind +
                this.fullHouse +
                this.smallStraight +
                this.largeStraight +
                this.yahtzee +
                this.chance +
                this.extraYahtzee * 100;
        }
    }
    setGrandTotal() {
        this.grandTotal = this.upperGrandTotal + this.lowerTotal;
    }

    checkForEmptyCells() {
        console.log(this.ones + " " +
            this.twos + " " +
            this.threes + " " +
            this.fours + " " +
            this.fives + " " +
            this.sixes  + " " +
            this.threeOfAKind + " " +
            this.fourOfAKind + " " +
            this.fullHouse + " " +
            this.smallStraight + " " +
            this.largeStraight + " " +
            this.yahtzee + " " +
            this.chance);
        return (!((isNaN(this.ones)  ||
            (isNaN(this.twos)) ||
            (isNaN(this.threes)) ||
            (isNaN(this.fours)) ||
            (isNaN(this.fives)) ||
            (isNaN(this.sixes)) ||
            (isNaN(this.threeOfAKind)) ||
            (isNaN(this.fourOfAKind)) ||
            (isNaN(this.fullHouse)) ||
            (isNaN(this.smallStraight)) ||
            (isNaN(this.largeStraight)) ||
            (isNaN(this.yahtzee)) ||
            (isNaN(this.chance)))))
    }

    setTotalTurns(turns) {
        this.totalTurns = turns;
        // console.log('Total turns: ' + this.totalTurns);
    }

    getTotalTurns() {
        return this.totalTurns;
    }

    finalCalculation() {
        if (this.checkForEmptyCells()) {
            this.setUpperTotal();
            this.setUpperGrandTotal();
            this.setLowerTotal();
            this.setGrandTotal();
        }
        else {
            console.log("Empty scores remaining");
        }
    }
}