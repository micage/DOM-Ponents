/* TODO
*/

import CollapsableSection from "../DOM/CollapsableSection";
import { Div, P, Img } from "../DOM/Elements";
import Code from "../DOM/Code";

// raw imports
import srcSelf from "!raw-loader!./CollapsablesDemo";
import srcCollapsableSection from "!raw-loader!../DOM/CollapsableSection";
import svgEberswalder from "!raw-loader!../../www/Eberswalder5.svg";

import styles from "./CollapsablesDemo.less";

const _Create = (args) => {

    let self = [
        CollapsableSection({ 
            isInitiallyClosed: false,
            title: " Some really interesting code. Watch out!",
            children: [
                Code({ class: styles.code, src: srcSelf, srcType: 'js' })
            ]
        }),
        CollapsableSection({
            isInitiallyClosed: true,
            title: "The world is my oyster.",
            children: [
                P({ innerText: srcCollapsableSection })
        ]}),
        CollapsableSection({
            isInitiallyClosed: true,
            title: "One of these thrilling technical diagrams.",
            children: [
                Img({ class: styles.svgImg, src: './ScrollView_opt.svg' })
        ]}),
        CollapsableSection({
            isInitiallyClosed: true,
            title: "Berlin, Berlin!",
            children: [
                Div({
                    class: styles.section4,
                    innerHTML: svgEberswalder,
                })
        ]})
    ];

    return self;
}

export default _Create;


