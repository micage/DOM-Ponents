/*eslint no-unused-vars: "off"*/

// import _ from 'lodash';
// import Console from "./UI/Console";
import styles from "./app.less";
import "./Util/helper.js";
// import Pattern1 from "./Test/Pattern1.js";
// import "./Test/CanvasTest.js";
// import "./Test/FrameTest.js";
// import "./Test/ListLinkedDoubleTest.js";
// import "./Test/FlagTreeTest.js";
// import "./Test/ContainerTest.js";
// import "./Test/ExplorerView.js";
// import "./Test/TreeViewTest.js";
// import "./Test/LinearAlgebraTest.js";
// import "./babel-transform-test.js";
// import "./Test/Layout/ValueSlider";
// import "./Test/Layout/ScrollBar";
import ScrollView from "./Test/Layout/ScrollView";
// import "./Test/TabBarTest";
import createDOM from "./UI/CreateDOM";

let element = {
    type: '' || (() => {}),
    id: '',
    class: '' || [],
    attr: {
    },
    options: {
    },
    children: {
    }
}

let dom = createDOM({
    body: {
        id: 'micage_App', class: styles.app,
        Header: { class: styles.header },
        Content: { class: styles.content,
            'sv-box': { class: styles.svBox,
                sv1: { type: ScrollView, class: styles.ScrollView },
                sv2: { type: ScrollView, class: styles.ScrollView },
                sv3: { type: ScrollView, class: styles.ScrollView }
            },
            test1: { id: 'test1', class: styles.test },
            test2: { id: 'test2', class: styles.test }
        },
        Footer: { class: styles.footer }
    }
});

// document.body is our app container
document.body.appendChild(dom);


//==============================================================================

console.log("\n" + "NODE_ENV = " + process.env.NODE_ENV + "\n"); // set by webpack define plugin
console.log("DEBUG = " + __DEBUG__ + "\n"); // set by webpack define plugin
console.log('jQuery included: ' + (typeof $ === 'function' ? "true" : "false"));

//==============================================================================
if (module.hot) {
    module.hot.accept();
    // module.hot.dispose(function() {
    //     $('body').empty();
    // });
}
