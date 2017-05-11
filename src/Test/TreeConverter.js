import SplitView from "../DOM/SplitView";
import TreeView from "../DOM/TreeView.js";
import { Div, P } from "../DOM/Elements.js";
import ObjectTree from "../Structures/ObjectTree.js";
import { NodePrinter } from "../Structures/ObjectTree.js";
import { parseString } from "xml2js";
import svgFile1 from "!raw-loader!../../assets/svg/Path1.svg";
import svgFile2 from "!raw-loader!../../assets/svg/Circle.svg";

const DOM = (children) => {
    if (children && Array.isArray(children)) {
        children.forEach(child => {
            document.body.appendChild(child);
        }, this);
    }
};

let trees = {
    file1: null,
    file2: null,
    converted: null,
    diy_1a: null,
    diy_1b: null,
};

parseString(svgFile1, (err, result) => { trees.file1 = result; });
parseString(svgFile2, (err, result) => { trees.file2 = result; });

trees.diy_1a = {
    svg: {
        $: {
            id: "svg9526",
            width: "600",
            height: "400",
            version: "",
            viewBox: "0 0 600 400",
            xmlns: "http://www.w3.org/2000/svg"
        },
        desc: {
            _: "Generated with Qt",
            $: {
                id: "desc8942"
            }
        },
        g: {
            $: {
                id: "g0001",
                fill: "#d5d0cc",
                "fill-rule": "",
                stroke: "",
                "stroke-width": "3"
            },
            path: {
                0: {
                    $: {
                        id: "path8972",
                        d: "m1407.4 1304.6-39.082 11.309 12.957 45.941-13.758 22.904 3.5898 3.2597-18.281 25.885 143.09 93.543 73.606 48.029 73.826-114.23-127.43-83.354-32.883-21.436-23.256-15.068-13.127 20.686-12.957 3.4707-3.5898-3.8906-12.998-.6191zm68.457 65.648 36.512 23.455 3.08 16.797 15.916-3.2598 24.436 15.746-1.2695 8.959-8.8985 11.867-19.625 31.914-8.1093 6.8086-24.436-17.426-3.7187-15.057-15.566 2.3594-17.607-10.619-2.3984 1.1114-13.719-9.709-1.8593-2.4297-1.7793-3.75-.92-3.6094-.3398-4.998 29.375-44.072 2.3184-1.6582 2.83-1.25z"
                    }
                }
            }
        }
    }
};

/*
    svg children:
        1. $        , no children
        2. desc     , useless (i think so, maybe not)
        3. g        , root of group hierarchy

    group children:
        1. $
        2. array of path
 */

// attributes are hidden in the TreeView, instead displayed in the DataView
trees.diy_1b = {
    svg9526: {
        $: {},          // hidden
        g0001: {
            $: {},      // hidden
            path8972: {
                $: {}
            }
        }
    }
};


const parseSVG = (svg) => {
    if (svg.$ && svg.$ instanceof Object) {
        let id = svg.$.id;
        if (id && typeof id === "string") {
            
        }
    }
};

const parseGroup = (g) => {
};

const parsePath = (p) => {
};

// create ObjectTree
let objTree1 =  new ObjectTree(trees.file1);
// objTree1.traverse(NodePrinter);
// console.log("");

// parseSVG();

const onSelect = (elem) => {
    if (elem.parentElement) {
        let data = elem.parentElement.data;
        if (typeof data !== "object") {
            console.log(`TreeView: ${elem.innerText} -> ${JSON.stringify(data)}`);
        } else {
            console.log(`TreeView: ${elem.innerText}`);
        }
    }
};

DOM([ 
    SplitView({ 
        children: [
            TreeView({ json: trees.file1, onSelect }),
            TreeView({ json: trees.file2, onSelect })
        ],
        style: { "min-height": "220px" }
    })
]);

//=============================================================================
// HMR
if (module.hot) {
    module.hot.accept();
}
