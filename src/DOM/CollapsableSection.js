// CollapsableSection.js
import * as __ from "../Util/ParamCheck";
import { Div, P, AddClasses } from "./Elements";

// @ts-ignore - next line
import styles from "./CollapsableSection.less"

//==================================================================

const _Create = (args) => {
    if (!__.checkString(args.title)) {
        args.title = "Title is missing.";
    }
    if (!__.checkBoolean(args.isInitiallyClosed)) {
        args.isInitiallyClosed = false;
    }
    if (!__.checkArray(args.children)) {
        args.children = Div({
            innerText: "empty"
        })
    }
    else if (!args.children.length) { // array could be empty

    }

    let header = P({
        class: styles.p,
        innerText: args.title, 
    });
    
    let content = Div({
        class: styles.content,
        children: args.children,
     });

    let self = Div({
        class: styles.csection,
        children: [ header, content ],
        listenTo: args.listenTo
    });
    if (__.checkString(args.class)) AddClasses(self, args.class);

    if (args.isInitiallyClosed) {
        self.classList.toggle('hidden');
    }

    header.onclick = (evt) => {
        self.classList.toggle(styles.hidden);
    }

    return self;
};

export default _Create;


