import * as __ from "../Util/ParamCheck";
import {
    ApplyStyle,
    AppendChildren,
    AddClasses
} from "../DOM/Elements";

const svgNS = "http://www.w3.org/2000/svg";
const svgLink = "http://www.w3.org/1999/xlink";

/**
 * Since props are applied as attributes we cannot use DOM/Elements.CopyProps
 * have to guard against copying props that are attributes which are read-only
 * like e.g. cx for a circle
 * @param {SVGElement} elem 
 * @param {Object} props 
 */
const CopyProps = (elem, props) => {
    if (__DEBUG__) {
        if (!(elem instanceof SVGElement)) throw Error("args is not an Object");
        if (!__.checkObject(props)) throw Error("args is not an Object");
    }
    Object.keys(props).forEach(prop => {
        let isAttr = props.attr && props.attr.some(entry => entry === prop);
        if (!isAttr) {
            elem[prop] = props[prop];
        }
    });
};

const Create = (args) => {
    let elem = document.createElementNS(svgNS, args.Type);

    if (args.class) AddClasses(elem, args.class); delete args.class;
    if (args.style) ApplyStyle(elem, args.style); delete args.style;
    if (args.children) AppendChildren(elem, args.children); delete args.children;
    CopyProps(elem, args);

    return elem;
};

const SVG = (args) => {
    if (!__.checkObject(args)) args = {};

    args.Type = "svg";
    args.attr = ["xmlns:xlink"]
    let self = Create(args);

    self.setAttribute('xmlns:xlink', svgLink);

    return self;
};

const Group = (args) => {
    if (!__.checkObject(args)) args = {};
    args.Type = "g";
    return Create(args);
};

const Circle = (args) => {
    if (!__.checkObject(args)) args = {};
    if (__.checkArray(args.children)) delete args.children; // no children allowed
    
    args.Type = "circle";
    args.attr = ["cx", "cy", "r"]
    let self = Create(args);

    // set read only props as attributes
    self.setAttribute("cx", __.checkNumber(args.cx) ? args.cx : 10);
    self.setAttribute("cy", __.checkNumber(args.cx) ? args.cy : 10);
    self.setAttribute("r", __.checkNumber(args.r) ? args.cy : 10);

    return self;
};

const Rect = (args) => {
    if (!__.checkObject(args)) args = {};
    if (__.checkArray(args.children)) delete args.children; // no children allowed
    
    args.Type = "rect";
    args.attr = ["x", "y", "rx", "ry", "width", "height"];
    let self = Create(args);

    // set read only props as attributes
    self.setAttribute("width", args.width || 10);
    self.setAttribute("height", args.height || 10);
    self.setAttribute("x", args.x || 10);
    self.setAttribute("y", args.y || 10);
    self.setAttribute("rx", args.rx || 0);
    self.setAttribute("ry", args.ry || 0);

    return self;
};

const Path = (args) => {
    if (!__.checkObject(args)) args = {};
    if (__.checkArray(args.children)) delete args.children; // no children allowed
    
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