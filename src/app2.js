import styles from "./app2.less";
import "./Util/helper.js";
// import Pattern1 from "./Test/Pattern1.js";
// import "./Test/CanvasTest.js";
// import "./Test/FrameTest.js";
// import "./Test/ListLinkedDoubleTest.js";
// import "./Test/FlagTreeTest.js";
// import "./Test/ContainerTest.js";
// import "./Test/ExplorerView.js";
// import "./Test/TreeViewTest.js";
// import "./Test/TreeViewTest_new.js";
// import "./Test/LinearAlgebraTest.js";
// import "./babel-transform-test.js";
// import "./Test/Layout/ValueSlider";
// import "./Test/Layout/ScrollBar";
import "./Test/TreeConverter";

//=============================================================================

//=============================================================================

// console.log("\n" + "NODE_ENV = " + process.env.NODE_ENV + "\n"); // set by webpack define plugin
// console.log("DEBUG = " + __DEBUG__ + "\n"); // set by webpack define plugin
// console.log('jQuery included: ' + (typeof $ === 'function' ? "true" : "false"));

//=============================================================================
// HMR
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        document.location = document.location; // reload page
    });
}
