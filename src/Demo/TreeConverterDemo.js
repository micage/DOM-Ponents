import * as __ from "../Util/ParamCheck";
import { ObservableValue, ObservableRangedValue } from "../Structures/Observable";

import SplitView from "../DOM/SplitView.1";
import TreeView from "../DOM/TreeView";
import * as DOM from "../DOM/Elements";
import * as Evt from "../DOM/Events";
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

/* Manifesto
controls are only allowed to change observables

initialize observable: first change to an observable should happen in the 
listenTo.mgMmount function of the root commponent, in this case 'app'

the root component is considered the owner of all observables
=> no child components should initialue an observable, otherwise
*/

/* TODO:
treeView.select: send the TreeView a message -> trigger(tv, "mgSelect", strLabel)
*/
const FILE = "TreeConverterDemo";

let locals = {
    svgBaseScale: 1, // will be set by mapView.onMount
    zoomStartValue: 1,
    zoomMinValue: 1,
    zoomMaxValue: 10,
    step: .1,
    mouseX: 0,
    mouseY: 0,
};

let ids = {
    btnMinus: DOM.genId(),
    btnPlus: DOM.genId(),
};

// used Elements
let views = {
    treeView: null,
    mapView: null,
    svg: null,
    btnMinus: null,    
    btnPlus: null,    
    sbZoom: null,
    editZoom: null,
    stSelect: null, // static text, full path of selected SVGElement
    st2: null,
    editViewBoxX: null,
    editViewBoxY: null,
};

// observables
let obs = {
    zoom: new ObservableRangedValue(undefined, locals.zoomMinValue, locals.zoomMaxValue),
    
    viewBoxX: new ObservableValue(undefined),
    viewBoxY: new ObservableValue(undefined),

    selPath: new ObservableValue(undefined),
};

const onAppMount = () => {
    obs.zoom.setFromRatio(0);

    obs.selPath.value = "/";
    
    obs.viewBoxX.value = 0;
    obs.viewBoxY.value = 0;
};

// each view that has a dependency to zoom, can be updated here
obs.zoom.addListener(function (val) {
    // console.log(`val: ${val}`);
    views.editZoom.value = this.value.toFixed(1);
    Evt.trigger(views.sbZoom, Evt.Type.RATIO_DO, this.getRatio());

     // svg transform center, c = cx = cy, since width and height of this svg are equal
    let c = views.svg.width.baseVal.value * 0.5;

    let vx = views.mapView.clientWidth * 0.5;
    let vy = views.mapView.clientHeight * 0.5;
    
    let s = this.value; // scale factor

    // scale around center of mapView
    let s1 = s - 1;
    let tx = s1 * (c - vx);
    let ty = s1 * (c - vy);
    
    // scale around mouse(x, y)
    // does not work, until keeping track of mouse position all the time
    // mapView.onmouseenter -> mapView.onmousemove
    // this formula, although, is correct
    // let tx = s1 * (c - locals.mouseX);
    // let ty = s1 * (c - locals.mouseY);

    // views.svg.style.transform = `scale(${this.value})`;
    views.svg.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    console.log('transform: ' + views.svg.style.transform);
    
});

obs.selPath.addListener(function (val) {
    Evt.trigger(views.treeView, "mgSelect", val);
    
    // How to get the full path?
    views.stSelect.innerText = val;
});

obs.viewBoxX.addListener(function (val) {
    views.svg.viewBox.baseVal.x = val;
    views.editViewBoxX.value = val.toFixed(0);
});

obs.viewBoxY.addListener(function (val) {
    views.svg.viewBox.baseVal.y = val;
    views.editViewBoxY.value = val.toFixed();
});


const cancelEvent = ev => {
    // cancel event, otherwise window is scrolled too
    ev.stopPropagation();
    ev.preventDefault();
    ev.returnValue = false;
    return false;
}

const onZoomButtonClick = (ev) => {
    switch (ev.target) {
        case views.btnPlus: obs.zoom.value *= (1 + locals.step); break;
        case views.btnMinus: obs.zoom.value *= (1 - locals.step); break;
        default: (x) => {}
    }
};

let app = DOM.Div({
    id: "app", 
    children: [
        CollapsableSection({
            // isInitiallyClosed: true,
            class: styles.csection,
            title: "Area around Eberswalder Str, left: source, right: converted",
            children: [
                ButtonBar({
                    class: styles.toolBar,
                    children: [
                        DOM.Group({
                            class: styles.editValueGroup,
                            children: [
                                views.btnMinus = DOM.Div({
                                    innerText: "-",
                                    class: styles.button,
                                    listenTo: {
                                        "click": onZoomButtonClick
                                    }
                                }),
                                views.btnPlus = DOM.Div({
                                    innerText: "+",
                                    class: styles.button,
                                    listenTo: {
                                        "click": onZoomButtonClick
                                    }
                                }),
                                views.sbZoom = ScrollBar({
                                    class: styles.scrollBar,
                                    listenTo: {
                                        "mgRatio": (ev) => {
                                            obs.zoom.setFromRatio(ev.detail);
                                        }
                                    }
                                }),
                                views.editZoom = DOM.Input({
                                    class: [styles.ctrlText, styles.l050].join(" "),
                                    type: "number",
                                    min: locals.zoomMinValue,
                                    max: locals.zoomMaxValue,
                                    step: locals.step,
                                    listenTo: {
                                        "change": (ev) => obs.zoom.value = ev.target.value * 1
                                    }
                                }),
                            ]
                        }),
                        views.editViewBoxX = DOM.Input({
                            title: "ViewBoxX",
                            class: [styles.ctrlText, styles.l050, styles.tbItem].join(" "),
                            type: "number",
                            listenTo: {
                                "change": (ev) => obs.viewBoxX.value = ev.target.value * 1
                            }
                        }),
                        views.editViewBoxY = DOM.Input({
                            title:"ViewBoxY",
                            class: [styles.ctrlText, styles.l050, styles.tbItem].join(" "),
                            type: "number",                           
                            listenTo: {
                                "input": (ev) => obs.viewBoxY.value = ev.target.value * 1
                            }
                        }),
                    ]
                }),
                SplitView({
                    class: styles.splitView,
                    ratio: .2,
                    children: [
                        views.treeView = TreeView({
                            class: styles.treeView,
                            json: parseSVG(svgEberswalder),
                            doNode: (node) => node.id !== "attr", // process tree node if its id is not "attr"
                            onSelect: function (label) {
                                let path = document.getElementById(label.innerText);
                                if (path) {
                                    let r = Math.floor(Math.random() * 360);
                                    path.style.fill = "hsl(" + r + ", 90%, 70%)";
                                    obs.selPath.value = label.innerText;
                                }
                            }
                        }),
                        views.mapView = DOM.Div({
                            class: styles.mapView,
                            innerHTML: svgEberswalder,
                            listenTo: {
                                "mgMount": function (ev) {
                                    // at this time splitView has not called split, because parents are mounted 
                                    // after their children, so mapView.width = parent.width
                                    views.svg = views.mapView.getElementsByTagName("svg")[0];
                                    views.svg.style.width = views.mapView.clientWidth + "px";

                                    // e.g. 1181/960
                                    locals.svgBaseScale = views.svg.viewBox.baseVal.width / views.mapView.clientWidth;

                                    // pixel to svg length
                                    // svg_X = dom_X * svgBaseScale

                                    views.svg.addEventListener("mousedown", (ev) => {
                                        locals.mouseX = ev.clientX;
                                        locals.mouseY = ev.clientY;

                                        const onMouseMove = (ev) => {
                                            let deltaX = ev.clientX - locals.mouseX;
                                            let deltaY = ev.clientY - locals.mouseY;

                                            obs.viewBoxX.value -= deltaX / obs.zoom.value * locals.svgBaseScale;
                                            obs.viewBoxY.value -= deltaY / obs.zoom.value * locals.svgBaseScale;

                                            locals.mouseX = ev.clientX;
                                            locals.mouseY = ev.clientY;
                                        };
                                        const onMouseUp = (ev) => {
                                            window.removeEventListener("mousemove", onMouseMove);
                                            window.removeEventListener("mouseup", onMouseUp);
                                        };
                                        if (ev.which === 2) { // TODO: make it cross browser
                                            window.addEventListener("mousemove", onMouseMove)
                                            window.addEventListener("mouseup", onMouseUp)
                                        }
                                        
                                        return cancelEvent(ev);                                        
                                    });
                                },
                                "click": (ev) => {
                                    let path = ev.target;
                                    let hue = Math.floor(Math.random() * 360);
                                    path.style.fill = `hsl(${hue}, 50%, 70%)`;
                                    if (path.id) {
                                        console.log("map clicked: " + path.id);
                                        obs.selPath.value = path.id;
                                    }
                                    else {
                                        console.log('Path has no id.');
                                    }
                                },
                                "wheel": (ev) => {
                                    locals.mouseX = ev.offsetX;
                                    locals.mouseY = ev.offsetY;
                                    console.log(`zoom X: ${ev.offsetX} Y:${ev.offsetY}`);                                    

                                    obs.zoom.value *= (ev.deltaY < 0 ? 1 + locals.step : 1 - locals.step);

                                    // cancel event, otherwise window is scrolled too
                                    return cancelEvent(ev);
                                }
                            }
                        })
                    ]
                }),
                ButtonBar({
                    class: styles.toolBar,
                    children: [
                        views.stSelect = DOM.Div({
                            class: [styles.ctrlText, styles.full, styles.tbItem].join(" ")
                        }),
                        views.st2 = DOM.Input({
                            class: [styles.ctrlText, styles.l100, styles.tbItem].join(" ")
                        }),
                    ]
                })
            ],
            listenTo: {
                "mgMount": () => {
                    // first change of zoom
                    obs.zoom.value = locals.zoomStartValue;
                }
            }
        }),
        ObservablesTest() // CollapsableSection
    ],
    listenTo: {
        "mgMount": onAppMount // obs init
    }
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