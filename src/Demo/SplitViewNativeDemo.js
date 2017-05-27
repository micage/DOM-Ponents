import { Div, Img, P } from "../DOM/Elements";
import Code from "../DOM/Code";
import SplitView from "../DOM/SplitView";
import CollapsableSection from "../DOM/CollapsableSection";

// styles
import styles from "./SplitViewNativeDemo.less"

// raw import
import svg_Points from "!raw-loader!../../www/Points.svg";
import srcSplitViewDemo from "!raw-loader!./SplitViewNativeDemo";
import srcSplitView from "!raw-loader!../DOM/SplitView";


const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        CollapsableSection({
            title: "SplitView (native scrollbars, horizontal)",
            children: [
                SplitView({
                    class: styles.SplitView,
                    horizontal: true,
                    children: [
                        Code({
                            src: svg_Points,
                            srcType: 'js',
                            class: styles.code,
                            style: { height: "inherit" } // overwrites class style
                        }),
                        Div({
                            children: [Img({ src: "./Points.svg" })]
                        })
                    ]
                })
            ]
        }),
        CollapsableSection({
            title: "SplitViewDemo.js",
            children: [
                Code({ src: srcSplitViewDemo, srcType: 'js', class: styles.code }),
            ]
        }),
        CollapsableSection({
            title: "SplitView.js",
            children: [
                Code({ src: srcSplitView, srcType: 'js', class: styles.code }),
            ]
        })
    ];

    return self;
};

export default _Create;

