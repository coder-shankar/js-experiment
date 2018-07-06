class Key {

    constructor(stick) {
        this.stk = stick;
    }

    keyDownHandler(e) {

        e = e || window.event;

        switch (e.keyCode) {
            case 38:
                this.stk.increasePower();
                break;
            case 40:
                this.stk.decreasePower();
                break;
            default:

        }
    }
}