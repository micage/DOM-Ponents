"use strict";

const NodePrinter = (node, breakCondition) => {
    let tabs = Array.from({ length: node.depth }, () => ".  ").join("");
    if (breakCondition && breakCondition()) return false; // stops traversal if condition fits
    let str = "";
    if (!(node.data instanceof Object)) {
        str = " -> " + node.data;
    }
    console.log(tabs + node.id + str);
};


class ObjectTree {
    constructor(json) {
        this._json = json;
    }

    _preOrder(obj, cb, node) {
        if (!obj || typeof obj !== "object") return;

        let keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            if (node.doContinue === false) break; // callback returned false;

            var child = obj[keys[i]];
            node.hasChildren = true;

            if (Array.isArray(child)) {
                node.id = keys[i] + "[" + child.length + "]";
            }
            else if (child && typeof child === "object") {
                node.id = keys[i];
                if (Object.keys(child).length === 0) {
                    node.hasChildren = false;
                }
            }
            else {
                node.hasChildren = false;
                node.id = keys[i];
            }

            node.data = child;

            node.isLastChild = i === keys.length - 1;
            node.depth++;

            node.doContinue = cb(node); // call visitor
            this._preOrder(child, cb, node); // -> recursion

            node.depth--;
        }
    }

    traverse(visitor) {
        if (typeof this._json !== "object") return;

        let nodeInfo = {
            depth: 0
        };
        this._preOrder(this._json, visitor, nodeInfo);
    }

}

//module.exports = ObjectTree;

export { ObjectTree as default, NodePrinter };
