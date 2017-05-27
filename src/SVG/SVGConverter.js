import * as __ from "../Util/ParamCheck";

import ObjectTree from "../Structures/ObjectTree";
import { NodePrinter } from "../Structures/ObjectTree";

import { parseString } from "xml2js";

// ===========================================================================

/** @export
 * @param {string} - an XML file as a string
 * @return {Object} - object literal, hierarchy of svg groups and objects
 */
const parseSVG = file => {
    let result = null;
    let err = null;

    parseString(file, (_err, _result) => {
        result = _result;
        err = _err;
    });

    let self = {}
    if (! err) {
        parse(self, result);
    }

    return self;
}

// ===========================================================================

// private functions

const parse = (trgtParentNode, srcNode) => {
    if (__.checkObject(srcNode)) {
        Object.keys(srcNode).forEach(key => {
            switch (key) {
                case "svg": parse(trgtParentNode, srcNode[key]); break;
                case "$": trgtParentNode = parseAttr(trgtParentNode, srcNode[key]); break;
                case "g": parseGroup(trgtParentNode, srcNode[key]); break;
                case "path": parsePath(trgtParentNode, srcNode[key]); break;
                case "rect": parseRect(trgtParentNode, srcNode[key]); break;
                case "circle": parseCircle(trgtParentNode, srcNode[key]); break;
                case "text": parseText(trgtParentNode, srcNode[key]); break;
                default: console.log(`${key}: ${srcNode[key]}`);
            }
        });
    }
    else if (__.checkArray(srcNode)) { // array of objects

    }
    else { // it's a string {

    }
};

let unknownCouter = 0;

const parseAttr = (parentNode, attr) => {
    if (!__.checkObject(attr)) {
        return;
    }

    let id = attr.id;
    let key = null;
    if (__.checkString(id)) {
        key = id;
    }
    else {
        key = "unknown" + unknownCouter;
        unknownCouter++;
    }
    parentNode[key] = {};
    let aaa = parentNode[key];
    aaa.attr = {};
    Object.assign(aaa.attr, attr);
    delete aaa.attr.id;

    return parentNode[key];
}

const _parseSVG = (parentNode, svg) => {
    if (!__.checkObject(svg)) {
        return;
    }
    parse(parentNode, svg);
    parentNode = parentNode.svg;
};

const parseGroup = (parentNode, group) => {
    if (__.checkArray(group)) {
        group.forEach(entry => {
            parse(parentNode, entry);
        })
    }
};

const parsePath = (parentNode, pathes) => {
    if (__.checkArray(pathes)) {
        pathes.forEach(path => {
            parse(parentNode, path);
        })
    }
};

const parseRect = (parentNode, rects) => {
    if (__.checkArray(rects)) {
        rects.forEach(path => {
            parse(parentNode, path);
        })
    }
};

const parseCircle = (parentNode, circles) => {
    if (__.checkArray(circles)) {
        circles.forEach(circle => {
            parse(parentNode, circle);
        })
    }
};

const parseText = (parentNode, texts) => {
    if (__.checkArray(texts)) {
        texts.forEach(text => {
            parse(parentNode, text);
        })
    }
};

export { parseSVG };