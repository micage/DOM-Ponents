import "../UI/Splitter";
import { Div } from "./Elements";

/* TODO
- make thumb size proportional to visible/total ratio
- click on left/right or above/below of bar -> change ratio
- bug: split bar is vanishing is ratio gets to zero

*/


const _Create = (args) => {

    const onresize = function(evt) {
        console.log('Resizing SplitView ' + evt.target.className);
        if (this.length) {
            let view = this.children.item(0);
            if (view.onresize instanceof Function) {
                view.dispatchEvent(new Event('resize'));
            }
        }
        return false;
    };

    let one = {
        class: "one",
        style: {
            'overflow-x': 'hidden',
        },
        onresize
    };

    let two = {
        class: "two",
        style: {
            'overflow-x': 'hidden',
        },
        onresize
    };

    let children = Array.isArray(args.children) ? args.children : [];
    if (children.length >= 1) {
        one.children = [ args.children[0] ];
    }
    else {
        one.children = [Div({ innerText: "empty" })];
    }
    if (children.length >= 2) {
        two.children = [ args.children[1] ];
    }
    else {
        two.children = [ Div({ innerText: "empty" }) ];
    }

    // default styles
    let defaultStyle = {
        'min-height': '100px',
        'min-width': '100px'
    };
    Object.assign(defaultStyle, args.style);

    let payload = {
        class: args.class,
        style: defaultStyle,
        horizontal: args.horizontal === false ? false : true,
        ratio: args.ratio || 0.5,
        children: [
            Div(one),
            Div(two)
        ],
        onshow: function (evt) {
            console.log('SplitView loaded');
        },
        onratio: function($evt, ratio) {
            // console.log(this.className + '.onratio ' + ratio);            
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

    self.addEventListener('ratio', function(evt) {
        console.log('SplitView ratio');        
    });

    return self;
};

$( () => {
    let splitViews = $('.SplitView');

    splitViews.each(function () {
        $(this) // is a SplitView
        .split({
            horizontal: this.horizontal === false ? false : true,
            ratio: this.ratio === undefined ? 0.5 : this.ratio
        });
        let barStyle = this.children.item(1).style;
        barStyle.cursor = this.horizontal === false ? 
            "ns-resize" : 
            "ew-resize";
        barStyle['background-color'] = '#ccd';
    });
});


export default _Create;
