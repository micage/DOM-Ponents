// @ts-nocheck

import { Div, trigger, genId } from "../DOM/Elements";
import * as __ from "../Util/ParamCheck";

const clsSplitted = "cls" + Math.random().toString().slice(2);

/**
 * Insert a slider "bar" between to child elements
 * @param {HTMLElement} elem 
 * @param {*} options 
 */

window.addEventListener("resize", function (evt) {
    let splittedElements = document.querySelectorAll(clsSplitted);
    for (var i = 0; i < splittedElements.length; i++) {
        var element = splittedElements[i];
        trigger(element, 'mgScrollTo');
    }
});

export const split = function(elem, options ) {
    let box = elem;
    let divs = box.children;
    if (divs.length !== 2) { // check, if there are exactly 2 divs
        console.error('Split.js: there has to be 2 child elements -> no split');
        return;
    }

    // default settings
    var settings = {
        horizontal: true, // otherwise layout is vertical
        ratio: 0.5
    };
    Object.assign(settings, options);
    if (!__.checkBoolean(settings.horizontal)) settings.horizontal = true; 
    if (!__.checkNumber(settings.ratio)) settings.ratio = 0.5; 
    
    // insert bar in between one and two
    box.classList.add(clsSplitted);
    let one = divs.item(0);
    let bar = Div({ class: "bar" });
    let two = box.removeChild(divs.item(1));
    box.appendChild(bar);
    box.appendChild(two);
    one.classList.add('one');
    two.classList.add('two');
    divs = box.children; // necessary?

    let boxWidth = box.clientWidth;
    let boxHeight = box.clientHeight;

    for (let i = 0; i < divs.length; i++) {
        let childStyle = divs.item(i).style;
        if (settings.horizontal) {
            childStyle.float = "left"; // necessary?
            childStyle.height = boxHeight + "px";
        }
        else {
            childStyle.width = boxWidth + "px";
        }
    }

    const onresize = function () {
        let ratio = settings.ratio;

        if (settings.horizontal) {
            let dx = boxWidth - bar.offsetWidth;
            let oneWidth = Math.floor(dx * ratio);
            one.style.width = oneWidth + "px";
            two.style.width = (dx - oneWidth) + "px";
        }
        else { // vertical
            let barHeight = bar.offsetHeight;
            one.style.height = (Math.floor((boxHeight - barHeight) * ratio)) + "px";
            two.style.height = (boxHeight - one.offsetHeight - barHeight) + "px";
        }
    };

    onresize(); // initial call

    box.addEventListener('mgScrollTo', function (ev) {
        settings.ratio = ev.detail;
        if (settings.ratio < 0) settings.ratio = 0;
        if (settings.ratio > 1) settings.ratio = 1;
        onresize();
        return false; // consume event
    });

    let cursorBackup = document.body.style.cursor;
    let barX = 0, barY = 0;
    
    bar.addEventListener('mousedown', function(ev) {
        barX = ev.clientX - bar.offsetLeft;
        barY = ev.clientY - bar.offsetTop;
        document.body.style.cursor = bar.style.cursor;
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        ev.preventDefault();
    });

    const onMouseMove = function(evt) {
        // self[0].dispatchEvent(new Event('ScrollStart', { "bubbles": true }));
        trigger(box, 'ScrollStart');

        let mouseX = evt.clientX;
        let mouseY = evt.clientY;

        if (settings.horizontal) {
            let oneWidth = mouseX - box.offsetLeft - barX;
            let barWidth = bar.offsetWidth;
            let twoWidth = boxWidth - oneWidth - barWidth;
            if (twoWidth < 0) {
                twoWidth = 0;
                oneWidth = boxWidth - barWidth;
            }
            if (oneWidth < 0) {
                oneWidth = 0;
                twoWidth = boxWidth - barWidth;
            }
            settings.ratio = oneWidth / (boxWidth - barWidth);
            one.style.width = oneWidth + "px";
            two.style.width = twoWidth + "px";
        }
        else {
            let oneHeight = mouseY - box.offsetTop - barY;
            let barHeight = barHeight;
            let twoHeight = boxHeight - oneHeight - barHeight;
            if (twoHeight < 0) {
                twoHeight = 0;
                oneHeight = boxHeight - barHeight;
            }
            if (oneHeight < 0) {
                oneHeight = 0;
                twoHeight = boxHeight - barHeight;
            }
            settings.ratio = oneHeight/(boxHeight - barHeight);
            one.style.height = oneHeight + "px";
            two.style.height = twoHeight + "px";
        }

        trigger(box, "mgRatio", settings.ratio);

        // cancel event
        evt.preventDefault();
        evt.stopPropagation();
        return false;
    };

    const onMouseUp = function(evt) {
        // self[0].dispatchEvent(new Event('mgScrollStop', { "bubbles":true }));
        trigger(box, 'mgScrollStop');
        
        document.body.style.cursor = cursorBackup;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };

};

