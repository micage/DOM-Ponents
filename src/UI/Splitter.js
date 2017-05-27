import { Div, trigger } from "../DOM/Elements";
import * as __ from "../Util/ParamCheck";

(function ( $ ) {

    $.fn.split = function( options ) {
        // defaults
        var settings = $.extend({
            horizontal: true, // otherwise layout is vertical
            ratio: 0.5
        }, options );

        const onresize = function() {
            let ratio = settings.ratio;
            let box = $(this);
            let divs = box.children();
            let one = $(divs[0]);
            let bar = $(divs[1]);
            let two = $(divs[2]);

            if (settings.horizontal) {
                let boxHeight = box.height();
                let barW = bar.width();
                one.height(boxHeight);
                bar.height(boxHeight);
                two.height(boxHeight);
                let boxWidth = box.width();
                one.width(Math.floor((boxWidth - barW) * ratio));
                two.width(boxWidth - one.width() - barW);
            }
            else { // vertical
                let boxWidth = box.width();
                let barH = bar.height();
                one.width(boxWidth);
                bar.width(boxWidth);
                two.width(boxWidth);
                let boxHeight = box.height();
                one.height(Math.floor((boxHeight - barH) * ratio));
                two.height(boxHeight - one.height() - barH);
            }
        };

        // 'this' is an array of objects that matches the given selector, e.g. 'split-box'
        this.each(function() {
            // 'this' here is the actual DOM element that corresponds to the visited jquery object !!!
            let divs = $(this).children('div');
            if (divs.length !== 2) { // check, if there are exactly 2 divs
                console.error('Splitter.js: there has to be 2 divs -> no split');                
                return;
            }

            this.onresize = onresize.bind(this);

            // insert bar in between one and two
            let box = $(this);
            let one = divs.first().addClass('one');
            let two = divs.last().addClass('two').detach();
            let bar = $('<div>').addClass('bar');
            $(this).append(bar, two);
            let boxW = box.width();
            let boxH = box.height();

            if (settings.horizontal) {
                $(this).children('div').each(function(i, o) {
                    $(o).css('float', 'left');
                });
            }
            this.onresize();

            this.addEventListener('mgScrollTo', function (ev) {
                settings.ratio = ev.detail;
                if (settings.ratio < 0) settings.ratio = 0;
                if (settings.ratio > 1) settings.ratio = 1;
                this.onresize();
                return false; // consume event
            });

            let target = null;
            let cursorBackup = document.body.style.cursor;
            let barX = 0, barY = 0;
            // bar.addEventListener('mousedown', function(ev) {
            // });
            bar.on('mousedown', function(evt) {
                target = evt.target;
                barX = evt.clientX - bar.offset().left;
                barY = evt.clientY - bar.offset().top;
                document.body.style.cursor = bar.css('cursor');
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
                evt.preventDefault();
            });

            const onMouseMove = function(evt) {
                // self[0].dispatchEvent(new Event('ScrollStart', { "bubbles": true }));
                trigger(box[0], 'ScrollStart');

                if (settings.horizontal) {
                    let oneWidth = evt.clientX - box.offset().left - barX;
                    let twoWidth = box.width() - oneWidth - bar.width();
                    if (twoWidth < 0) {
                        twoWidth = 0;
                        oneWidth = box.width() - bar.width();
                    }
                    if (oneWidth < 0) {
                        oneWidth = 0;
                        twoWidth = box.width() - bar.width();
                    }
                    one.width(oneWidth);
                    two.width(twoWidth);

                    settings.ratio = one.width()/(box.width() - bar.width());
                }
                else {
                    let oneHeight = evt.clientY - box.offset().top - barY;
                    let twoHeight = box.height() - oneHeight - bar.height();
                    if (twoHeight < 0) {
                        twoHeight = 0;
                        oneHeight = box.height() - bar.height();
                    }
                    if (oneHeight < 0) {
                        oneHeight = 0;
                        twoHeight = box.height() - bar.height();
                    }
                    one.height(oneHeight);
                    two.height(twoHeight);

                    settings.ratio = one.height()/(box.height() - bar.height());
                }

                // box.trigger('ratio', ratio);
                trigger(box[0], "ratio", settings.ratio);
                trigger(box[0], "mgScroll", settings.ratio);

                // cancel event
                evt.preventDefault();
                evt.stopPropagation();
                return false;
            };

            const onMouseUp = function(evt) {
                // self[0].dispatchEvent(new Event('mgScrollStop', { "bubbles":true }));
                trigger(box[0], 'mgScrollStart');
                
                document.body.style.cursor = cursorBackup;
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };

        });

        $(window).resize(function(evt) {
            // self.each(onresize);
        });

        return this;
    };

}( jQuery ));
