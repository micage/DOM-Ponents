import ObjectTree from "../Structures/ObjectTree";

const dom = (parent, attr) => {
    let elem = (typeof attr.type === "string" ?
        document.createElement(attr.type || 'div') :
        attr.type.Create() );
    elem.id = attr.id || '';
    if (attr.class) elem.classList.add(attr.class);
    if (parent) parent.appendChild(elem);
    return elem;
};

const nonNode = [
    'type', 'class', 'id'
];

const createDom = (parent, json) => {
    let objTree = new ObjectTree(json);
    //let parent = _parent;
    let stack = [];

    const DomCreator = (node) => {

        // keys that are contained in nonNode are no elements
        if ( nonNode.find( key => key === node.id ) ) { return; }

        let attr = node.data;
        // let elem = (typeof attr.type === "function" ?
        //     (attr.type)(parent) :
        //     document.createElement(attr.type || 'div') );
        let elem = ( (attrType) => {
            if (typeof attrType === "function") {
                return (attrType)(parent);
            }
            else {
                return document.createElement(attrType || 'div');
            }
        })(attr.type);
        console.log("createDom: element = " + node.id + "::" + elem.classList);

        elem.id = attr.id || '';
        if (attr.class) elem.classList.add(attr.class);
        if (parent) parent.appendChild(elem);

        // keys that are contained in nonNode are no children
        let filteredKeys = Object.keys(attr).filter(key => { return ! nonNode.find( name => name === key ) });

        if (filteredKeys.length) {
            if (! node.isLastChild) {
                stack.push(parent); // store parent
            }
            parent = elem; // set new parent
        }
        else if (node.isLastChild) {
            let last = stack.pop(); // restore parent
            if (last) parent = last;
        }
    };

    objTree.traverse(DomCreator);

    console.log("createDom returned: " + parent.constructor.name);

    return parent;
};

export default createDom;
