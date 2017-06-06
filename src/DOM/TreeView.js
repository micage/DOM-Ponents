import TreeView from "../UI/TreeView4";
import ObjectTree from "../Structures/ObjectTree";
import { Div, trigger } from "../DOM/Elements";


const _Create = (args) => {
    let payload = Object.assign({}, args);

    // a TreeView has no children, so ignore them if present
    if (payload.children) console.log('TreeView: children ignored');
    delete payload.children;

    if (!payload.json) {
        payload.json = { "empty": "tree" };
    }

    // need to create the parent first
    let self = Div(payload);
    self.classList.add('mmm-treeview');

    // the TreeView appends itself to self
    let treeView = new TreeView(
        self, // parent
        new ObjectTree(payload.json),
        { // options
            doNode: payload.doNode,
            onSelect: (label) => trigger(self, "mgSelect", label),
            onLabel: payload.onLabel
        }
    );

    self.Type = "TreeView";

    self.addEventListener("mgDoSelect", function(ev) {
        let lblText = ev.detail;
        console.log('TreeView: ' + lblText + " selected");        
        treeView.select(lblText);
    });
    // self.addEventListener('mgScrollStart', function(ev) {
    // });
    //
    // self.addEventListener('mgScrollStop', function(ev) {
    // });

    return self;
};

export default _Create;

