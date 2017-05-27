/* TODO
fix: click on an item w/o icon leads to display of collapsed icon
fix: over state has to be cleared after dragging an item into another
feature: write a collapsable Code component
*/

import { Img, P } from "../DOM/Elements";
import Code from "../DOM/Code";
import EditorSVG from "../DOM/EditorSVG";
import TreeView from "../DOM/TreeView";
import CollapsableSection from "../DOM/CollapsableSection";

// styles
import styles from "./TreeViewDemo.less"

// some json data for the tree
import { human, data1, afterfx } from "../Test/TreeViewTestData";

// raw import
import svgScrollView from "!raw-loader!../../www/ScrollView_opt.svg";
import svgEberswalder from "!raw-loader!../../www/Eberswalder5.svg";
import srcEditorSVG from "!raw-loader!../DOM/EditorSVG";
import srcTreeView from "!raw-loader!../DOM/TreeView";
import { text1, text1a, text1b, text1c, text1d, text2, text3 } from "./TreeViewDemoDoc";

const note1 = "On the left you can see the raw format of nodes that came out of the \
            conversion from XML to SVG via xml2js. On the right the SVG content is directly \
            inserted into the DOM as innerHTML of the SplitViews right panel, which leads to \
            a nice display of pathes. Node: try to click on them! Next version will have a \
            toolbar and and a status bar component."

const svgns = "http://www.w3.org/2000/svg";

const structure = {
    Tab: {
        CollapsableSection1: {
            P: "Text",
            SplitView: {
                TreeView: "JSON Data",
                Div: "innerHTML = raw XML of SVG file"
            }
        },
        CollapsableSection2: {
            P: "Presentation of a TreeView component inside an Editor",
            P1: "Text",
            P2: "Text",
            Pn: "Text",
        },
        CollapsableSection3: {
            Code: "Highlighted code of SVG-XML"
        },
        CollapsableSection4: {
            Code: "Highlighted code of EditorSVG.js"
        },
        CollapsableSection5: {
            Code: "Highlighted code of TreeView.js"
        },
        CollapsableSection6: {
            TreeView: "src is a JS object literal"
        }
    }
};

const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        CollapsableSection({
            isInitiallyClosed: false,
            title: "The editor in early alpha stage",
            children: [
                P({ class: styles.p1, innerText: note1 }),
                EditorSVG({ src: svgEberswalder }),
            ]
        }),
        CollapsableSection({
            isInitiallyClosed: true,
            title: text1,
            children: [
                P({ class: styles.p1, innerText: text1a }),
                P({ class: styles.p1, innerText: text1b }),
                P({ class: styles.p1, innerText: text1c }),
                P({ class: styles.p1, innerText: text1d }),
            ]
        }),
        CollapsableSection({
            isInitiallyClosed: true,
            title: text2,
            children: [
                Code({ class: styles.code, src: svgEberswalder, srcType: 'js', style: { 'height': '300px' } }),
            ]
        }),
        CollapsableSection({
            isInitiallyClosed: true,
            title: "Source code of the Editor Component: EditorSVG.js",
            children: [
                Code({ class: styles.code, src: srcEditorSVG, srcType: 'js', style: { 'height': '300px' } }),
            ]
        }),
        CollapsableSection({
            isInitiallyClosed: true,
            title: "Source code of the TreeView Component: TreeView.js",
            children: [
                Code({ class: styles.code, src: srcTreeView, srcType: 'js', style: { 'height': '300px' } }),
            ]
        }),
        CollapsableSection({
            isInitiallyClosed: true,
            title: "Structure of this Tab as a Tree",
            children: [
                P({ class: styles.p1, innerText: "Each node represents a component." }),
                TreeView({ 
                    json: structure,
                    onLabel: node => {
                        return node.id + (node.hasChildren ? "" : ": " + node.data);
                    }
                }),
            ]
        }),
    ];

    //let svgDocument = document.getElementsByTagNameNS(null, "svg");
    let svgDocument = document.getElementsByTagNameNS(svgns, "svg");

    return self;
};

export default _Create;

