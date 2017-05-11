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
const text2 = "Funny world of SVG's Bézier-Spline pathes";
const text2a = "Animating the dashed outline of a closed spline";

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

let path2 = Path({
    class: styles.c_path2,
    d: "M 2,24 C 11,9 51,-11 58,16 61,33 28,29 25,57 21,42 -5,36 2,24 Z",
});
path2.addEventListener("click", changeColor);

let path3 = Path({
    d: "M 2,20 C 2,7 22,0 30,13 39,-2 58,4 58,18 58,36 41,38 30,57 18,38 2,34 2,20 Z",
    style: {
        transform: "translate(500px, 50px)",
        fill: "red", 
        stroke: "yellow", "stroke-width": 2
    },
    onclick: (evt) => {
        let heart = evt.target;
        heart.style.transform = "scale(2)";
    }
});
path2.addEventListener("click", changeColor);

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
        P({ class: styles.p1, innerText: text2a }),
        SVG({
            class: styles.SVGRoot2, children: [ path1, path2, path3 ]
        }),
    ];

    return self;
};

export default _Create;

