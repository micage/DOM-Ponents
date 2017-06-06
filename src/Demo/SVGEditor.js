import * as __ from "../Util/ParamCheck";
import { ObservableValue, ObservableRangedValue } from "../Structures/Observable";

import SplitView from "../DOM/SplitView.1";
import TreeView from "../DOM/TreeView";
import * as DOM from "../DOM/Elements";
import ButtonBar from "../DOM/ButtonBar";
import Button from "../DOM/Button";
import CollapsableSection from "../DOM/CollapsableSection";
import ScrollBar from "../DOM/ScrollBar";
import PropView from "../DOM/PropView";
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
import styles from "./SVGEditor.less";

/* Manifesto
controls are only allowed to change observables

initialize observable: first change to an observable should happen in the 
listenTo.mgMmount function of the root commponent, in this case 'app'

the root component is considered the owner of all observables
=> no child components should initialue an observable, otherwise
*/

/* TODO:
treeView.select: send the TreeView a message -> trigger(tv, "mgSelect", strLabel)
SplitView onRatio: reset zoom center
*/
const FILE = "SVGEditor";

var mySVGIcon = "<svg\
    id='svg39295'\
    version='1.2'\
    viewBox='0 0 24 24'\
    xmlns='http://www.w3.org/2000/svg'>\
    <g>\
        <text x='0' y='24' font-family='Verdana' font-size='14pt'>D</text>\
    </g>\
</svg>";

// pixel to svg length
// svg_X = dom_X * svgBaseScale

let locals = {
    svgBaseScale: 0, // will be set by mapView.onMount
    selSVGElement: null,
    selTreeItem: null,
    zoomStartValue: 1,
    zoomMinValue: 0.5,
    zoomMaxValue: 10,
    step: .1,
    mouseX: 0,
    mouseY: 0,
    viewBoxW_0: 0,
    viewBoxH_0: 0,
};

let ids = {
    btnMinus: DOM.genId(),
    btnPlus: DOM.genId(),
    propView: DOM.genId(),
};

// used Elements
let views = {
    splitView: null,
    treeView: null,
    mapView: null,
    propView: null,
    svg: null,
    btnMinus: null,    
    btnPlus: null,    
    sbZoom: null,
    editZoom: null,
    stSelect: null, // static text, full path of selected SVGElement
    st2: null,
    editViewBoxX: null,
    editViewBoxY: null,
    btnData: DOM.Div({
        style: {
            "background-image": "url:'data:image/svg+xml;utf8," + mySVGIcon + "')"
        },
        class: styles.toggleButton,
        listenTo: {
            "click": (ev) => {
                ev.target.classList.toggle("active");
                obs.editorMode.value = ev.target.classList.contains("active") ? "data" : "map";
            }
        }
    }),
};

// observables
let obs = {
    zoom: new ObservableRangedValue(undefined, locals.zoomMinValue, locals.zoomMaxValue),
    
    viewBoxX: new ObservableValue(),
    viewBoxY: new ObservableValue(),
    viewBoxW: new ObservableValue(),
    viewBoxH: new ObservableValue(),

    selPath: new ObservableValue(),

    editorMode: new ObservableValue(),
};

const onAppMount = () => {
    obs.zoom.value = 1;

    obs.selPath.value = "/";
    
    obs.viewBoxX.value = 0;
    obs.viewBoxY.value = 0;
    obs.viewBoxW.value = 510;
    obs.viewBoxH.value = 500;
};

// each view that has a dependency to zoom, can be updated here
obs.zoom.addListener(function (val) {
    var oldZoom;
    // console.log(`val: ${val}`);
    views.editZoom.value = this.value.toFixed(1);
    DOM.trigger(views.sbZoom, "mgScrollTo", this.getRatio());

     // svg transform center, c = cx = cy, since width and height of this svg are equal
    let c = views.svg.width.baseVal.value * 0.5;
    let vx = views.mapView.clientWidth * 0.5;
    let vy = views.mapView.clientHeight * 0.5;
    
    let s = this.value; // scale factor
    let vb = views.svg.viewBox.baseVal;
    vb.width = locals.viewBoxW_0 / s;
    vb.height = locals.viewBoxH_0 / s;

    let strange = (s - 1) / s;

    views.svg.viewBox.baseVal.x = obs.viewBoxX.value + 590 * strange;
    views.svg.viewBox.baseVal.y = obs.viewBoxY.value + 170 * strange;
});

obs.selPath.addListener( function(pathName) {
    // select tree node    
    DOM.trigger(views.treeView, "mgDoSelect", pathName);

    // replace propView
    let propView = PropView({
        style: {
            "width": views.splitView.children.item(2).clientWidth + "px"
        },
        class: "two",
        title: pathName,
        props: locals.selTreeItem ? locals.selTreeItem.data.attr : {}
    });
    if (obs.editorMode.value === "data") {
        views.splitView.removeChild(views.propView);
        views.splitView.appendChild(propView);
    }
    views.propView = propView;

    locals.selSVGElement = views.svg.getElementById(pathName);
    let path = locals.selSVGElement;
    if (path) {
        let hue = Math.floor(Math.random() * 360);
        path.style.fill = `hsl(${hue}, 50%, 70%)`;
        if (path.id) {
            console.log("map clicked: " + path.id);
            obs.selPath.value = path.id;
        }
        else {
            console.log('Path has no id.');
        }
    }

    views.stSelect.innerText = pathName;
});

obs.viewBoxX.addListener(function (val) {
    let s = obs.zoom.value;
    let vb = views.svg.viewBox.baseVal;
    vb.x = val + 590 * (s - 1) / s;

    views.editViewBoxX.value = val.toFixed(0);
});

obs.viewBoxY.addListener(function (val) {
    let s = obs.zoom.value;
    let vb = views.svg.viewBox.baseVal;
    vb.y = val + 170 * (s - 1) / s;
    
    views.editViewBoxY.value = val.toFixed();
});

obs.editorMode.addListener(function() {
    switch(this.value) {
        case "data":
            views.splitView.removeChild(views.mapView);
            views.splitView.appendChild(views.propView);
        break;

        case "map":
            views.splitView.removeChild(views.propView);
            views.splitView.appendChild(views.mapView);
        break;
    }

    console.log(`editMode: ${this.value}`)
});

//======================================================================


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

//module.exports =
export default
DOM.Div({
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
                        views.btnData,
                    ]
                }),
                views.splitView = SplitView({
                    class: styles.splitView,
                    ratio: .2,
                    children: [
                        views.treeView = TreeView({
                            class: styles.treeView,
                            json: parseSVG(svgEberswalder),
                            doNode: (node) => node.id !== "attr", // process tree node if its id is not "attr"
                            listenTo: {
                                "mgSelect": function(ev) {
                                    let label = ev.detail;
                                    obs.selPath.value = label.innerText;
                                    locals.selTreeItem = label.parentElement;
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
                                    locals.viewBoxW_0 = views.svg.viewBox.baseVal.width;
                                    locals.viewBoxH_0 = views.svg.viewBox.baseVal.height;

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
                                    obs.selPath.value = path.id;
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
        }),
    ],
    listenTo: {
        "mgMount": onAppMount // obs init
    }
})

