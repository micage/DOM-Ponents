import styles from "./ScrollView.less";
import { Div } from "./Elements";
import ScrollBar from "./ScrollBar";

const onScroll = function (args) {
    let frame = this.parentNode.children[0]; // parentNode is the ScrollView, first child is the view container, called frame
    let view = frame.children[0]; // first and only child of frame is the view
    if (args.horizontal === false) {
        $(frame).scrollTop(args.ratio * ($(view).height() - $(frame).height()));
    }
    else {
        $(frame).scrollLeft(args.ratio * ($(view).width() - $(frame).width()));
    }
};

// little helper 
function isString (obj) {
  return (Object.prototype.toString.call(obj) === '[object String]');
}

const Create = (args) => {

    // append the children of ScrollView to the 'view' element
    let view = Div({ class: styles.view + " view", children: args.children });

    // add local css to the class
    let css = args.class;
    isString(css) && css.length ?
        css += (' ' + styles.scrollView) :
        css = styles.scrollView;

    let self = Div({
        class: css,
        children: [
            Div({ class: styles.frame + " frame", children: [ view ]}),
            ScrollBar({ class: styles.v, horizontal: false, ratio: args.scrollY, onScroll: onScroll }),
            ScrollBar({ class: styles.h, ratio: args.scrollX, onScroll: onScroll }),
            Div({ class: styles.corner })
        ],
        onresize: function(evt) {
            console.log('Resizing ScrollView');
        }
    });

    // to know if we are in scrolling state, can apply css depending on the 'scrolling' class
    self.addEventListener('mgScrollStart', function(evt) {
        self.classList.add('scrolling');
    });

    self.addEventListener('mgScrollStop', function(evt) {
        self.classList.remove('scrolling');
    });

    return self;
};

export default Create;
