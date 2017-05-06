
const svgNS = "http://www.w3.org/2000/svg";
const svgLink = "http://www.w3.org/1999/xlink";

const AddClasses = (node, classStr) => {
    if (classStr) {
        let classArr = classStr.split(" ");
        classArr.forEach(str => {
            node.classList.add(str);
        });
    }
}

const Appendchildren = (node, children) => {
    if (Array.isArray(children) && children.length) {
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            node.appendChild(child);
        }
    }
};

const SVG = (args) => {
    let svgDoc = document.createElementNS(svgNS, 'svg');
    svgDoc.setAttribute('xmlns:xlink', svgLink);
    svgDoc.setAttribute('id', args.id);

    AddClasses(svgDoc, args.class);
    Appendchildren(svgDoc, args.children);

    return svgDoc;
};

const Group = (args) => {
    let self = document.createElementNS(svgNS, "g");
    self.Type = "g";

    Appendchildren(self, args.children);

    return self; 
};

const CircleStr = (args) => {
    return "<circle " + 
        "id=" + args.id + 
        "r=" + args.r + 
        "cx=" + args.cx +
        "cy=" + args.cy
        + ">";
};

const Circle = (args) => {
    let self = document.createElementNS(svgNS, "circle");
    self.id = args.id;

    self.setAttribute("cx", args.cx || 10);
    self.setAttribute("cy", args.cy || 10);
    self.setAttribute("r", args.r || 10);

    AddClasses(self, args.class);
    self.Type = "circle";

    return self; 
};

const Rect = (args) => {
    let self = document.createElementNS(svgNS, "rect");
    self.id = args.id;

    self.setAttribute("width", args.width || 10);
    self.setAttribute("height", args.height || 10);
    self.setAttribute("x", args.x || 10);
    self.setAttribute("y", args.y || 10);
    self.setAttribute("ry", args.ry || 4);

    AddClasses(self, args.class);
    self.Type = "rect";

    return self; 
};

const Path = (args) => {
    let self = document.createElementNS(svgNS, "path");
    self.id = args.id;
    
    self.setAttribute("d", args.d || "m 10,10 l 20,20");
    if (args.transform) {
        self.setAttribute("transform", args.transform);
    }
    
    AddClasses(self, args.class);
    self.Type = "SVGPath";

    return self; 
};

export { SVG, Group, Circle, Rect, Path };