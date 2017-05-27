import { Div, P, Img } from "../DOM/Elements";
import Code from "../DOM/Code";
import ScrollView from "../DOM/ScrollView";

// raw texts
import AppInfoText from "raw-loader!./texts/AppInfo.html";
import src_app from "!raw-loader!../app.js";

// styles
import styles from "./IntroDemo.less"


const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        Div({ class: styles.essay, innerHTML: AppInfoText }),
    ];            

    return self;
};

export default _Create;

