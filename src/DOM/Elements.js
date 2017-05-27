import * as __ from "../Util/ParamCheck";

//=================================================================================
var __DEBUG__;

const _Element = {
    id: String,
    class: String,
    type: String,
    props: Object,
    children: [] // of HTMLElement
};

export const trigger = (elem, evtName, data) => {
    let ev;
    if (data === undefined) {
        ev = new Event(evtName, {
            bubbles: false
        });
    }
    else {
        ev = new CustomEvent(evtName, {
            detail: data,
            bubbles: false
        });
    }
    elem.dispatchEvent(ev);
}

export const genId = () => "id:" + Math.random();


export const AppendChildren = (node, children) => {
    if (__DEBUG__) {
        if (!(node instanceof Element)) throw Error("node is not an Element");
        if (!__.checkArray(children)) throw Error("children is not an array");
    }
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        node.appendChild(child);
        trigger(child, "append");
    }
};

export const ApplyStyle = (node, style) => {
    if (__DEBUG__) {
        if (!(node instanceof Element)) {
            throw Error("node is not an Element");
        }
        if (!__.checkObject(style)) {
            throw Error("style is not an object");
        }
    }

    Object.keys(style).forEach(rule => {
        node.style[rule] = style[rule];
    });
};

export const AddClasses = (elem, classStr) => {
    if (__DEBUG__) {
        if (!(elem instanceof Element)) throw Error("elem is not an Element");
        if (!__.checkString(classStr)) throw Error("classStr is not a string");
    }

    let list = classStr.split(' ');
    list.forEach(_class => { elem.classList.add(_class); });
};

const CopyProps = (elem, props) => {
    if (__DEBUG__) {
        if (!(elem instanceof Element)) throw Error("node is not an Element");
        if (!__.checkObject(props)) throw Error("props is not an Object");
    }
    Object.keys(props).forEach(prop => {
        if (__DEBUG__) {
            if (!__.checkObject(props)) throw Error("props is not an Object");
            if (prop !== "class" && prop !== 'children' && prop !== 'style') {
                throw Error("props should not contain: class|children|style|listenTo")
            }
        } else {
            elem[prop] = props[prop];
        }
    });
};

const CopyListener = (elem, listeners) => {
    if (__DEBUG__) {
        if (!(elem instanceof Element)) throw Error("node is not an Element");
        if (!__.checkObject(listeners)) throw Error("listeners is not an Object");
    }
    Object.keys(listeners).forEach(key => {
        elem.addEventListener(key, listeners[key]);
    });
};

const Create = (args) => {
    let elem = document.createElement(args.Type);

    if (args.class) AddClasses(elem, args.class); delete args.class;
    if (args.style) ApplyStyle(elem, args.style); delete args.style;
    if (args.children) AppendChildren(elem, args.children); delete args.children;
    if (args.listenTo) CopyListener(elem, args.listenTo); delete args.listenTo;
    CopyProps(elem, args);

    return elem;
};

export const mount = () => {
    // traverse the DOM via breadth-first
    let stack = [document.body];
    let stackIndex = 0;
    let elem;

    while (elem = stack[stackIndex]) {
        let children = elem.children;
        for (let i = 0; i < children.length; i++) {
            let child = children.item(i);
            stack.push(child);
        }
        trigger(elem, "mgMount")
        stackIndex++;
    }

    console.log(`DOM fully loaded and parsed. Elements: ${stackIndex - 1}`);
};

export const App = (elem) => {
    document.body.appendChild(elem);
    
    // if (args.class) AddClasses(elem, args.class); delete args.class;
    // if (args.style) ApplyStyle(elem, args.style); delete args.style;
    // if (args.children) AppendChildren(elem, args.children); delete args.children;
    // if (args.listenTo) CopyListener(elem, args.listenTo); delete args.listenTo;
    // CopyProps(elem, args);

    document.addEventListener("DOMContentLoaded", mount);
};

export const Div = (args) => {
    let _args = args || {};
    _args.Type = 'div';

    return Create(_args);
};

export const Group = Div;

export const Span = (args) => {
    let _args = args || {};
    _args.Type = 'span';

    return Create(_args);
};

export const P = (args) => {
    let _args = args || {};
    _args.Type = 'p';

    return Create(_args);
};

export const A = (args) => {
    let _args = args || {};
    _args.Type = 'a';

    return Create(_args);
};

export const Button = (args) => {
    let _args = args || {};
    _args.Type = 'button';

    return Create(_args);
};

export const Img = (args) => {
    let _args = args || {};
    _args.Type = 'img';

    return Create(_args);
};

export const Pre = (args) => {
    let _args = args || {};
    _args.Type = 'pre';

    return Create(_args);
};

export const Input = (args) => {
    let _args = args || {};
    _args.Type = 'input';

    return Create(_args);
};
