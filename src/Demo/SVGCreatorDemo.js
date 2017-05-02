/* TODO
*/

import { Img, P } from "../DOM/Elements";
import { SVG, Group, Circle } from "../SVG/Elements";
import Code from "../DOM/Code";

// styles
import styles from "./SVGCreatorDemo.less";

// raw import of the source code
import srcCode from "!raw-loader!./SVGCreatorDemo";


const changeColor = (evt) => {
    let r = Math.floor(Math.random() * 360);
    evt.target.style.fill = "hsl(" + r + ", 90%, 70%)";
};

const text0 = "Dynamic SVG";
const text1 = "The source code of this Tab (SVGCreatorDemo.js):";

let circles = [];
for (let i = 0; i < 10; i++) {
    circles[i] = Circle({ class: styles.circle, cx: 40 + 70 * i, cy: 50, r: 30 });
    circles[i].addEventListener("click", changeColor);
}

const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        P({ innerText: text0 }),
        SVG({ class: styles.SVGRoot1, children: [
            Group({ id: "circles", children: circles })
        ]}),
        P({ class: styles.sectionHeader, innerText: text1 }),
        Code({ src: srcCode, srcType: 'js', class: styles.code })
    ];

    return self;
};

export default _Create;

