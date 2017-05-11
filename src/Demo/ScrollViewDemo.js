import { Div, P, Img } from "../DOM/Elements";
import Code from "../DOM/Code";
import ScrollView from "../DOM/ScrollView";

// styles
import styles from "./ScrollViewDemo.less"

// raw imports
import text_01 from "raw-loader!./texts/text_01.html";
import app_src1 from "!raw-loader!../DOM/ScrollView.js";


const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        P({ class: styles.sectionHeader, innerText: 'Examples of ScrollViews' }),
        P({ class: styles.p1, innerText: "It's using two ScrollBar components."}),
        Div({
            class: styles.scrollViews, children: [
                Div({
                    class: styles.scrollViewBox, children: [
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
                Div({
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
                Div({
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
                Div({
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
                Div({
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
                Div({
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
        P({ class: styles.sectionHeader, innerText: 'The source code for this tab' }),
        Code({ class: styles.code, src: app_src1, srcType: 'js' }),
        P({ class: styles.sectionHeader, innerText: 'Schematic view of the ScrollView component' }),
        Div({
            class: styles.imgBox, children: [
                Img({ src: './ScrollView_opt.svg' })
            ]
        })
    ];            

    self.Type = "ScrollViewDemo";

    return self;
};

export default _Create;

