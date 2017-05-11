import {
    ApplyStyle,
    AppendChildren,
    AddClasses
} from "../DOM/Elements";

const svgNS = "http://www.w3.org/2000/svg";
const svgLink = "http://www.w3.org/1999/xlink";

const SVG = (args) => {
    let svgDoc = document.createElementNS(svgNS, 'svg');
    svgDoc.setAttribute('xmlns:xlink', svgLink);
    svgDoc.setAttribute('id', args.id);

    AddClasses(svgDoc, args.class);
    AppendChildren(svgDoc, args.children);

    return svgDoc;
};

const CopyProps = (elem, props) => {
    if (props && typeof props === "object") {
        Object.keys(props).forEach(prop => {
            let isAttr = props.attr && props.attr.some(entry => entry === prop);
            if (prop !== "class" && 
                prop !== 'children' &&
                prop !== 'style' &&
                !isAttr
            ) {
                elem[prop] = props[prop];
            }
        });
    }
    else if (props) {
        console.log('Cannot copy properties to element ' + elem.toString());
    }
};

const Create = (args) => {
    let elem = document.createElementNS(svgNS, args.Type);

    AddClasses(elem, args.class);
    ApplyStyle(elem, args.style);
    AppendChildren(elem, args.children);
    CopyProps(elem, args);

    return elem;
};

const Group = (args) => {
    if (!args || typeof args !== "object") args = {};
    args.Type = "g";
    return Create(args);
};

const Circle = (args) => {

    args.Type = "circle";
    args.attr = ["cx", "cy", "r"]
    let self = Create(args);

    self.setAttribute("cx", args.cx || 10);
    self.setAttribute("cy", args.cy || 10);
    self.setAttribute("r", args.r || 10);

    return self;
};

const Rect = (args) => {
    args.Type = "rect";
    args.attr = ["x", "y", "rx", "ry", "width", "height"]
    let self = Create(args);

    // set read only props as attributes
    self.setAttribute("width", args.width || 10);
    self.setAttribute("height", args.height || 10);
    self.setAttribute("x", args.x || 10);
    self.setAttribute("y", args.y || 10);
    if (args.rx) self.setAttribute("rx", args.rx);
    if (args.ry) self.setAttribute("ry", args.ry || 0);

    return self;
};

const Path = (args) => {
    args.Type = "path";
    args.attr = ["d", "transform"]
    let self = Create(args);
    
    self.setAttribute("d", args.d || "m 10,10 l 20,20");
    if (args.transform) {
        self.setAttribute("transform", args.transform);
    }

    return self; 
};

export { SVG, Group, Circle, Rect, Path };