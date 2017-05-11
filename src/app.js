let ua = navigator.userAgent;
console.log(`ua: ${ua}`);

import "normalize.css";
import styles from "./app.less";
// import ScrollView from "./DOM/ScrollView";
import ScrollBar from "./DOM/ScrollBar";
// import LabeledValueSlider from "./DOM/LabeledValueSlider";
// import LabeledValueSliderV from "./DOM/LabeledValueSliderV";
import TabView from "./DOM/TabView";
import Tab from "./DOM/Tab";
import Code from "./DOM/Code";
import SplitView from "./DOM/SplitView";
// import EditorSVG from "./DOM/EditorSVG";
import { Div, Img, A, P, Pre, Span } from "./DOM/Elements";

// import some text files
import AppInfoText from "raw-loader!./Demo/texts/AppInfo.html";
import text_01 from "raw-loader!./Demo/texts/text_01.html";
import app_src0 from "!raw-loader!./app.js";
import app_src1 from "!raw-loader!./DOM/ScrollView.js";
import app_src2 from "!raw-loader!./DOM/LabeledValueSlider.js";

// demo components
import ScrollViewDemo from "./Demo/ScrollViewDemo";
import IntroDemo from "./Demo/IntroDemo";
import VSliderDemo from "./Demo/VSliderDemo";
import HSliderDemo from "./Demo/HSliderDemo";
import TreeViewDemo from "./Demo/TreeViewDemo";
import SplitViewNativeDemo from "./Demo/SplitViewNativeDemo";
import SVGCreatorDemo from "./Demo/SVGCreatorDemo";
import CustomElementsDemo from "./Demo/CustomElementsDemo";
import CollapsablesDemo from "./Demo/CollapsablesDemo";

/* TODO:
    - TreeView:
        onselect show something in the dataview
        make drag and drop optional
        bug: hover highlight sometimes sticks on an item
        make label editable

    - ScrollView:
        improve default style
        make bar size proportional to visible/complete content

    - SplitView:
        if min-width is reached disable onratio

*/

//=============================================================================
// the DOM
let root = Div({ id: 'app', class: styles.app, children: [
    Div({ id: 'header', class: styles.header, children: [
        Div({ class: styles.title, innerText: 'Taming the DOM with Web(pack)-Components', children: [
            P({ innerText: 'Yet another approach to make web development easy. Or at least easier.', style: {'font-size': '12pt'} })
        ] }),
    ]}),
    Div({ id: 'content', class: styles.content + ' clearfix', children: [
        TabView({ class: styles.TabView, children:[
             // no arguments for the demo components, they are unique!
            Tab({
                id: 'ScrollView',
                buttonText: 'ScrollView Demo',
                children: ScrollViewDemo()
            }),
            Tab({
                id: 'Horizontal Slider', 
                buttonText: 'Horizontal Sliders', 
                children: HSliderDemo()
            }),
            Tab({
                id: 'Vertical Slider', 
                buttonText: 'Vertical Sliders', 
                children: VSliderDemo()
            }),
            Tab({
                id: 'TreeView', 
                buttonText: 'TreeView',
                children: TreeViewDemo()
            }),
            // Tab({
            //     id: 'TreeViewDemo2', 
            //     buttonText: 'TreeView 2',
            //     children: TreeViewDemo()
            // }),
            Tab({
                id: 'SplitViewNativeDemo_new', 
                buttonText: 'SplitView',
                children: SplitViewNativeDemo()
            }),
            // Tab({ id: 'SplitViewNativeDemo', 
            //     buttonText: 'SplitView 1', 
            //     class: styles.SplitViewNative + ' clearfix', 
            //     children:[
            //     P({ innerText: 'SplitView (native scrollbars, horizontal)' }),
            //     SplitView({ horizontal: true, children: [
            //         Code({ src: app_src1, srcType: 'js', class: styles.code }),
            //         Code({ src: app_src2, srcType: 'js', class: styles.code })
            //     ]}),
            // ]}),
            // Tab({
            //     buttonText: 'Dynamic SVG', 
            //     children: SVGCreatorDemo()
            // }),
            // Tab({
            //     buttonText: 'Custom Elements',
            //     children: CustomElementsDemo()
            // }),
            Tab({
                buttonText: 'Collapsables',
                children: CollapsablesDemo()
            }),
            // Tab({
            //     id: 'IntroDemo',
            //     buttonText: 'Component Manifest',
            //     children: IntroDemo()
            // }),
           // Tab({ id: 'SplitView2Demo', 
            //     buttonText: 'SplitView 2', 
            //     children:[
            //     P({ innerText: 'SplitView (horizontal)' }),
            //     SplitView({ horizontal: true, children: [
            //         ScrollView({ class: styles.abcde, options: { scrollX: 0.0, scrollY: 0.0 }, children: [
            //             Code({ src: app_src1, srcType: 'js', class: styles.code }),
            //         ]}),
            //         ScrollView({ class: styles.abcde, options: { scrollX: 0.0, scrollY: 0.0 }, children: [
            //             Code({ src: app_src1, srcType: 'js', class: styles.code }),
            //         ]}),
            //     ]}),
            // ]}),
            // Tab({ id: 'SplitView3Demo', 
            //     buttonText: 'SplitView 3', 
            //     children: [
            //     P({ innerText: 'SplitView (vertical)' }),
            //     SplitView({ horizontal: false, children: [
            //         ScrollView({ class: styles.abcde, options: { scrollX: 0.0, scrollY: 0.0 }, children: [
            //             Code({ src: app_src1, srcType: 'js', class: styles.code }),
            //         ]}),
            //         ScrollView({ class: styles.abcde, options: { scrollX: 0.0, scrollY: 0.0 }, children: [
            //             Code({ src: app_src1, srcType: 'js', class: styles.code }),
            //         ]}),
            //     ]}),
            // ]}),
        ]}),
    ]}),
    Div({ id: 'footer', class: styles.footer + ' ' + styles.footer1, children: [
        A({ id: 'a-link-footer', href: 'http://micage.bplaced.net/web-components', text: 'live demo'})
    ]}),
]});

document.body.appendChild(root);

//=============================================================================
// set by webpack define plugin
console.log("\n" + "NODE_ENV: " + process.env.NODE_ENV + "\n");
console.log("DEBUG: " + __DEBUG__ + "\n");
console.log('jQuery included: ' + (typeof $ === 'function' ? "true" : "false"));

//=============================================================================
// HMR
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        //document.body.remove(root);
        //document.location = document.location; // reload page
    });
}
