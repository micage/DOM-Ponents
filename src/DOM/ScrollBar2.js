// @ts-ignore - the next line
import styles from "./ScrollBar2.less";
import { Div } from "./Elements";

/*
Interaction:
    scrollbar registers for mousedown events:
        self.addListener("mousedown", onMouseDown);
Events:
    onmousedown over one:
        starts a decreasing animation until mouse isn't over one anymore
    onmousedown over two:
        starts a increasing animation until mouse isn't over one anymore
    onmousedown over bar:
        starts dragging the bar
    onmouseleave
    onmouseenter
    onmouseup
    onmousemove
        registered in bar after mousedown
        window.addEventListener("onmousemove", onMouseMove);
*/

const _Create = (args) => {

    let one = Div({ class: "one" });
    let bar = Div({ class: "bar" });
    let two = Div({ class: "two" });

    let payload = {
        children: [one, bar, two]
    };
    Object.assign(payload, args);

    let self = Div(payload);
    self.classList.add("ScrollBar");
    self.classList.add(args.horizontal === false ? "v" : "h");


    return self;
};


export default _Create;
