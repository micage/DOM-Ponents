import { Div, P, Img } from "../DOM/Elements";
import Code from "../DOM/Code";
import ScrollView from "../DOM/ScrollView";

// raw texts
import AppInfoText from "raw-loader!./texts/AppInfo.html";
import src_app from "!raw-loader!../app.js";

// styles
import styles from "./AppDemo.less"


const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        P({ innerText: 'App.js' }),
        P({ innerHTML: AppInfoText }),
        Code({ src: src_app, srcType: 'js', class: styles.code })
    ];            

    self.Type = "AppDemo";

    return self;
};

export default _Create;

