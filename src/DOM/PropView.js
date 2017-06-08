import * as __ from "../Util/ParamCheck";
import * as Obs from "../Structures/Observable";

import TreeView from "../DOM/TreeView";
import * as DOM from "../DOM/Elements";

// @ts-ignore
import styles from "./PropView.less";

// split svg segments
// path.getAttribute("d").split(/(?=[SsHhVvLlMmCc])/)

const Create = (args) => {
    const onMount = (ev) => {
        let self = ev.target;

        // call user args.listenTo.mgMount
        if (__.checkObject(args)) {
            if (__.checkObject(args.listenTo)) {
                if (__.checkFunction(args.listenTo.mgMount)) {
                    args.listenTo.mgMount();
                }
            }
        }

    };

    args.children = [
        DOM.Span({ innerText: args.title, class: styles.title })
    ];

    // create a view for each obs acccording to its type
    Object.keys(args.props).forEach((k) => {
        let prop = args.props[k];

        let intProp = parseInt(prop);
        let view;
        let boolProp = prop === "true";

        if (isNaN(intProp)) {
            let boolVal = prop === "true" ? true : (prop === "false" ? false : undefined);
            if (boolVal !== undefined) {
                view = DOM.Input({
                    type: "checkbox", value: boolVal, class: styles.value,
                    listenTo: {
                        change: () => {
                            // TODO: change node data -> change svg
                        }
                    }
                });
            }
            else {
                view = prop.length > 5000 ?
                    DOM.TextArea({
                        value: prop, class: styles.value
                    }) :
                    DOM.Input({
                        type: "text", value: prop, class: styles.value
                    });
            }

        }
        else { // its a number
            if (intProp !== parseFloat(prop)) {
            }
            view = DOM.Input({
                type: "number", value: prop, class: styles.value
            });
        }

        args.children.push(DOM.Div({
            class: styles.prop,
            children: [
                DOM.Span({ class: styles.label, innerText: k }),
                view
            ]
        }));
    });
    delete args.props;

    args.class = [styles.self, args.class].join(" ");

    let self = DOM.Div(args);

    return self;
}

export default Create;
