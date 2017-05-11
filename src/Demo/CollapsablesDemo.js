/* TODO
*/

import CollapsableSection from "../DOM/CollapsableSection";
import { Div, P, Img } from "../DOM/Elements";
import Code from "../DOM/Code";


import srcSelf from "!raw-loader!./CollapsablesDemo";
import srcCollapsableSection from "!raw-loader!../DOM/CollapsableSection";
// import svgScrollView from "!raw-loader!../../www/ScrollView_opt.svg";
import svgEberswalder from "!raw-loader!../../www/Eberswalder5.svg";

import styles from "./CollapsablesDemo.less";

// let store = []; // holds all modifications to the DOM

const _Create = (args) => {

    let self = [
        CollapsableSection({ 
            initiallyClosed: false,
            title: " Some really interesting code. Watch out!",
            children: [
                Code({ class: styles.code, src: srcSelf, srcType: 'js' })
            ]
        }),
        CollapsableSection({
            initiallyClosed: true,
            title: "The world is my oyster.",
            children: [
                P({ innerText: srcCollapsableSection })
        ]}),
        CollapsableSection({
            initiallyClosed: true,
            title: "One of these thrilling technical diagrams.",
            children: [
                Img({ class: styles.svgImg, src: './ScrollView_opt.svg' })
        ]}),
        CollapsableSection({
            initiallyClosed: true,
            title: "Berlin, Berlin!",
            children: [
                Div({
                    class: styles.section4,
                    innerHTML: svgEberswalder,
                })
        ]})
    ];

    // store.push(self);

    return self;
}

//=============================================================================
// HMR
if (module.hot) {
    module.hot.accept();
    // reverse changes made to the DOM
    module.hot.dispose(function () {
        store.forEach(entry => {
            entry.forEach(element => element.parentElement.remove(element));
        })
    });
}

export default _Create;


