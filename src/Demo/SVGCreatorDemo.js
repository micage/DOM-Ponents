/* TODO
*/

import { Img, P } from "../DOM/Elements";
import { SVG, Group, Circle, Rect, Path } from "../SVG/Elements";
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
const text2 = "A SVG Bézier path";

let circles = [];
for (let i = 0; i < 10; i++) {
    circles[i] = Circle({ class: styles.circle, cx: 40 + 70 * i, cy: 50, r: 30 });
    circles[i].addEventListener("click", changeColor);
}

let rects = [];
for (let i = 0; i < 10; i++) {
    rects[i] = Rect({ class: styles.rect, x: 10 + 70 * i, width: 40, height: 30 });
    rects[i].addEventListener("click", changeColor);
}

let path1 = Path({
    class: styles.c_path1,
    d: "M 2,24 C 11,9 51,-11 58,16 61,33 28,29 25,57 21,42 -5,36 2,24 Z",
    // transform: "scale(4)"
});
path1.addEventListener("click", changeColor);

const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        P({ class: styles.sectionHeader, innerText: text0 }),
        SVG({ class: styles.SVGRoot1, children: [
            Group({ id: "circles", children: circles }),
            Group({ id: "rects", children: rects })
        ]}),
        P({ class: styles.sectionHeader, innerText: text1 }),
        Code({ src: srcCode, srcType: 'js', class: styles.code }),
        P({ class: styles.sectionHeader, innerText: text2 }),
        SVG({
            class: styles.SVGRoot2, children: [ path1 ]
        }),
    ];

    return self;
};

export default _Create;

