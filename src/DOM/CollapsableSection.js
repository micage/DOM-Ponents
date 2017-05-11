// CollapsableSection.js

import { Div, P } from "./Elements";
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
    "background-color": "hsl(214, 20%, 80%)",
    "padding": "3px 3px 3px 12px",
    "border-width": "1px",
    "border-style": "solid",
    "border-color": "transparent",
    "border-radius": "4px",

    "-webkit-user-select":" none",
    "-moz-user-select":" none",
    "-khtml-user-select":" none",
    "-ms-user-select":" none",
    "user-select":" none",
    "cursor": "default"
};
let stylePEnter = {
    "background-color": "hsl(214, 10%, 90%)",
    "border-width": "1px",
    "border-style": "solid",
    "border-color": "#556",
    "cursor": "pointer"
};
let stylePLeave = {
    "background-color": "hsl(214, 20%, 80%)",
    "border-color": "transparent",
    "cursor": "default"
};

let styleContent = {
    "display": "block",
    "max-height": "300px",
    "overflow": "auto"
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
    if (args.initiallyClosed === undefined) args.initiallyClosed = false;
    
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
        style: styleContent,
        children: args.children
     });
    header.Content = content;

    args.initiallyClosed ?
        Object.assign(content.style, styleContentHidden) :
        Object.assign(content.style, styleContentVisible);

    let self = Div({
        children: [ header, content ]
    });

    return self;
};

if (module.hot) {
    module.hot.accept();
}

export default _Create;


