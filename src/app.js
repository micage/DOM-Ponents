import "style-loader!css-loader!normalize.css";
import styles from "./app.less";
import ScrollView from "./DOM/ScrollView";
import ScrollBar from "./DOM/ScrollBar";
import LabeledValueSlider from "./DOM/LabeledValueSlider";
import TabView from "./DOM/TabView";
import Tab from "./DOM/Tab";
import Code from "./DOM/Code";
import SplitView from "./DOM/SplitView";
import { Div, Img, A, P, Pre, Span } from "./DOM/Elements";

// import some text files
import AppInfoText from "raw-loader!../texts/AppInfo.html";
import text_01 from "raw-loader!../texts/text_01.html";
import app_src0 from "!raw-loader!./app.js";
import app_src1 from "!raw-loader!./DOM/ScrollView.js";
import app_src2 from "!raw-loader!./DOM/LabeledValueSlider.js";

//=============================================================================
let code = "Tab({ title: 'ScrollBar Demo', children:[ \n\
    P({ innerText: 'Mainboard Configuration', children: [ \n\
        LabeledValueSlider({ class: styles.lvSlider, labelText: 'Core Voltage', min: 1.0, max: 1.4, val: 1.1, units: 'V' }), \n\
        LabeledValueSlider({ class: styles.lvSlider, labelText: 'RAM Voltage', min: 1.8, max: 2.5, val: 2.0, units: 'V' }) \n\
    ], style: { 'margin': '8px 20px 0px', 'line-height': '20px' } }), \n\
    P({ innerText:'Source for this Tab'}), \n\
    Code({ src: code, srcType: 'js', class: styles.code }), \n\
    P({ innerText:'Source for the LabeledValueSlider'}), \n\
    Code({ src: app_src2, srcType: 'js', class: styles.code }), \n\
]})";

let root = Div({ id: 'app', class: styles.app + ' clearfix', children: [
    Div({ id: 'header', class: styles.header, children: [
        Div({ class: styles.title, innerText: 'Taming the DOM with Web(pack)-Components', children: [
            P({ innerText: 'A new approach to make web development easy. Or at least easier.', style: {'font-size': '12pt'} })
        ] }),
    ]}),
    Div({ id: 'content', class: styles.content + ' clearfix', children: [
        TabView({ class: styles.TabView, children:[
            Tab({ buttonText: 'App.js', id: 'appInfo', test: 'test', children:[
                P({ innerText: 'App.js' }),
                P({ innerHTML: AppInfoText }),
                Code({ src: app_src0, srcType: 'js', class: styles.code, style: { 'height': '400px' } })
            ]}),
            Tab({ buttonText: 'ScrollView Demo', children:[
                P({ innerText: 'ScrollView.js' }),
                Div({ class: styles.scrollViewBox, children: [
                    Div({ class: styles.svBox, children: [
                            ScrollView({ id: 'sv1', class: styles.ScrollView,
                                options: { scrollX: 0.0, scrollY: 0.0 },
                                children: [
                                    Div({ class: styles.inner, innerHTML: text_01 }),
                                    Div({ class: styles.inner, innerHTML: text_01 })
                            ]}),
                            P({ innerText: 'lengthy text' }),
                        ]}),
                    Div({ class: styles.svBox, children: [
                            ScrollView({ id: 'sv2', class: styles.ScrollView,
                                options: { scrollX: 0.9, scrollY: 0.7 }, children: [
                                    Img({ src: './Desert.jpeg' })
                                    // Img({ src: './Arizona_free.jpeg' })
                                    // Img({ src: 'https://unsplash.it/800/500/?random' })
                            ]}),
                            P({ innerText: 'picture of an oasis' }),
                        ]}),
                    Div({ class: styles.svBox, children: [
                            ScrollView({ id: 'sv3', class: styles.ScrollView, options: { scrollX: 0.68, scrollY: 0.425 }, children: [
                                Img({ class: styles.svg, src: './color-wheel.svg' })
                            ]}),
                            P({ innerText: 'SVG graphic' }),
                        ]}),
                    Div({ class: styles.svBox, children: [
                            ScrollView({ id: 'sv3', class: styles.ScrollView, options: { scrollX: 0.68, scrollY: 0.425 }, children: [
                                Img({ class: styles.svg, src: './color-wheel.svg' })
                            ]}),
                            P({ innerText: 'SVG graphic' }),
                        ]}),
                    Div({ class: styles.svBox, children: [
                            ScrollView({ id: 'sv3', class: styles.ScrollView, options: { scrollX: 0.68, scrollY: 0.425 }, children: [
                                Img({ class: styles.svg, src: './color-wheel.svg' })
                            ]}),
                            P({ innerText: 'SVG graphic' }),
                        ]}),
                    Div({ class: styles.svBox, children: [
                            ScrollView({ id: 'sv3', class: styles.ScrollView, options: { scrollX: 0.68, scrollY: 0.425 }, children: [
                                Img({ class: styles.svg, src: './color-wheel.svg' })
                            ]}),
                            P({ innerText: 'SVG graphic' }),
                        ]}),
                ]}),
                Code({ class: styles.code, src: app_src1, srcType: 'js', style: { 'height': '200px' } })
            ]}),
            Tab({ buttonText: 'LabeledValueSlider Demo', children:[
                P({ innerText: 'Some LabeledValueSlider in action' }),
                Div({ id: 'sliderGroup', class: '', children: [
                    P({ children: [
                        LabeledValueSlider({ class: styles.lvSlider, labelText: 'View Angle', min: -180, max: 180, val: 3.0, units: '°' }),
                        LabeledValueSlider({ class: styles.lvSlider, labelText: 'Field Of View', min: 20, max: 90, val: 45.0, units: '°' }),
                    ], style: { 'margin-top': '8px'} }),
                    P({ children: [
                        LabeledValueSlider({ class: styles.lvSlider, labelText: 'Earth', min: -80, max: 60, val: 12.6, units: '℃' }),
                        LabeledValueSlider({ class: styles.lvSlider, labelText: 'Mars', min: -120, max: 120, val: 52.6, units: '℃' }),
                    ], style: { 'margin-top': '8px'} }),
                    P({ children: [
                        LabeledValueSlider({ class: styles.lvSlider, labelText: 'Core Voltage', min: 1.0, max: 1.4, val: 1.1, units: 'V' }),
                        LabeledValueSlider({ class: styles.lvSlider, labelText: 'RAM Voltage', min: 1.8, max: 2.5, val: 2.0, units: 'V' })
                    ], style: { 'margin-top': '8px'} })
                ]}),
                Code({ src: app_src2, srcType: 'js', class: styles.code })
            ]}),
            Tab({ buttonText: 'ScrollBar Demo', children:[
                P({ innerText: 'Mainboard Configuration', children: [
                    LabeledValueSlider({ class: styles.lvSlider, labelText: 'Core Voltage', min: 1.0, max: 1.4, val: 1.1, units: 'V' }),
                    LabeledValueSlider({ class: styles.lvSlider, labelText: 'RAM Voltage', min: 1.8, max: 2.5, val: 2.0, units: 'V' })
                ], style: { 'margin-bottom': '18px', 'line-height': '20px' } }),
                P({ innerText:'Source for this Tab'}),
                Code({ src: code, srcType: 'js', class: styles.code }),
                P({ innerText:'Source for the LabeledValueSlider'}),
                Code({ src: app_src2, srcType: 'js', class: styles.code }),
            ]}),
            Tab({ buttonText: 'SplitView Demo native', id: 'SplitViewNative', class: styles.SplitViewNative + ' clearfix', children:[
                P({ innerText: 'SplitView (native, horizontal)' }),
                SplitView({ horizontal: true, children: [
                    Code({ src: app_src1, srcType: 'js', class: styles.code }),
                    Code({ src: app_src2, srcType: 'js', class: styles.code })
                ]}),
            ]}),
            Tab({ buttonText: 'SplitView Demo', children:[
                P({ innerText: 'SplitView (horizontal)' }),
                SplitView({ horizontal: true, children: [
                    ScrollView({ class: styles.abcde, options: { scrollX: 0.0, scrollY: 0.0 }, children: [
                        Code({ src: app_src1, srcType: 'js', class: styles.code }),
                    ]}),
                    ScrollView({ class: styles.abcde, options: { scrollX: 0.0, scrollY: 0.0 }, children: [
                        Code({ src: app_src1, srcType: 'js', class: styles.code }),
                    ]}),
                ]}),
            ]}),
            Tab({ buttonText: 'SplitView v', children:[
                P({ innerText: 'SplitView (vertical)' }),
                SplitView({ horizontal: false, children: [
                    ScrollView({ class: styles.abcde, options: { scrollX: 0.0, scrollY: 0.0 }, children: [
                        Code({ src: app_src1, srcType: 'js', class: styles.code }),
                    ]}),
                    ScrollView({ class: styles.abcde, options: { scrollX: 0.0, scrollY: 0.0 }, children: [
                        Code({ src: app_src1, srcType: 'js', class: styles.code }),
                    ]}),
                ]}),
            ]}),
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
        document.location = document.location; // reload page
    });
}
