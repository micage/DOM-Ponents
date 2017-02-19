import styles from "./ScrollView.less";
import "../../UI/Splitter";
import createDOM from "../../UI/CreateDOM";

// define DOM nodes as json
let scrollView = {
    self: {
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
let options = null;

const Create = (parent, _options) => {
    options = Object.assign({
        orientation: 'vertical'
    }, _options);

    let dom = createDOM(parent, scrollView);

    $('.' + styles.scrollView).hover(function() {
        // 'this' is the scrollView (HTMLDivElement)
        $(this.children[1]).fadeIn();
        $(this.children[2]).fadeIn();
        $(this.children[3]).fadeIn();
    }, function() {
        $(this.children[1]).fadeOut();
        $(this.children[2]).fadeOut();
        $(this.children[3]).fadeOut();
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
            ratio: 0.5,
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

    return dom;
};
export default Create;



//==============================================================================
// Hot-Module-Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        // revoke the side effect
        $('.' + styles.scrollView).remove();
    });
}
