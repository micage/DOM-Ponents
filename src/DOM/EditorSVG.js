import { Div } from "../DOM/Elements";
import TreeView from "./TreeView";
import { parseString } from "xml2js";
import SplitView from "./SplitView";

const _Create = (args) => {
    let payload = Object.assign({}, args);

    const onSelect = (item, itemOld) => {
        if (item && item.parentElement) {
            let text = item.parentElement.data;
            console.log('selected: ' + text);
            view.innerHTML =  text;    
        }
        else {
            view.innerHTML = payload.src;
        }
    };

    if (!payload.src) {
        payload.src = "<svg></svg>";
    }

    parseString(
        payload.src, {
            explicitArray: false,
            validator: (xpath, currentValue, newValue) => {
                return newValue;
            }
        },
        function (err, result) {
            payload.json = result;
            console.dir(result);
        }
    );

    let view = Div({
        innerHTML: payload.src, 
        class: 'dataview',
        onclick: (evt) => {
            let path = evt.target;
            console.log("map clicked: " + path.id);
            let r = Math.floor(Math.random() * 360);
            path.style.fill = "hsl(" + r + ", 90%, 70%)";
        }
    });

    let svgTree = TreeView({ json: payload.json, onSelect: onSelect });

    let self = SplitView({
        horizontal: true, 
        ratio: 0.2, 
        children: [
            svgTree,
            view
        ]
    });

    self.Type = "EditorSVG";

    return self;
};

export default _Create;

