"use strict";

class MArray extends Array {
    constructor(...args) {
        super(...args);
    }
    get head() {
        return this[0];
    }
    set head(item) {
        this.insertBefore(item);
    }

    get tail() {
        return this[this.length - 1];
    }
    set tail(item) {
        this.insertAfter(item);
    }

    without(item) {
        return this.filter((v) => v !== item);
    }

    insertBefore(item, at) {
        let index = this.indexOf(at);
        if (index < 0) {
            index = 0;
        } else {
            index;
        }
        this.splice(index, 0, item);
        return this;
    }

    insertAfter(item, at) {
        let index = this.indexOf(at);
        if (index < 0) {
            index = this.length;
        } else {
            index++;
        }
        this.splice(index, 0, item);
        return this;
    }
}

export default MArray;

