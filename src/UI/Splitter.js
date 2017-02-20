(function ( $ ) {

    $.fn.split = function( options ) {
        // defaults
        var settings = $.extend({
            horizontal: true, // otherwise layout is vertical
            thumbSize: 4,
            ratio: 0.5,
            onSplit: function() {}
        }, options );

        var self = this;

        // 'this' is an array of objects that matches the given selector, e.g. 'split-box'
        this.each(function() {
            // 'this' here is the actual DOM element that corresponds to the visited jquery object !!!
            let divs = $(this).children('div');
            if (! divs.length == 2) { // check, if there are exactly 2 divs
                return;
            }

            // insert bar in between one and two
            let box = $(this);
            let one = divs.first().addClass('one');
            let two = divs.last().addClass('two').detach();
            let bar = $('<div>').addClass(settings.barClass ? settings.barClass : 'bar');
            $(this).append(bar, two);

            box.attr('ratio', settings.ratio);

            // some handy definitions
            let boxLeft = box.offset().left;
            let boxTop = box.offset().top;

            if (settings.horizontal) {
                // set inline-block style
                $(this).children('div').each(function(i, o) {
                    $(o).css('float', 'left');
                });

                bar.width(settings.thumbSize).height(box.height());
                one.width(Math.floor((box.width() - bar.width()) * settings.ratio)).height(box.height());
                two.width(box.width() - one.width() - bar.width()).height(box.height());
            }
            else {  // vertical
                bar.height(settings.thumbSize).width(box.width());
                one.height(Math.floor((box.height() - bar.height()) * settings.ratio)).width(box.width());
                two.height(box.height() - one.height() - bar.height()).width(box.width());
            }

            box.attr('ratio', settings.ratio);
            box.trigger('ratio', settings.ratio);

            // logging
            if (__DEBUG__ && 0) {
                $('.out')
                    .append( $('<li class="clientX">').append( $('<span>').text('clientX: ') ).append( $('<span class="value">') ) )
                    .append( $('<li class="barX">').append( $('<span>').text('barX: ') ).append( $('<span class="value">') ) )
                    .append( $('<li class="barY">').append( $('<span>').text('barY: ') ).append( $('<span class="value">') ) )
                    .append( $('<li class="w-box">').append( $('<span>').text('box.width: ') ).append( $('<span class="value">').text(box.width())) )
                    .append( $('<li class="h-box">').append( $('<span>').text('box.height: ') ).append( $('<span class="value">').text(box.height())) )
                    .append( $('<li class="iw-box">').append( $('<span>').text('box.iwidth: ') ).append( $('<span class="value">').text(box.innerWidth())) )
                    .append( $('<li class="o-box">').append( $('<span>').text('box.offset: ') ).append( $('<span class="value">').text(box.offset().left)) )
                    .append( $('<li class="w-one">').append( $('<span>').text('one.width: ') ).append( $('<span class="value">').text(one.width())) )
                    .append( $('<li class="o-one">').append( $('<span>').text('one.offset: ') ).append( $('<span class="value">').text(one.offset().left)) )
                    .append( $('<li class="w-two">').append( $('<span>').text('two.width: ') ).append( $('<span class="value">').text(two.width())) )
                    .append( $('<li class="o-two">').append( $('<span>').text('two.offset: ') ).append( $('<span class="value">').text(two.offset().left)) )
                    .append( $('<li class="w-bar">').append( $('<span>').text('bar.width: ') ).append( $('<span class="value">').text(bar.width())) )
                    .append( $('<li class="o-bar">').append( $('<span>').text('bar.offset: ') ).append( $('<span class="value">').text(bar.offset().left)) )
                ;
            }

            let target = null;
            let cursorBackup = document.body.style.cursor;
            let barX = 0, barY = 0;

            bar.on('mousedown', function(evt) {
                target = evt.target;
                barX = evt.clientX - bar.offset().left;
                barY = evt.clientY - bar.offset().top;
                if (__DEBUG__ && 0) {
                    $('.out .barX .value').text(barX);
                    $('.out .barY .value').text(barY);
                }
                document.body.style.cursor = bar.css('cursor');
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
                evt.preventDefault();
            });

            const onMouseMove = function(evt) {
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

                    box.attr('ratio', one.width()/(box.width() - bar.width()) );
                }
                else {
                    let oneHeight = evt.clientY - boxTop - barY;
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

                    box.attr('ratio', one.height()/(box.height() - bar.height()) );
                }

                box.trigger('ratio', box.attr('ratio'));

                // logging
                if (__DEBUG__ && 0) {
                    $('.out .clientX .value').text(evt.clientX);
                    $('.out .w-box .value').text(box.width());
                    $('.out .iw-box .value').text(box.innerWidth());
                    $('.out .o-box .value').text(box.offset().left);
                    $('.out .w-one .value').text(one.width());
                    $('.out .o-one .value').text(one.offset().left);
                    $('.out .w-two .value').text(two.width());
                    $('.out .o-two .value').text(two.offset().left);
                    $('.out .w-bar .value').text(bar.width());
                    $('.out .o-bar .value').text(bar.offset().left);
                }

                // cancel event
                evt.preventDefault();
                evt.stopPropagation();
                return false;
            };

            const onMouseUp = function(evt) {
                document.body.style.cursor = cursorBackup;
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };

        });

        $(window).resize(function(evt) {
            self.each(function() {
                let box = $(this);
                let divs = box.children();
                let one = $(divs[0]);
                let bar = $(divs[1]);
                let two = $(divs[2]);
                let ratio = box.attr('ratio');

                if (settings.horizontal) {
                    one.width(Math.floor((box.width() - bar.width()) * ratio));
                    two.width(box.width() - one.width() - bar.width());
                }
                else {
                    one.height(Math.floor((box.height() - bar.height()) * ratio));
                    two.height(box.height() - one.height() - bar.height());
                }
                box.trigger('ratio', ratio);
            });
        });

        return this;
    };

}( jQuery ));
