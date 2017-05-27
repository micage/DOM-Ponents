import { Group, Div, P, Img } from "../DOM/Elements";
import Code from "../DOM/Code";
import ScrollView from "../DOM/ScrollView";
import CollapsableSection from "../DOM/CollapsableSection";

// styles
import styles from "./ScrollViewDemo.less"

// raw imports
import text_01 from "raw-loader!./texts/text_01.html";
import srcScrollViewDemo from "!raw-loader!./ScrollViewDemo.js";
import srcScrollView from "!raw-loader!../DOM/ScrollView.js";


const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        CollapsableSection({
            title: "Examples of ScrollViews",
            children: [
                P({ class: styles.p1, innerText: "It's using two ScrollBar components." }),
                Group({
                    class: styles.scrollViews, 
                    children: [
                        Group({
                            class: styles.scrollViewBox, 
                            children: [
                                ScrollView({
                                    id: 'sv1', class: styles.ScrollView,
                                    scrollX: 0.0, scrollY: 0.0,
                                    children: [
                                        Div({ class: styles.inner, innerHTML: text_01 }),
                                        Div({ class: styles.inner, innerHTML: text_01 })
                                    ]
                                }),
                                P({ innerText: 'lengthy text' }),
                            ]
                        }),
                        Group({
                            class: styles.scrollViewBox, children: [
                                ScrollView({
                                    id: 'sv2', class: styles.ScrollView,
                                    scrollX: 0.9, scrollY: 0.7,
                                    children: [
                                        Img({ src: './Desert.jpeg' })
                                        // Img({ src: './Arizona_free.jpeg' })
                                        // Img({ src: 'https://unsplash.it/800/500/?random' })
                                    ]
                                }),
                                P({ innerText: 'picture of an oasis' }),
                            ]
                        }),
                        Group({
                            class: styles.scrollViewBox, children: [
                                ScrollView({
                                    id: 'sv3', class: styles.ScrollView,
                                    scrollX: 0.68, scrollY: 0.425,
                                    children: [
                                        Img({ class: styles.svg, src: './color-wheel.svg' })
                                    ]
                                }),
                                P({ innerText: 'SVG graphic' }),
                            ]
                        }),
                        Group({
                            class: styles.scrollViewBox, children: [
                                ScrollView({
                                    id: 'sv3', class: styles.ScrollView,
                                    scrollX: 0.18, scrollY: 0.325,
                                    children: [
                                        Img({ class: styles.svg, src: './color-wheel.svg' })
                                    ]
                                }),
                                P({ innerText: 'SVG graphic' }),
                            ]
                        }),
                        Group({
                            class: styles.scrollViewBox, children: [
                                ScrollView({
                                    id: 'sv3', class: styles.ScrollView,
                                    scrollX: 0.8, scrollY: 0.525,
                                    children: [
                                        Img({ class: styles.svg, src: './color-wheel.svg' })
                                    ]
                                }),
                                P({ innerText: 'SVG graphic' }),
                            ]
                        }),
                        Group({
                            class: styles.scrollViewBox, children: [
                                ScrollView({
                                    id: 'sv3', class: styles.ScrollView,
                                    scrollX: 0.28, scrollY: 0.225,
                                    children: [
                                        Img({ class: styles.svg, src: './color-wheel.svg' })
                                    ]
                                }),
                                P({ innerText: 'SVG graphic' }),
                            ]
                        }),
                    ]
                }),
            ]
        }),
        CollapsableSection({
            isInitiallyClosed: true,
            title: "Source code of this Tab: ScrollViewDemo.js",
            children: [
                Code({ class: styles.code, src: srcScrollViewDemo, srcType: 'js' }),
            ]
        }),
        CollapsableSection({
            isInitiallyClosed: true,
            title: "Source code of ScrollView.js",
            children: [
                Code({ class: styles.code, src: srcScrollView, srcType: 'js' }),
            ]
        }),
        CollapsableSection({
            isInitiallyClosed: true,
            title: "Diagram of the ScrollView component",
            children: [
                Group({
                    class: styles.imgBox, 
                    children: [
                        Img({ src: './ScrollView_opt.svg' })
                    ]
                })
            ]
        })
    ];            

    return self;
};

export default _Create;

