
import { ObservableRangedValue } from "../Structures/Observable";

import * as DOM from "../DOM/Elements";
import * as Evt from "../DOM/Events";
import ButtonBar from "../DOM/ButtonBar";
import Button from "../DOM/Button";
import ScrollBar from "../DOM/ScrollBar";
import CollapsableSection from "../DOM/CollapsableSection";

// @ts-ignore
import styles from "./ObservablesTest.less";

const FILE = "ObservablesTest";

let obs = {
    val1: new ObservableRangedValue(0, 0, 100)
};

let ids = {
    btnMinus: DOM.genId(),
    btnPlus: DOM.genId(),
}

let ctrls = {
    btnMinus: null,
    btnPlus: null,
    sbVal: null,
    editVal: null,
    dataView: null
};

obs.val1.addListener(function(value) {
    console.log(`Observable: ${value}`);

    // conversion to range(0, 1)
    Evt.trigger(ctrls.sbVal, Evt.Type.RATIO_DO, this.getRatio());

    let val = Math.floor(value);
    ctrls.editVal.value = val;
    ctrls.dataView.innerText = `${val}`;
});

const msgFunc = function(ev) {
    console.log(`${FILE} ${ev.type} ${ev.target.className}`);
};

const onButtonClick = function (ev) {
    let diff = ev.target.id === ids.btnMinus ? -1 : 1;
    obs.val1.value += diff;
    // msgFunc(ev);
};

const onEditChange = function (ev) {
    obs.val1.value = ev.target.value * 1; // value comes as a string
    // msgFunc(ev);
};

const onMgScroll = function (ev) {
    obs.val1.setFromRatio(ev.detail);
};

// TODO: fix, this will not be called if there is a handler elsewhere
const onScrollBarMount = function (ev) {
    msgFunc(ev);
};

const _Create = () => {
    let self = CollapsableSection({
        title: "Test Observables",
        class: styles.csection,
        children: [
            ButtonBar({
                class: styles.toolBar,
                children: [
                    ctrls.btnMinus = DOM.A({
                        id: ids.btnMinus,
                        innerText: "-",
                        class: styles.button,
                        listenTo: {
                            "click": onButtonClick,
                            "mgMount": msgFunc
                        }
                    }),
                    ctrls.btnPlus = DOM.A({
                        id: ids.btnPlus,
                        innerText: "+",
                        class: styles.button,
                        listenTo: {
                            click: onButtonClick,
                            "mgMount": msgFunc
                        }
                    }),
                    ctrls.sbVal = ScrollBar({
                        id: "Heinz",
                        class: styles.scrollBar,
                        listenTo: {
                            "mgRatio": (ev) => obs.val1.setFromRatio(ev.detail),
                        }
                    }),
                    ctrls.editVal = DOM.Input({
                        class: styles.edit,
                        type: "number",
                        min: 0, max: 100,
                        listenTo: {
                            "change": onEditChange,
                            "mgAppend": msgFunc,
                            "mgMount": msgFunc
                        }
                    })
                ]
            }),
            ctrls.dataView = DOM.Div({
                class: styles.dataView,
            })
        ],
        listenTo: {
            "mgMount": () => {
                // first change of val1, initializes the component data 
                // by calling all listeners
                obs.val1.value = 42;
            }
        }
    });

    return self;
};


export default _Create;