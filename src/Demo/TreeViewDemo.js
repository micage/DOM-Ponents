/* TODO
fix: click on an item w/o icon leads to display of collapsed icon
fix: over state has to be cleared after dragging an item into another
feature: write a collapsable Code component
*/

import { Img, P } from "../DOM/Elements";
import Code from "../DOM/Code";
import EditorSVG from "../DOM/EditorSVG";

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
        P({ innerText: text1 }),
        P({ innerText: text1a }),
        P({ innerText: text1b }),
        P({ innerText: text1c }),
        P({ innerText: text1d }),
        EditorSVG({ src: svg_Eberswalder }),
        P({ innerText: text2 }),
        Code({ class: styles.code, src: svg_Eberswalder, srcType: 'js', style: { 'height': '300px' } }),
        P({ innerText: text3 }),
        Code({ class: styles.code, src: srcEditorSVG, srcType: 'js', style: { 'height': '300px' } }),
        // Img({ class: styles.svgImage, src: "Eberswalder5.svg" })
    ];

    self.Type = "TreeViewDemo";

    //let svgDocument = document.getElementsByTagNameNS(null, "svg");
    let svgDocument = document.getElementsByTagNameNS(svgns, "svg");

    return self;
};

export default _Create;

