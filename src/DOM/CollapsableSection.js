// CollapsableSection.js

/*  TODO:
clean up the style mess!
*/

import { Div, P } from "./Elements";
// @ts-ignore - next line
import styles from "./CollapsableSection.less"
/*
.sectionHeader {
    margin-left: -12px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 12pt;
    background-color: #e2e9f3;
    padding: 3px 3px 3px 12px;
}
*/

let styleP = {
    "margin-left": "-12px",
    "margin-top": "20px",
    "margin-bottom": "10px",
    "font-size": "14pt",
    "padding": "3px 3px 3px 12px",

    "-webkit-user-select":" none",
    "-moz-user-select":" none",
    "-khtml-user-select":" none",
    "-ms-user-select":" none",
    "user-select":" none",

    "background-color": "hsl(220, 50%, 90%)",
    "color": "#222",
    "cursor": "default"
};
let stylePEnter = {
    "background-color": "hsl(220, 50%, 60%)",
    "color": "#eee",
    "cursor": "pointer"
};
let stylePLeave = {
    "background-color": "hsl(220, 50%, 90%)",
    "color": "#222",
    "cursor": "default"
};

let styleContent = {
    "display": "block",
    //"overflow-x": "auto"
};
let styleContentVisible = {
    "display": "block"
};
let styleContentHidden = {
    "display": "none"
};


const toggleContent = (p) => {
    let style = p.Content.style;
    if (style.display === "block") {
        style.display = "none";
    }
    else {
        style.display = "block"; 
    }
}

// TODO: args.useInlineBlock

const _Create = (args) => {
    if (!args.title || typeof args.title !== "string") {
        args.title = "Title is missing.";
    }

    let header = P({ innerText: args.title, style: styleP });
    if (args.isInitiallyClosed === undefined) args.isInitiallyClosed = false;
    
    header.onclick = (evt) => {
        let p = evt.target;
        toggleContent(p); 
    }

    header.onmouseenter = (evt) => {
        Object.assign(evt.target.style, stylePEnter);
    }

    header.onmouseleave = (evt) => {
        Object.assign(evt.target.style, stylePLeave);
    }

    if (!args.children || !Array.isArray(args.children)) {
        args.children = Div({
            children: P({ 
                innerText: "empty", 
                style: { "font-size": "48pt" } 
            })
        })
    }
    let content = Div({
        class: args.class,
        style: styleContent,
        children: args.children
     });
    header.Content = content;

    args.isInitiallyClosed ?
        Object.assign(content.style, styleContentHidden) :
        Object.assign(content.style, styleContentVisible);

    let self = Div({
        children: [ header, content ]
    });

    return self;
};

export default _Create;


