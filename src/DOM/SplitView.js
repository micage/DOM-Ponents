import "../UI/Splitter";
import { Div } from "./Elements";

let resizeEvent = new Event('resize');

const _Create = (args) => {

    let children = Array.isArray(args.children) ? args.children : [];

    const onresize = function(evt) {
        console.log('Resizing SplitView ' + evt.target.className);
        let me = evt.target;
        if (me.children.length) {
            let view = me.children.item(0);
            if (view.onresize instanceof Function) {
                view.dispatchEvent(new Event('resize'));
            }
        }
        return false;
    };

    let one = {
        class: "one",
        style: {
            // 'display': 'inline-block',
        },
        onresize
    };

    let two = {
        class: "two",
        style: {
            // 'display': 'inline-block',
        },
        onresize
    };

    if (children.length >= 1) {
        one.children = [ args.children[0] ];
    }
    if (children.length >= 2) {
        two.children = [ args.children[1] ];
    }

    let payload = {
        horizontal: args.horizontal === false ? false : true,
        children: [
            Div(one),
            Div(two)
        ],
        style: {
            // 'width': '100%',
            // 'min-height': '40px'
        }
    };

    let self = Div(payload);
    self.Type = 'SplitView';
    self.classList.add("SplitView");
    self.classList.add(args.horizontal === false ? "v" : "h");

    self.onresize = function(evt) {
        let me = evt.target;
        me.children.item(0).onresize();
        me.children.item(2).onresize();
        console.log('Resizing SplitView.');
    };

    return self;
};

$( () => {
    let splitViews = $('.SplitView');

    splitViews.each(function () {
        let args = {
            horizontal: this.horizontal === false ? false : true,
            ratio: this.ratio === undefined ? 0.5 : this.ratio
        };
        $(this) // is a SplitViews
            .on('ratio', function(evt, ratio) {
                args.ratio = ratio;
                if (this.onScroll) this.onScroll(args);

                this.children.item(0).dispatchEvent(new Event('resize'));
                this.children.item(2).dispatchEvent(new Event('resize'));

                return false;
            })
            .split(args);
    });
});

// experiment
// $( () => {
//     var target = document.querySelectorAll('.scrollBar');
//
//     // create an observer instance
//     var observer = new MutationObserver(function(mutations) {
//       mutations.forEach(function(mutation) {
//         console.log(mutation.type);
//       });
//     });
//
//     // configuration of the observer:
//     // var config = { attributes: true, childList: true, characterData: true };
//
//     // pass in the target node, as well as the observer options
//     observer.observe(target, { attributes: true });
//
//     // later, you can stop observing
//     // observer.disconnect();
// });


// $( () => {
//     var scrollBar  = document.querySelector('.scrollBar');
//     var previousValue = scrollBar.style.display;
//
//     var observer = new MutationObserver( function(mutations){
//         mutations.forEach( function(mutation) {
//             if (mutation.attributeName !== 'style') return;
//             var currentValue = mutation.target.style.display;
//             if (currentValue !== previousValue) {
//                if (previousValue === "none" && currentValue !== "none") {
//                  console.log("display none has just been removed!");
//                }
//
//                previousValue = mutation.target.style.display;
//             }
//         });
//     });
//
//     var config = { attributes: true, subtree: true, characterData: false };
//     observer.observe(scrollBar, config);
// });


export default _Create;
