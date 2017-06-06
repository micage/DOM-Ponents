// TODO: get jquery out of the code, asap!

import './TreeView4.less';
import 'font-awesome/css/font-awesome.css';
import Console from "./Console";
import { forParents, getParents } from "../DOM/Elements"

const ICON_CLASS = 'fa';
const _ICON_CLASS = '.fa';
// const ICON_EXPANDED_CLASS = 'fa-minus-square';
const ICON_EXPANDED_CLASS = 'fa-caret-down';
// const ICON_COLLAPSED_CLASS = 'fa-plus-square';
const ICON_COLLAPSED_CLASS = 'fa-caret-right';

const NODE_DRAGGED = 'drag-image';
const ICON_DRAG_GOOD = 'fa-thumbs-o-down drag-ok';
const ICON_DRAG_BAD = 'fa-thumbs-o-down drag-notok';

const NODE_COLLAPSED_CLASS = 'collapsed';
const NODE_INVISIBLE_CLASS = 'not-visible';
const NODE_SELECTED_CLASS = 'selected';
const TREE_CLASS = 'mmm-treeview';
const NODE_CLASS = 'tree-node';
const _NODE_CLASS = '.tree-node';
const NODE_LABEL_CLASS = 'tree-node-label';
const _NODE_LABEL_CLASS = '.tree-node-label';

const NODE_INDENTATION = 16; // pixels

// handles all click inside the TreeView
const _handleClickTree = function(evt) {
    let clickedElement = evt.srcElement ? evt.srcElement : evt.originalTarget; // Grrh!
    // possible srcElement: tree, listitem, label, icon

    if ( clickedElement.classList.contains(ICON_CLASS) ) {
        this.toggle(clickedElement.parentElement.parentElement); // toggle expects a listitem
    }
    else if (clickedElement.classList.contains(NODE_LABEL_CLASS) ) {
        _onSelect.call(this, evt); // toggle expects a label, already in ev.target
    }
    else {
        _onSelect.call(this, { target: null });
    }

};

const _isTargetOk = function(srcSpan, dstSpan) {
    // 0) it's not from our tree instance
    if (!srcSpan) {
        return false;
    }
    // 1) dstSpan equals srcSpan
    if (dstSpan === srcSpan) {
        return false;
    }

    // 2) dstItem equals parent of srcItem
    let srcItem = srcSpan.parentNode;
    let srcGroup = srcItem.parentNode; // ul
    let srcParentItem = srcGroup.parentNode; // li.tree-node
    if (dstSpan.parentNode === srcParentItem) {
        return false;
    }

    // 3) Todo: from a different tree -> see above 0)

    // 4) Todo: user defined

    return true;
};

const _handleDragStart = function(ev) {
    // w3c: Cancelable
    Console.log('drag start: ' + ev.target.innerText);

    // only item labels can be dragged
    if (ev.target.classList.contains(NODE_LABEL_CLASS) ) {
        // ev.target.style.opacity = 0.5;

        // Todo: this shoudn't be necessary, -> use setData, but what MIME-type?
        this._draggedNode = ev.target; // li.tree-node-label

        // “none”, “copy”, “copyLink”, “copyMove”, “link”,
        // “linkMove”, “move”, “all”, “uninitialized”
        ev.dataTransfer.effectAllowed = 'copyMove'; // ???

        ev.dataTransfer.setData('text/plain', ev.target.innerText);
    }
    else {
        ev.preventDefault();
    }
};

/** handle dragenter event
 *  Cancelable: yes,
 *  Default Action: Reject immediate user selection as potential target element
 *  dropEffect: Based on effectAllowed value
 */
const _handleDragEnter = function(ev) {
    let element = ev.target;

    // Firefox fix, it gives a text node instead of list item
    if (ev.target.constructor.name === "Text") {
        element = ev.target.parentNode;
    }

    // ev.dataTransfer.dropEffect = 'move';

    // drag over a node label
    if (element.classList.contains(NODE_LABEL_CLASS) ) {
        Console.log('drag enter: ' + element.innerText
            + ' effect: ' + ev.dataTransfer.dropEffect);

        if (_isTargetOk(this._draggedNode, ev.target)) {
            ev.preventDefault();
            element.classList.add('over');
        }
    }

    // drag over list item or 'mmm-tree' (this is the empty space inside the div)
    else if ( element.classList.contains(NODE_CLASS) || element.classList.contains(TREE_CLASS) ) {
        Console.log('drag enter: / effect: ' + ev.dataTransfer.dropEffect);
        ev.preventDefault();
    }

    // else this is not from our tree -> default action applies
};

/** handle dragover event
 *  Cancelable: yes
 *  dropEffect: Based on effectAllowed value
 *  Default Action: Reset the current drag operation to "none"
 */
const _handleDragOver = function(ev) {
    let element = ev.target;

    // Firefox fix, it gives a text node instead of list item
    if (ev.target.constructor.name === "Text") {
        element = ev.target.parentNode;
    }

    // drag over a node label
    if (element.classList.contains(NODE_LABEL_CLASS) ) {
        // Console.log('drag over: ' + ev.target.innerText + ' effect: ' + ev.dataTransfer.dropEffect);
        if (_isTargetOk(this._draggedNode, ev.target)) {
            ev.preventDefault();
        }
    }

    // drag over list item or 'mmm-tree' (this is the empty space inside the div)
    else if (element.classList.contains(NODE_CLASS) || element.classList.contains(TREE_CLASS) ) {
        // Console.log('drag over: /');
        ev.preventDefault();
    }

    // else this is not from our tree -> default action applies
};

/** handle dragleave event
 *  Cancelable: no,
 *  Default Action: None
 *  dropEffect: "none"
 */
const _handleDragLeave = function(ev) {
    let element = ev.target;

    // Firefox fix, it gives a text node instead of list item
    if (ev.target.constructor.name === "Text") {
        element = ev.target.parentNode;
    }

    element.classList.remove('over');
};
const _handleDrop = function(ev) {
    // this._draggedNode is a label, it's parent is a list item, drop source
    // ev.target is the drop target

    let srcItem = this._draggedNode.parentNode; // li.tree-node
    let dstElement = ev.target;
    let dstItem = null;

    // ev.target is a label, so dstItem is it's parent
    if (dstElement.classList.contains(NODE_LABEL_CLASS)) {
         dstItem = ev.target.parentNode; // li.tree-node
    }

    // ev.target is a list item or the tree itself
    // in both cases the dragged label will be dropped to root of treeview
    else if (dstElement.classList.contains(NODE_CLASS) || dstElement.classList.contains(TREE_CLASS) ) {
        Console.log('dropped: ' + this._draggedNode.innerText + " onto: /");
        dstItem = this._parent; // it has a UL so it's ok, although it's not a listitem
    }
    else {
        return; // can this happen?
    }

    // remove group and icon if old parent gets empty
    let srcGroup = srcItem.parentNode;
    let srcGroupIcon = srcGroup.previousElementSibling ?
        srcGroup.previousElementSibling.children.item(0) : null;

    let isSingleChild = !srcItem.previousElementSibling && !srcItem.nextElementSibling;
    srcItem.parentNode.removeChild(srcItem);
    if (isSingleChild) {
        srcGroup.parentNode.removeChild(srcGroup);
        srcGroupIcon.classList.remove(ICON_COLLAPSED_CLASS);
        srcGroupIcon.classList.remove(ICON_EXPANDED_CLASS);
    }

    _addItem.bind(this)(srcItem, dstItem);
    srcItem.classList.toggle(NODE_INVISIBLE_CLASS);

    dstElement.classList.remove('over');

    ev.preventDefault();
    ev.stopPropagation(); // prevents bubbling up (label -> listItem -> treeView)
};

const _handleDragEnd = function(ev) {
    // ev.target.style.opacity = '';
    Console.log('drag end: ' + ev.target.innerText);
};

const _onSelect = function(ev) { // ev.target.tagName = "span"
    let prevSelectedItem = this._selectedItem;
    if (this._selectedItem) this._selectedItem.classList.toggle(NODE_SELECTED_CLASS);

    this._selectedItem = ev.target;
    if (this._selectedItem) {
        this._selectedItem.classList.toggle(NODE_SELECTED_CLASS);

        let cb = this._options.onSelect;
        if (typeof cb === 'function') {
            cb.bind(this)(this._selectedItem, prevSelectedItem);
        }
    }
};

const _createItem = function(node) {
    let icon = document.createElement('i');
    icon.classList.add(ICON_CLASS);
    if (!! node.numChildren) {
        icon.classList.add(ICON_COLLAPSED_CLASS);
    }

    let span = document.createElement('span');
    span.classList.add(NODE_LABEL_CLASS);
    span.textContent = this._options.onLabel(node);
    span.setAttribute('draggable', 'true');
    span.style.paddingLeft = (node.depth - 1) * NODE_INDENTATION + 'px';
    span.appendChild(icon);
    span.icon = icon; // for faster access

    let li = document.createElement('li');
    li.classList.add(NODE_CLASS);
    li.classList.add(NODE_INVISIBLE_CLASS);
    li.appendChild(span);
    li.label = span; // for faster access
    li.nodeDepth = node.depth;
    li.data = node.data;

    return li;
};

/** adjust new node depth and padding/indentation of label */
const AdjustNodeDepth = function(srcItem, dstItem) {
    let srcLabels = srcItem.getElementsByClassName(NODE_LABEL_CLASS);
    let diffDepth = dstItem.nodeDepth - srcItem.nodeDepth;

    for (let i = 0; i < srcLabels.length; i++) {
        let depth = srcLabels[i].parentNode.nodeDepth + diffDepth + 1;
        srcLabels[i].parentNode.nodeDepth = depth;
        srcLabels[i].style.paddingLeft = (depth - 1) * NODE_INDENTATION + 'px';
    }
}

const _addItem = function(srcItem, dstItem) {
    // srcItem = drag source, dstItem = drop target
    
    AdjustNodeDepth(srcItem, dstItem);
    
    let ul = dstItem.children.item(1); // get the group element

    // destination item has no children, so create a group
    if (!ul) {
        ul = document.createElement('ul');
        dstItem.appendChild(ul);

        // initially all parent nodes are collapsed
        dstItem.classList.add(NODE_COLLAPSED_CLASS);

        // icon is child of label, TODO: do not pollute global Elements -> _createItem
        dstItem.label.icon.classList.add(ICON_COLLAPSED_CLASS);
    }

    // target item is not collapsed so make the new child visible
    if( ! dstItem.classList.contains(NODE_COLLAPSED_CLASS) ) {
        srcItem.classList.toggle(NODE_INVISIBLE_CLASS);
    }

    ul.appendChild(srcItem);
};

const _init = function(rootNode, options) {
    this._parent.nodeDepth = 0;

    this._parent.addEventListener('dragstart', _handleDragStart.bind(this), false);
    this._parent.addEventListener('dragenter', _handleDragEnter.bind(this), false);
    this._parent.addEventListener('dragover', _handleDragOver.bind(this), false);
    this._parent.addEventListener('dragleave', _handleDragLeave.bind(this), false);
    this._parent.addEventListener('drop', _handleDrop.bind(this), false);
    this._parent.addEventListener('dragend', _handleDragEnd.bind(this), false);

    // click tree or listitem -> selects root
    // click icon -> toggle visibility of child nodes
    // click label -> selects it
    this._parent.addEventListener('click', _handleClickTree.bind(this), false);

    // create root list
    let ul = document.createElement('ul');
    this._parent.appendChild(ul);

    // init stack with root list
    let _stack = [ ul ];
    let skipLevel = 1000;

    // visitor of node hierarchy
    const createULorLI = function(node) {

        // check nodes to process, copy unprocessed nodes to node.data
        let children = node.data; // weird
        let childKeys = Object.keys(children);
        childKeys.forEach(child => {
            let _node = {
                id: child,               
            }
            let doProcessChild = options.doNode(_node);
            if (!doProcessChild) {
                node.data[child] = children[child];
                node.numChildren--;
            }
        });

        if (node.depth > skipLevel) {
            return;
        }
        else {
            if (! options.doNode(node)) {
                skipLevel = node.depth;
                return;
            }
            skipLevel = 1000;
        }

        let li = _createItem.bind(this)(node);
        ul.appendChild(li);

        if (!! node.numChildren) {
            if (! node.isLastChild) {
                _stack.push(ul); // save parent
            }

            ul = document.createElement('ul');
            li.appendChild(ul);

            // initially all parent nodes are collapsed
            li.classList.add(NODE_COLLAPSED_CLASS);
        }
        else if (node.isLastChild) {
            ul = _stack.pop(); // recover old parent
        }
    };

    // create <ul>/<li>-hierarchy
    // 2nd param means do not visit rootFrame
    rootNode.traverse(createULorLI.bind(this), false);

    // make children of root visible
    for (let i = 0; i < ul.childNodes.length; i++) {
        let child = ul.children.item(i);
        child.classList.toggle(NODE_INVISIBLE_CLASS);
    }
};

/** Note on ES6 class concept
    It would be nice to have real private instance variables
    too completely hide implementation details from the outside world.
    I will not juggle with WeakMap or closures. It has to be a
    language feature. In case of class (static) variables or private
    functions the closure mechanism works pretty well - although ugly.
    Because for each call to a private closure function the calling context
    has to be bound:
        privateMethod.bind(this)(args)
    That leads to the situation where the lion's share of the
    implementation happens outside of the class body. That's no good.
    Most of the time this feels like a workaround.
    What's the profit of having a class while it isn't?
    To fool coders coming from real object-oriented languages by
    making them feel comfortable while they are sitting on a powder cag.
*/
class TreeView4 {
    constructor(parent, rootNode, options) { // parent = 'div.mmm-tree'
        this._parent = parent;
        this._selectedItem = null;
        this._draggedNode = null;

        this._options = {};
        if (!options.onLabel || typeof options.onLabel !== "function") {
            this._options.onLabel = (node) => node.id || 'unknown';
        } else {
            this._options.onLabel = options.onLabel;
        }

        if (!options.onSelect || typeof options.onSelect !== "function") {
            this._options.onSelect = (node) => node.id || 'unknown';
        } else {
            this._options.onSelect = options.onSelect;
        }

        if (!options.doNode || typeof options.doNode !== "function") {
            this._options.doNode = (node) => true;
        } else {
            this._options.doNode = options.doNode;
        }

        _init.bind(this)(rootNode, this._options);
    }

    // Todo: synchronize tree
    addchild(parent, childName, childData) {
    }

    // Todo: synchronize tree
    addChildToSelection(childName, childData) {
        let dstItem;
        if (this._selectedItem) {
            dstItem = this._selectedItem.parentNode;
        }
        else {
            dstItem = this._parent;
        }

        _addItem.bind(this)(
            _createItem.bind(this)({
                id: childName,
                data: childData
            }),
            dstItem
        );
    }

    // Todo: synchronize tree
    removeSelection() {
        if (this._selectedItem) {
            this.remove(this._selectedItem.parentNode);
            this._selectedItem = null;
        }
    }

    // Todo: synchronize tree
    // li { span { i }, ul { li, li, ... } } , recursive definition
    remove(li) {
        let ul = li.parentElement;
        let parentLi = ul.parentElement;
        let parentLabel = parentLi.children.item(0);
        let parentIcon = parentLabel.children.item(0);
        let isSingleChild = ul.children.length === 0;
        ul.removeChild(li);
        // remove group and change icon if old parent gets empty
        if (isSingleChild) {
            parentLi.removeChild(ul);
            parentLabel.classList.remove(ICON_COLLAPSED_CLASS);
            parentLabel.classList.remove(ICON_EXPANDED_CLASS);
        }
    }

    toggle(li) {
        li.classList.toggle(NODE_COLLAPSED_CLASS);

        let icon = li.children.item(0).children.item(0);
        icon.classList.toggle(ICON_EXPANDED_CLASS);
        icon.classList.toggle(ICON_COLLAPSED_CLASS);

        // toggles visibility of list items children
        let ul = li.children.item(1);
        let lis = ul.children;
        for (var n = 0; n < lis.length; n++) {
            var li = lis[n];
            li.classList.toggle(NODE_INVISIBLE_CLASS);
        }
    }

    toggleSelection() {
        this.toggle(this.selected.parentNode);
    }

    get selected() { return this._selectedItem; }

    get fullPathOfSelection() {
        let sel = this._selectedItem;
        let parents = getParents(this._selectedItem, this._parent);
        parents = parents.filter((v) => v.classList.contains(NODE_CLASS));
        return parents.map((p) => {
            p => p.children.item(0).innerText
        }).reverse().join(".");
    }

    // traverses all nodes until the user callback returns false
    // TODO: a filter function to skip nodes conditionally would be nice
    traverse(cb) {
        let keepGoing = true;
        const _preorder = (li) => {
            if (keepGoing) {
                keepGoing = cb.call(this, li) === false ? false : true;

                // recursive call
                let ul = li.children.item(1);           // ul is second child of li                
                if (ul) {                               // only if node has children
                    let lis = ul.children;
                    for (var n = 0; n < lis.length; n++) {
                        var li = lis[n];
                        _preorder(li);
                    }
                }
            }
        };

        // root = tree host elem -> ul -> first li
        let li_0 = this._parent.children.item(0).children.item(0);
        _preorder.bind(this)(li_0);
    }

    // Todo: more sophisticated find like find('Human.Head')
    find(labelText) {
        let found = null;
        this.traverse((li) => {
            let lbl = li.children.item(0);
            if (lbl.innerText === labelText) {
                found = { item: li, label: lbl };
                return false; // stop further traversal
            }
        });
        return found;
    }

    select(labelText, scrollTarget) {
        let found = this.find(labelText);
        if (found) {
            if (!scrollTarget) scrollTarget = this._parent;
            
            // call the click handler
            _onSelect.call(this, { target: found.label });

            // expand parent chain
            forParents(
                this.selected, 
                this._parent, // while parent !== root_ul
                (parent) => this.toggle(parent), 
                (parent) => 
                    parent.classList.contains(NODE_CLASS) 
                    && parent.classList.contains(NODE_COLLAPSED_CLASS)
            );

            // scroll into view
            scrollTarget.scrollTop = 0; // reset scroll view
            let y0 = scrollTarget.offsetTop;
            let y1 = this.selected.offsetTop;
            scrollTarget.scrollTop = y1 - y0;

            return found;
        }

        return null;
    }

}

//======================================================================
export default TreeView4;

//======================================================================
if (typeof window !== 'undefined') {
    Object.assign(window.MICAGE = window.MICAGE || {}, {
        TreeView4
    });
}
