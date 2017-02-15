import styles from "./SplitView.less";
import "../../UI/Splitter";
import ObjectTree from "../../Structures/ObjectTree";

/*
.scroll-pane(id=_id)
    .frame
        .view
    .scroll.v
        .one
        .two
    .scroll.h
        .one
        .two
*/
let scrollView = {
    self: {
        id: 'scrollView1',
        class: styles.scrollView,
        frame: {
            class: styles.frame,
            view: {
                class: styles.view
            }
        },
        v: {
            class: styles.v,
            v1: {
                class: styles.one
            },
            v2: {
                class: styles.two
            }
        },
        h: {
            class: styles.h,
            h1: {
                class: styles.one
            },
            h2: {
                class: styles.two
            }
        },
        corner: {
            class: styles.corner
        }
    }
};
let objTree = new ObjectTree(scrollView);
const NodePrinter = node => {
    let tabs = Array.from({length: node.depth}, () => "+- ").join("");

    if (node.hasChildren) {
        console.log(tabs + node.id);
    }
    else {
        console.log(tabs + node.id + ": " + JSON.stringify(node.data));
    }
};
objTree.traverse(NodePrinter, false);

//=============================================================================

let parent = document.body;
let stack = [ parent ];
const DomCreator = (node) => {

    if (node.id === 'id' || node.id === 'class' || node.id === 'type') return; // skip

    let attr = node.data;
    let elem = document.createElement(attr.type || 'div');
    if (attr.id) elem.id = attr.id;
    if (attr.class) elem.classList.add(attr.class);
    if (parent) parent.appendChild(elem);

    let filteredKeys = Object.keys(attr).filter(name => { return name != 'type' && name != 'id' && name != 'class' });

    if (filteredKeys.length) {
        if (! node.isLastChild) {
            stack.push(parent); // save parent
        }
        parent = elem;
    }
    else if (node.isLastChild) {
        parent = stack.pop(); // recover old parent
    }
};
objTree.traverse(DomCreator);
scrollView.self.id = 'scrollView2';
objTree.traverse(DomCreator);

/*
let scrollView = div(document.body, styles.scrollView);
    let frame = div(scrollView, styles.frame);
        let view = div(frame, styles.view);
    let v = div(scrollView, styles.v);
        let v1 = div(v, styles.one);
        let v2 = div(v, styles.two);
    let h = div(scrollView, styles.h);
        let h1 = div(h, styles.one);
        let h2 = div(h, styles.two);
    let corner = div(scrollView, styles.corner);
*/
$('.' + styles.scrollView).hover(function() {
    $(this.children[1]).fadeIn();
    $(this.children[2]).fadeIn();
}, function() {
    $(this.children[1]).fadeOut();
    $(this.children[2]).fadeOut();
});

$('.' + styles.h)
    .on('ratio', function(evt, ratio) {
         // 'this' is the scrollBar, parent is the scrollView, it's first child is the frame
        let frame = this.parentNode.children[0];
        $(frame).scrollLeft(ratio * ($('.' + styles.view).width() - $(frame).width()));
    })
    .split({
        horizontal: true,
        thumbSize: 40,
        ratio: 0.2,
        barClass: styles.bar
    });

$('.' + styles.v)
    .on('ratio', function(evt, ratio) {
         // 'this' is the scrollBar, parent is the scrollView, it's first child is the frame
        let frame = this.parentNode.children[0];
        $(frame).scrollTop(ratio * ($('.' + styles.view).height() - $(frame).height()));
    })
    .split({
        horizontal: false,
        thumbSize: 30,
        ratio: 0.64,
        barClass: styles.bar
    });



//==============================================================================
// Hot-Module-Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        // revoke the side effect
        $('.' + styles.scrollView).remove();
    });
}
