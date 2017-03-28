import styles from "./ScrollBar.less";
import "../UI/Splitter";
import { Div } from "./Elements";

const _Create = (args) => {

    let payload = {
        children: [
            Div({ class: "one"}),
            Div({ class: "two" }),
    ]};
    Object.assign(payload, args);

    let self = Div(payload);
    self.classList.add("ScrollBar");
    self.classList.add(args.horizontal === false ? "v" : "h");

    // self.addEventListener('ScrollStart', function(evt) {
    // });
    //
    // self.addEventListener('ScrollStop', function(evt) {
    // });

    return self;
};

$( () => {
    let scrollBar = $('.ScrollBar');

    scrollBar.each(function () {
        let args = {
            horizontal: this.horizontal === false ? false : true
            , ratio: this.ratio === undefined ? 0.5 : this.ratio
        };
        $(this)
            .on('ratio', function(evt, ratio) {
                args.ratio = ratio;
                if (this.onScroll) this.onScroll(args);

                return false; // consume event
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
