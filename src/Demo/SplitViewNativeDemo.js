import { Div, Img, P } from "../DOM/Elements";
import Code from "../DOM/Code";
import SplitView from "../DOM/SplitView";

// styles
import styles from "./SplitViewNativeDemo.less"

// raw import
import svg_Points from "!raw-loader!../../www/Points.svg";


const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        P({ innerText: 'SplitView (native scrollbars, horizontal)' }),
        SplitView({
            class: styles.SplitView,
            horizontal: true, 
            children: [
                Code({ 
                    src: svg_Points, 
                    srcType: 'js', 
                    class: styles.code
                }),
                // Code({ src: app_src2, srcType: 'js', class: styles.code }),
                Div({
                    children: [ Img({ src: "./Points.svg" }) ]
                })
        ]})
    ];

    self.Type = "TreeViewDemo";

    return self;
};

export default _Create;

