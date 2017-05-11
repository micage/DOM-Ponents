
// wrapper for document.createElement

const _Element = {
    id: String,
    class: String,
    type: String,
    props: Object,
    children: [] // of HTMLElement
};

export
const AppendChildren = (node, children) => {
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
const ApplyStyle = (node, style) => {
    if (style && typeof style === "object") {
        Object.keys(style).forEach(rule => {
            node.style[rule] = style[rule];
        });
    }
    else if (style) {
        console.log('Cannot apply style to element ' + node.toString());
    }
};

export
const AddClasses = (node, classStr) => {
    if (classStr && typeof classStr === "string") {
        let list = classStr.split(' ');
        list.forEach(_class => { node.classList.add(_class); });
    }
};

const CopyProps = (elem, props) => {
    if (props && typeof props === "object") {
        Object.keys(props).forEach(prop => {
            if (prop !== "class" && prop !== 'children' && prop !== 'style') {
                elem[prop] = props[prop];
            }
        });
    }
    else if (props) {
        console.log('Cannot copy properties to element ' + elem.toString());
    }
};

const Create = (args) => {
    let elem = document.createElement(args.Type);
    if(__DEBUG__ && 0) console.log("create: " + args.Type + (args.id ? "#" + args.id : "") + (args.class ? "." + args.class : "") );

    AddClasses(elem, args.class);
    ApplyStyle(elem, args.style);
    AppendChildren(elem, args.children);
    CopyProps(elem, args);

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
