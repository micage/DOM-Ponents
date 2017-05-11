/* TODO
fix: click on an item w/o icon leads to display of collapsed icon
fix: over state has to be cleared after dragging an item into another
feature: write a collapsable Code component
*/

import { Img, P } from "../DOM/Elements";
import Code from "../DOM/Code";
import EditorSVG from "../DOM/EditorSVG";
import CollapsableSection from "../DOM/CollapsableSection";

// styles
import styles from "./TreeViewDemo.less"

// some json data for the tree
import { human, data1, afterfx } from "../Test/TreeViewTestData";

// raw import
import svg_ScrollView from "!raw-loader!../../www/ScrollView_opt.svg";
import svg_Eberswalder from "!raw-loader!../../www/Eberswalder5.svg";
import srcEditorSVG from "!raw-loader!../DOM/EditorSVG";
import { text1, text1a, text1b, text1c, text1d, text2, text3 } from "./TreeViewDemoDoc";

const svgns = "http://www.w3.org/2000/svg";

const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        CollapsableSection({
            initiallyClosed: false,
            title: "The editor in early alpha stage",
            children: [
                P({ class: styles.p1, innerText: "On the left you can see the raw format of nodes that came out of the conversion from XML to SVG via xml2js. On the right the SVG content is directly inserted into the DOM as innerHTML of the SplitViews right panel, which leads to a nice display of pathes. Node: try to click on them! Next version will have a toolbar and and a status bar component." }),
                EditorSVG({ src: svg_Eberswalder }),
            ]
        }),
        CollapsableSection({
            initiallyClosed: true,
            title: text1,
            children: [
                P({ class: styles.p1, innerText: text1a }),
                P({ class: styles.p1, innerText: text1b }),
                P({ class: styles.p1, innerText: text1c }),
                P({ class: styles.p1, innerText: text1d }),
            ]
        }),
        CollapsableSection({
            initiallyClosed: true,
            title: text2,
            children: [
                Code({ class: styles.code, src: svg_Eberswalder, srcType: 'js', style: { 'height': '300px' } }),
            ]
        }),
        CollapsableSection({
            initiallyClosed: true,
            title: text3,
            children: [
                Code({ class: styles.code, src: svg_Eberswalder, srcType: 'js', style: { 'height': '300px' } }),
            ]
        }),
    ];

    self.Type = "TreeViewDemo";

    //let svgDocument = document.getElementsByTagNameNS(null, "svg");
    let svgDocument = document.getElementsByTagNameNS(svgns, "svg");

    return self;
};

export default _Create;

