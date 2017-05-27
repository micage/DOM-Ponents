import TreeView from "../UI/TreeView4";
import ObjectTree from "../Structures/ObjectTree";
import { Div } from "../DOM/Elements";
import { parseString } from "xml2js";

const _Create = (args) => {
    let payload = Object.assign({}, args);

    // a TreeView has no children, so ignore them if present
    if (payload.children) console.log('TreeView: children ignored');
    payload.children = [];

    if (!payload.src) {
        payload.src = "<svg></svg>";
    }

    parseString(payload.src, function (err, result) {
        payload.json = result;
        console.dir(result);
    });
    
    // need to create the parent first
    let self = Div(payload);
    self.classList.add('mmm-treeview');

    // the TreeView appends itself to self
    let treeView = new TreeView(
        self, // parent
        new ObjectTree(payload.json),
        { // options
            onSelect: payload.onSelect
        }
    );

    self.Type = "TreeViewSVG";

    // self.addEventListener('mgScrollStart', function(evt) {
    // });
    //
    // self.addEventListener('mgScrollStop', function(evt) {
    // });

    return self;
};

export default _Create;

