
const svgNS = "http://www.w3.org/2000/svg";
const svgLink = "http://www.w3.org/1999/xlink";

const SVG = (args) => {
    let svgDoc = document.createElementNS(svgNS, 'svg');
    svgDoc.setAttribute('xmlns:xlink', svgLink);
    svgDoc.setAttribute('id', args.id);

    AddClasses(svgDoc, args.class);

    for (let i = 0; i < args.children.length; i++) {
        let child = args.children[i];
        svgDoc.appendChild(child);
    }

    return svgDoc;
};

const Group = (args) => {
    let self = document.createElementNS(svgNS, "g");
    self.Type = "g";

    if (args.children && args.children.length) {
        for (let i = 0; i < args.children.length; i++) {
            let child = args.children[i];
            self.appendChild(child);
        }
    }

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

const AddClasses = (self, classStr) => {
    if (classStr) {
        let classArr = classStr.split(" ");
        classArr.forEach( str => {
            self.classList.add(str);    
        });
    }
}

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

const Box = (args) => {

};

const Path = () => {
    document.createElement()

};

export { SVG, Group, Circle, Box, Path };