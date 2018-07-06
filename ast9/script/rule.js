class Rule {

    constructor(props) {



    }


    isOutOfLeftBorder(pos, origin) {
        return (pos.x - origin.x) < this.leftBorder;
    }

    isOutOfRightBorder(pos, origin) {

        return (pos.x + origin.x) > this.rightBorder;
    }

    isOutOfTopBorder(pos, origin) {

        return (pos.y - origin.y) < this.topBorder;
    }

    isOutOfBottomBorder(pos, origin) {

        return (pos.y + origin.y) > this.bottomBorder;

    }









}