
// wrapper for document.createElement

const Element = {
    id: String,
    class: String,
    type: String,
    props: Object,
    children: [] // of HTMLElement
};

const Appendchildren = (node, children) => {
    if (Array.isArray(children) && children.length) {
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            node.appendChild(child);
        }
    }
    else {
        if (children) {
            console.log('children is not an Array: ' + JSON.stringify(children));
        }
    }
};

export
const Create = (args) => {
    let elem = document.createElement(args.Type);
    if(__DEBUG__&&0) console.log("create: " + args.Type + (args.id ? "#" + args.id : "") + (args.class ? "." + args.class : "") );

    if (args.class) {
        let list = args.class.split(' ');
        list.forEach( c => { elem.classList.add(c); });
    }

    for (let key in args) {
        if (key === 'style') {
            for (let style in args.style) {
                elem.style[style] = args.style[style];
            }
        }
        else if (key !== "class" && key !== 'children') {
            elem[key] = args[key];
        }
    }

    Appendchildren(elem, args.children);

    return elem;
};

export
const Div = (args) => {
    let _args = args || {};
    _args.Type = 'div';

    return Create(_args);
};

export
const Span = (args) => {
    let _args = args || {};
    _args.Type = 'span';

    return Create(_args);
};

export
const P = (args) => {
    let _args = args || {};
    _args.Type = 'p';

    return Create(_args);
};

export
const A = (args) => {
    let _args = args || {};
    _args.Type = 'a';

    return Create(_args);
};

export
const Button = (args) => {
    let _args = args || {};
    _args.Type = 'button';

    return Create(_args);
};

export
const Img = (args) => {
    let _args = args || {};
    _args.Type = 'img';

    return Create(_args);
};

export
const Pre = (args) => {
    let _args = args || {};
    _args.Type = 'pre';

    return Create(_args);
};
