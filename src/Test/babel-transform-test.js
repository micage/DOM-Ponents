/*eslint no-unused-vars: "off"*/

var babel = require("babel-core");
// import { transform } from 'babel-core';
// import * as babel from 'babel-core';

var result = babel.transformFile("./Geometry/Point.js", {}, function (err, result) {
    // => { code, map, ast }
    console.log(err);
    console.log(result.ast);
});
