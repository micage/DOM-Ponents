import * as __ from "../Util/ParamCheck";
import { ObservableValue, ObservableRangedValue } from "../Structures/Observable";

import SplitView from "../DOM/SplitView.1";
import TreeView from "../DOM/TreeView";
import * as DOM from "../DOM/Elements";
import ButtonBar from "../DOM/ButtonBar";
import Button from "../DOM/Button";
import CollapsableSection from "../DOM/CollapsableSection";
import ScrollBar from "../DOM/ScrollBar";
import ObservablesTest from "./ObservablesTest";

import { parseSVG } from "../SVG/SVGConverter";

// @ts-ignore
import svgPath1 from "!raw-loader!../../assets/svg/Path1.svg";
// @ts-ignore
import svgCircle from "!raw-loader!../../assets/svg/Circle.svg";
// @ts-ignore
import svgScrollView from "!raw-loader!../../www/ScrollView.svg";
// @ts-ignore
import svgEberswalder from "!raw-loader!../../www/Eberswalder9_opt2.svg";

// @ts-ignore
import styles from "./TreeConverterDemo.less";

/* TODO:
treeView.select: send the TreeView a message -> trigger(tv, "mgSelect", strLabel)
*/
const FILE = "TreeConverterDemo";

let args = {
    magicNumber: 0, // hack
    zoomStartValue: 2,
    zoomMinValue: 1,
    zoomMaxValue: 10,
    step: .1,
    mmmTree: null, // hack !!!! TODO: vanish
};

let ids = {
    btnMinus: DOM.genId(),
    btnPlus: DOM.genId(),
};

// used Elements
let ctrls = {
    treeView: null,
    mapView: null,
    svg: null,
    btnMinus: null,    
    btnPlus: null,    
    sbZoom: null,
    editZoom: null,
    stSelect: null, // static text, full path of selected SVGElement
    st2: null,
};

// observables
let obs = {
    zoom: new ObservableRangedValue(0, args.zoomMinValue, args.zoomMaxValue),
    selPath: new ObservableValue(null),
};

obs.zoom.addListener(function(val) {
    // console.log(`val: ${val}`);
    ctrls.editZoom.value = this.value.toFixed(2);
    DOM.trigger(ctrls.sbZoom, "mgScrollTo", this.getRatio());

    ctrls.svg.style.transform = `scale(${this.value})`;
});

// what to process, unprocessed nodes are attached to parent node.attr
const doNode = (node) => node.id !== "attr";

ctrls.treeView = TreeView({
    json: parseSVG(svgEberswalder),
    doNode,
    onSelect: function (label) {
        args.mmmTree = this; // get the tree inside the TreeView component
        let path = document.getElementById(label.innerText);
        if (path) {
            let r = Math.floor(Math.random() * 360);
            path.style.fill = "hsl(" + r + ", 90%, 70%)";

            // hack, should only change observables
            ctrls.stSelect.innerText = args.mmmTree.fullPathOfSelection;
        }
    }
});

ctrls.mapView = DOM.Div({
    innerHTML: svgEberswalder,
    listenTo: {
        "mgMount": function (ev) {
            console.log(`${FILE} ${ev.type} ${ev.target.className}`);

            ctrls.svg = ctrls.mapView.getElementsByTagName("svg")[0];
            ctrls.svg.style.width = ctrls.mapView.offsetWidth + "px";
            args.magicNumber = ctrls.svg.viewBox.baseVal.width / ctrls.mapView.offsetWidth;

            // first change of zoom
            obs.zoom.value = args.zoomStartValue;

            ctrls.svg.onmousedown = (ev) => {
                let mouseX = ev.clientX;
                let mouseY = ev.clientY;
                if (ev.button === 1) {
                    window.onmousemove = (ev) => {
                        let deltaX = ev.clientX - mouseX;
                        let deltaY = ev.clientY - mouseY;
                        // console.log(`mm: ${ev.clientX - ddd.view.offsetLeft}, ${ev.clientY - ddd.view.offsetTop}`);
                        // console.log(`mm: ${deltaX}, ${deltaY}`);

                        let viewBox = ctrls.svg.viewBox.baseVal;

                        // hack, should only change observables
                        viewBox.x -= deltaX / obs.zoom.value * args.magicNumber;
                        viewBox.y -= deltaY / obs.zoom.value * args.magicNumber;

                        mouseX = ev.clientX;
                        mouseY = ev.clientY;

                        window.onmouseup = (ev) => {
                            window.onmousemove = old.mm;
                        }

                        // hack, should only change observables
                        ctrls.stSelect.innerText = `x: ${viewBox.x.toFixed()} y: ${viewBox.y.toFixed()} w: ${viewBox.width.toFixed()} h: ${viewBox.height.toFixed()}`;
                    }
                }
            };
        },
        "click": (ev) => {
            let path = ev.target;
            let hue = Math.floor(Math.random() * 360);
            path.style.fill = `hsl(${hue}, 50%, 70%)`;
            if (path.id) {
                console.log("map clicked: " + path.id);

                // selects and scrolls selected tree item into sight
                // hack, send mesg instead
                args.mmmTree.select(path.id, ctrls.treeView); 
            }
            else {
                console.log('Path has no id.');
            }
        }
    }
    
});
// after svg-XML set as innerHTML of ctrls.mapView

let old = {
    mm: window.onmousemove
};

ctrls.mapView.onwheel = ev => {
    ev.preventDefault();
    console.log('wheel: ' + ev);
    obs.zoom.value *= (ev.wheelDelta > 0 ? 1 + args.step : 1 - args.step);
    return false; // important, otherwise window is scrolled too
};

const onZoomButtonClick = (ev) => {
    switch (ev.target) {
        case ctrls.btnPlus: obs.zoom.value *= (1 + args.step); break;
        case ctrls.btnMinus: obs.zoom.value *= (1 - args.step); break;
        default: (x) => {}
    }
};

/** @type {HTMLElement} app */
let app = DOM.Div({
    id: "app", 
    children: [
/*        
        CollapsableSection({
            style: { "display": "none" },
            title: "Cirlce.svg, left: source, right: converted",
            // isInitiallyClosed: true,
            children: [
                SplitView({
                    children: [
                        TreeView({ json: parseSVG(svgCircle), onSelect }),
                    ],
                    style: { "min-height": "160px", "font-family": "sans-serif" }
                })
            ]
        }),
*/
/*
*/
        CollapsableSection({
            // isInitiallyClosed: true,
            class: styles.csection,
            title: "Area around Eberswalder Str, left: source, right: converted",
            children: [
                ButtonBar({
                    class: styles.toolBar,
                    children: [
                        ctrls.btnMinus = DOM.Div({
                            innerText: "-",
                            class: styles.button,
                            listenTo: {
                                "click": onZoomButtonClick
                            }
                        }),
                        ctrls.btnPlus = DOM.Div({
                            innerText: "+",
                            class: styles.button,
                            listenTo: {
                                "click": onZoomButtonClick
                            }
                        }),
                        ctrls.sbZoom = ScrollBar({
                            class: styles.scrollBar,
                            listenTo: {
                                "mgRatio": (ev) => {
                                    obs.zoom.setFromRatio(ev.detail);
                                }
                            }
                        }),
                        ctrls.editZoom = DOM.Input({
                            class: [styles.ctrlText, styles.l050].join(" "),
                            value: args.zoomStartValue,
                            min: args.zoomMinValue,
                            max: args.zoomMaxValue,
                        }),
                    ]
                }),
                SplitView({
                    class: styles.splitView,
                    ratio: .2,
                    children: [ ctrls.treeView, ctrls.mapView ]
                }),
                ButtonBar({
                    class: styles.toolBar,
                    children: [
                        ctrls.stSelect = DOM.Div({
                            innerText: "test1",
                            class: styles.ctrlText + " " + styles.full,
                        }),
                        ctrls.st2 = DOM.Div({
                            innerText: "test2",
                            class: styles.ctrlText + " " + styles.l100,
                        }),
                    ]
                })
            ]
        }),
        CollapsableSection({
            title: "Test Observables",
            class: styles.csection,
            children: ObservablesTest()
        })
    ]
})

DOM.App(app);

//=============================================================================
// HMR
if (module.hot) {
    module.hot.accept(
        [ module.i ],
        function(v) {
            console.log('module.hot.accept'); debugger;
        }
    );
    module.hot.dispose(() => {
        document.body.removeChild(app);
    });
}
var xxx = './Demo/TreeConverterDemo.js';
var yyy = 2;