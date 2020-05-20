document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

var slider_top = null;
var slider_bottom = null;

$(document).ready(function () {
    if($('.new-navbar').length){
        newDynamicMenu();
    }else{
        dinamicMenu();
    }

    customTooltip();

    // chat

    //chat


    $('ol li').each(function () {
        var index = $(this).index();
        $(this).append('<text>' + ++index + '.</text>');
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
        if ($(window).width() < 1024) {
            $('.tooltip-inner').append("<button class='hide-tooltip'>+</button>");
        }
    });

    $('.hide-tooltip').on('click', function () {
        $('[data-toggle="tooltip"]').tooltip('hide');
    });

    $(".show-btn").click(function () {
        $(this).toggleClass("hide-btn");
        $('.wrap-english-content').toggleClass("wrap-english-content-open");
    });

    $('.wrap-table-colapse').on("scroll", function () {
        $('[data-toggle="tooltip"]').tooltip('hide');
    });

    // produckt();
    foorterHeight();

    $(".cursor-pointer>span").on('mouseover', function () {
        $('.text-change').text('Soddisfatto...');
    });
    $(".cursor-pointer>span").on('mouseleave', function () {
        $('.text-change').text('Cosa ne pensi ?');
    });

    var heightShare = $('.footer').height();
    $('#shareAffix').affix({
        offset: {
            bottom: heightShare - 20
        }
    });

    $('.one-slide > h2').on('click', function () {
        var elementDrop = $(this).closest('.one-slide');
        if (elementDrop.hasClass('active')) {
            elementDrop.removeClass('active');
        } else {
            elementDrop.addClass('active');
        }
    });

    $(".bx-next").addClass('active');
    $(".bx-controls-direction > a").on('click', function () {
        $(this).parent().find('a').removeClass('active');
        $(this).addClass('active');
    });




    $('.open-btn').on('click', function () {
        $(this).css('display', 'none');
        $('.close-btn').css('display', 'block');
        $('.main-menu-item').slideDown();

    });
    $('.close-btn').on('click', function () {
        $(this).css('display', 'none');
        $('.open-btn').css('display', 'block');
        $('.main-menu-item').slideUp();
    });

    if($('.number-counter').length){
        $('.number-counter .minus').click(function () {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.number-counter .plus').click(function () {
            var $input = $(this).parent().find('input');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });
    }

    if($('.category-input').length){
        $('.category-input').on('click', function(){
           if($(this).hasClass('opened')){
               $(this).removeClass('opened');
               $(this).parent().find('.sub-input').slideUp();
           }else{
               $(this).addClass('opened');
               $(this).parent().find('.sub-input').slideDown();
           }
        });
    }

    if($('.content-form .sub-input').length){
        $('.sub-input label.checkbox-container').on('click', function(event){
            event.preventDefault();
            if($(this).find('input').prop('checked')){
                $(this).find('input').prop('checked', false);
            }else{
                $(this).find('input').prop('checked', true);
            }
            check_categories();
        });
    }

    if($('.item').length){
        $('.item').on('click', function(){
           if($(this).hasClass('selected')){
               $(this).removeClass('selected');
           }else{
               $(this).addClass('selected');
           }
        });
    }

    if($('.custom-range-slider').length){
        $('.custom-range-slider').each(function(){
            var value = parseInt($(this).find('input[type=range]').val());
            var min = parseInt($(this).find('input[type=range]').attr('min'));
            var max = parseInt($(this).find('input[type=range]').attr('max'));
            var width = $(this).find('.track').width();
            var x = (value - min) / (max - min) * width;
            range_slider(x, $(this));
            var isdragged = false;

            if($(this).find('.ruler').length > 0){
                var count = $(this).find('.ruler').attr('count');
                var width = 100 / count;
                for(var i = 0 ; i < count; i++){
                    var point = '<span class="point" style="width:' + width + '%;"></span>';
                    $(this).find('.ruler').append(point);
                }
            }

            $(this).find('.track').on('mousedown', function(){
               isdragged = true;
                var x = event.pageX - $(this).offset().left;
                $(this).addClass('dragged');
                range_slider(x, $(this).parent());
            });
            $('.content-form').on('mouseup', function(){
                if(isdragged){
                    isdragged = false;
                    var x = event.pageX - $(this).find('.track.dragged').offset().left;
                    $(this).find('.track.dragged').removeClass('dragged');
                    range_slider(x, $(this).find('.track.dragged').parent());
                }
            });
            $('.content-form').on('mousemove', function(event){
                //event.preventDefault();
                if(isdragged){
                    var x = event.pageX - $(this).find('.track.dragged').offset().left;
                    range_slider(x, $(this).find('.track.dragged').parent());
                }
            });

        });
    }

    if($('.new-navbar .mobile').length){
        $('.menu-item .menu-title').on('click', function(){
            if($(this).parent().hasClass('expanded')){
                $(this).parent().find('.wrap-drop-con').slideUp(function(){
                    $(this).parent().removeClass('expanded');
                });

            }else{
                $('.menu-item .wrap-drop-con').each(function(){
                    $(this).slideUp();

                });
                $('.menu-item').removeClass('expanded');
                $(this).parent().find('.wrap-drop-con').slideDown(function(){
                    $(this).parent().addClass('expanded');
                });
            }
        });

        $('.mobile .mobile-menu').on('click', function(){
           if($(this).hasClass('opened')){
               $('.mobile .sub-menu').slideUp(function(){
                   $('.mobile .mobile-menu').removeClass('opened');
               });

           }else{
               $('.mobile .sub-menu').slideDown(function(){
                   $('.mobile .mobile-menu').addClass('opened');
               });

           }
        });
    }

});
$(window).on('load', function(){
    if ($('.bxslider').length) {
        bx_slider();
    }
    if ($(".fancybox-button").size() > 0) {
        showFancybox();
    }
    if($('.bannerSlider').length){
        bannerSlider();
    }
    if($('.gallerySlider').length){
        gallerySlider();
    }
    if($('.partnerSlider').length){
        partnerSlider();
    }
});

$(window).resize(function () {
    dinamicMenu();
    customTooltip();
    foorterHeight();
    if ($('.bxslider').length) {
        bx_slider();
    }
    if($('.blogslider').length){
        blogSlider();
    }
    if($('.gallerySlider').length){
        gallerySlider();
    }
    if($('.partnerSlider').length){
        partnerSlider();
    }
    if($('.bannerSlider').length){
        bannerSlider();
    }
    if ($(".fancybox-button").size() > 0) {
        showFancybox();
    }
});

function range_slider(x, obj){
    var min = parseInt(obj.find('input[type=range]').attr('min'));
    var max = parseInt(obj.find('input[type=range]').attr('max'));
    var width = obj.find('.track').width();
    var percent = x / width * 100 ;
    if(percent >= 0 && percent <= 100){
        var value = parseInt(min + (max - min) * percent / 100);
        var inner_icon = obj.find('.tooltiptext i').prop('outerHTML');
        if(!inner_icon){
            inner_icon = '';
        }
        obj.find('.pointer').css('left', percent + '%');
        obj.find('.tooltiptext').css('left', percent + '%');
        obj.find('.tooltiptext').html(inner_icon + value);
        var id = obj.attr('id');
        $('#custom-style').append('.content-form #'+ id +' .track:before{width:' + percent + '%;}');
        obj.find('input[type=range]').val(value);
    }
}
function check_categories(){
    var items = $('.sub-input .checkbox-container');
    var count = 0;
    var item;
    items.each(function(){
        if($(this).find('input').prop('checked')){
            item = $(this).text().trim();
            if(count == 0){
                $('.category-value').text(item);
            }else if(count < 5){
                $('.category-value').text($('.category-value').text() + ' , ' + item);
            }
            count ++;
        }
    });
    if(count == 6){
        $('.category-value').text($('.category-value').text() + ' , ' + item);
    }else if(count > 6){
        $('.category-value').text($('.category-value').text() + ' , and  +' + (count - 5) );
    }else if(count == 0){
        $('.category-value').text('');
    }
}

function showFancybox(){
    var w = $(window).width();
    var fw, fh;
    if(w > 1024){
        fw = 800;
        fh = 600;
    }else{
        fw = 0.8 * w;
        fh = 0.6 * w;
    }

    $(".fancybox-button").fancybox({

        groupAttr: 'data-rel',
        prevEffect: true,
        nextEffect: true,
        fitToView: false,
        beforeShow: function () {
            this.width = fw;
            this.height = fh;
        },
        closeBtn: true,
        helpers: {
            title: {
                type: 'inside'
            }
        }
    });
}

function customTooltip() {
    $('[data-target="tooltip"]').hover(
        function () {
            $(this).closest('body').find('.tooltip-custom').remove();

            var elTitle = $(this).data('title'),
                elPosition = $(this).data('position'),
                elDescription = $(this).data('description'),
                elHeight = $(this).height(),
                elWidth = $(this).width(),
                innerItemLeft = $(this).offset().left,
                innerItemTop = $(this).offset().top,
            /*tooltipPosition = {
             "top": 0,
             "left": 0
             },*/
                arrowPosition = {
                    "left": 0
                };

            //Adding a tooltip layout
            $(this).closest('body').append(
                '<div class="tooltip-custom ' + elPosition + '">' +
                '<div class="tooltip-custom-arrow"></div>' +
                '<div class="tooltip-custom-body">' +
                '<div class="tooltip-close"></div>' +
                '<h4>' + elTitle + '</h4>' +
                '<p>' + elDescription + '</p>' +
                '</div>' +
                '</div>'
            );

            // Center tooltip
            var elTooltip = $('.tooltip-custom'),
                halfTooltip = elTooltip.width() / 2;

            // I pass variables to the function (indentationCheck).
            var cssObj = indentationCheck(innerItemLeft, innerItemTop, arrowPosition, halfTooltip, elHeight, elWidth);

            //I find the tooltip and arrow and apply the position to them
            elTooltip.offset({
                top: cssObj.innerItemTop,
                left: cssObj.innerItemLeft
            });
            elTooltip.find('.tooltip-custom-arrow').css(cssObj.arrowPosition);

        },
        function () {
            $(this).closest('body').find('.tooltip-custom').remove();
        });
}

function indentationCheck(innerItemLeft, innerItemTop, arrowPosition, halfTooltip, elHeight, elWidth) {
    var halfEl = elWidth / 2,
        offsetTooltip = (elWidth / 2) + innerItemLeft + halfTooltip,
        tooltipOffsetRight = $(window).width() - offsetTooltip;

    if (tooltipOffsetRight <= 0) { // checking tooltip is it right
        tooltipOffsetRight = tooltipOffsetRight * -1;

        // position tooltip top and right
        innerItemTop = innerItemTop + elHeight + 8; // 8 - высота стрелочки на тултипе
        innerItemLeft = offsetTooltip - halfTooltip * 2 - tooltipOffsetRight - 15;

        // position top arrow
        arrowPosition.left = halfTooltip + tooltipOffsetRight + 8; //  8 - половина ширины стрелочки

    } else if (innerItemLeft <= halfTooltip) { //Проверка уходит ли тултип за границы екрана слева

        // I learn how far the tooltip goes beyond the boundaries of the screen
        var elWidthDifference = innerItemLeft - halfTooltip;

        //I position the tooltip with respect to the top and left edges
        innerItemTop = innerItemTop + elHeight + 8; // 8 - высота стрелочки на тултипе
        innerItemLeft = innerItemLeft - halfTooltip + halfEl - elWidthDifference;

        //I position the arrow from the top
        arrowPosition.left = halfTooltip + elWidthDifference - 8; // 8 - половина ширины стрелочки

    } else {
        //Default showing
        innerItemTop = innerItemTop + elHeight + 8;
        innerItemLeft = innerItemLeft - halfTooltip + halfEl;

        arrowPosition.left = halfTooltip - 8; // 8 - половина ширины стрелочки
    }

    var cssObj = {
        'innerItemTop': innerItemTop,
        'innerItemLeft': innerItemLeft,
        'arrowPosition': arrowPosition
    };

    return cssObj;
}

function newDynamicMenu(){
    var menus = $('.new-navbar .menu-nav > li.dropdown');
    var w_window = $(window).width();

    menus.each(function(){
        var menu_left = $(this).offset().left;
        var menu_width = $(this).width();
        var sub_left = $(this).find('.dropdown-menu').offset().left;
        var sub_width = $(this).find('.dropdown-menu').width();
        var mov_value = (sub_width - menu_width) / 2;

        if(menu_left < mov_value){
            $(this).find('.dropdown-menu').css('left', -1 * (menu_left - 15));
        }else if(menu_left + menu_width + mov_value > w_window) {
            mov_value = w_window - (sub_width + 15);

            $(this).find('.dropdown-menu').css('left', mov_value - menu_left);
        }else{
            $(this).find('.dropdown-menu').css('left', -1 * mov_value);
        }



    });

}

function dinamicMenu() {
    var target = $('.menu-nav > li'),
        value = 100 / (target.length),
        windowCenter = (window.innerWidth || $(window).width()) / 2;

    var menu_nav_width = ($('.menu-nav').width());

    if ((window.innerWidth || $(window).width()) > 1023) {

        target.css('width', value + '%');
        target.on('click', function () {

            var innerLeft = $(this).offset().left + 150,
                posMenuItem = $(this).position().left,
                widthMenu = $(this).parent().width(),
                widthDropMenu = $(this).find('.dropdown-menu').width(),
                differenceValues = Math.round(widthMenu - (posMenuItem + widthDropMenu));

            if (windowCenter >= innerLeft) {

                if (differenceValues <= 0) {
                    $(this).find('.dropdown-menu').css({
                        "right": "auto",
                        "left": differenceValues
                    });
                } else {
                    $(this).find('.dropdown-menu').css({
                        "right": "auto",
                        "left": "3px",
                    });
                }
            } else {

                if (differenceValues <= 0 && differenceValues > -838) {
                    $(this).find('.dropdown-menu').css({
                        "left": differenceValues,
                        "right": "auto"
                    });
                } else {
                    $(this).find('.dropdown-menu').css({
                        "right": "3px",
                        "left": "auto"
                    });
                }
            }
        });
    } else {
        target.css('width', '100%');
    }
}


var popupAlert = 0,
    popupAlertTimeout = 6000;

function popupAlertOpen(id) {
    var new_id = 'popupalertclone' + popupAlert;
    $(id).clone(false).attr('id', new_id).appendTo('#popupalerts').slideDown();
    setTimeout(function (new_id) {
        $('#' + new_id).slideUp(function () {
            $(this).remove();
        });
    }, popupAlertTimeout, new_id);
    popupAlert++;
}

$(function () {
    $('body').on('click', '.popup-alert .pa-close', function () {
        $(this).parents('.popup-alert').slideUp(function () {
            $(this).remove();
        });
        return false;
    });
    $('body').on('click', '.show_popup_alert', function () {
        popupAlertOpen($(this).attr('href'));
        return false;
    });
});

function foorterHeight() {
    var height = $('.footer').height();
    $('.footer').css('margin-top', -height);
    $('.content').css('padding-bottom', height);

    $('.affix-menu').data('offset-bottom', height + 100);
}

function ww() {
    var ww = $(window).width();
    if (ww < 550) {
        $('.navbar-collapse').addClass('in');
    } else {
        $('.navbar-collapse').removeClass('in');
    }
}


function bx_slider() {
    if ($(window).width() <= 550) {
        $('.bxslider').bxSlider({
            pager: false,
            maxSlides: 1
        });
    } else if ($(window).width() <= 767) {
        $('.bxslider').bxSlider({
            minSlides: 3,
            maxSlides: 3,
            slideWidth: 250,
            slideMargin: 7,
            moveSlides: 1,
            pager: false
        });
    } else if ($(window).width() <= 900) {
        $('.bxslider').bxSlider({
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 220,
            slideMargin: 7,
            moveSlides: 1,
            pager: false
        });

    } else {
        $('.bxslider').bxSlider({
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 220,
            slideMargin: 7,
            moveSlides: 1,
            pager: false,
            controls: false
        });
    }
}

function blogSlider(){
    if(!slider_bottom){
        slider_bottom = $('.blogslider').bxSlider();
    }
    var w = $(window).width();
    if (w <= 550) {
        slider_bottom.reloadSlider({
            pager: false,
            slideWidth:w - 70,
            slideMargin:10,
            maxSlides: 1,
            minSliders:1
        });
    } else if (w <= 767) {
        slider_bottom.reloadSlider({
            minSlides: 2,
            maxSlides: 2,
            slideWidth: (w - 70) / 2 - 15,
            slideMargin: 15,
            moveSlides: 1,
            pager: false
        });
    } else if ($(window).width() <= 1024) {
        slider_bottom.reloadSlider({
            minSlides: 3,
            maxSlides: 3,
            slideWidth: (w - 70) / 3 - 15,
            slideMargin: 15,
            moveSlides: 1,
            pager: false
        });

    } else{
        slider_bottom.reloadSlider({
            auto:true,
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 265,
            slideMargin: 15,
            adaptiveHeight:true,
            pager: false,
            moveSlides: 1,
            responsive:true

        });
    }
}
function gallerySlider(){
    if(!slider_top){
        slider_top = $('.gallerySlider').bxSlider();
    }
    var w = $(window).width();
    var slide_width;
    if (w <= 550) {
        slide_width = w - 70;
        slider_top.reloadSlider({
            auto:true,
            pager: false,
            slideWidth:slide_width,
            slideMargin:10,
            maxSlides: 1,
            minSliders:1
        });
    } else if (w <= 767) {
        slide_width = (w - 70) / 2 - 15;
        slider_top.reloadSlider({
            auto:true,
            minSlides: 2,
            maxSlides: 2,
            slideWidth: slide_width,
            slideMargin: 15,
            moveSlides: 1,
            pager: false
        });
    } else if ($(window).width() <= 1024) {
        slide_width= (w - 70) / 3 - 15;
        slider_top.reloadSlider({
            auto:true,
            minSlides: 3,
            maxSlides: 3,
            slideWidth: slide_width,
            slideMargin: 15,
            moveSlides: 1,
            pager: false
        });

    } else{
        slide_width = 265;
        slider_top.reloadSlider({
            auto:true,
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 265,
            slideMargin: 15,
            adaptiveHeight:true,
            pager: false,
            moveSlides: 1,
            responsive:true

        });

    }
    slider_top.parent().height(slide_width);
}
function partnerSlider(){
    if(!slider_bottom){
        slider_bottom = $('.partnerSlider').bxSlider();
    }
    var w = $(window).width();
    var slide_width;
    if (w <= 550) {
        slide_width = (w - 70) / 2 - 10;
        slider_bottom.reloadSlider({
            auto:true,
            pager: false,
            slideWidth:slide_width,
            slideMargin:10,
            maxSlides: 2,
            minSliders:2
        });
    } else if (w <= 767) {
        slide_width = (w - 70) / 3 - 15;
        slider_bottom.reloadSlider({
            auto:true,
            minSlides: 3,
            maxSlides: 3,
            slideWidth: slide_width,
            slideMargin: 15,
            moveSlides: 1,
            pager: false
        });
    } else if ($(window).width() <= 1024) {
        slide_width= (w - 70) / 5 - 15;
        slider_bottom.reloadSlider({
            auto:true,
            minSlides: 5,
            maxSlides: 5,
            slideWidth: slide_width,
            slideMargin: 15,
            moveSlides: 1,
            pager: false
        });

    } else{
        slide_width = 200;
        slider_bottom.reloadSlider({
            auto:true,
            minSlides: 5,
            maxSlides: 5,
            slideWidth: slide_width,
            slideMargin: 15,
            adaptiveHeight:true,
            pager: false,
            moveSlides: 1,
            responsive:true

        });

    }
}
function bannerSlider(){
    var banner = $('.bannerSlider').bxSlider();
    //banner.reloadSlider({
    //    auto:true,
    //    moveSlides: 1,
    //    controls: true,
    //    pager: true
    //});
}
var playing = '';
$(document).ready(function () {
    $('#bs-example-navbar-collapse-1 ul.navbar-nav li.dropdown').mouseover(function () {
        $('#bs-example-navbar-collapse-1 ul.navbar-nav li.dropdown ul.dropdown-menu').css('display', 'block');
    }).mouseleave(function () {
        $('#bs-example-navbar-collapse-1 ul.navbar-nav li.dropdown ul.dropdown-menu').css('display', 'none');
    });

    $('.sr-only').click(function () {
        $(this).css('display', 'none');
        $('.navbar-toggle .close').css('display', 'block');
    });
    $("video").on("pause", function (e) {
        $('.play-control').css('display', 'block');
        $('.pause-control').css('display', 'none');
    });

    $('.play-control').on('click', function () {
        $(this).css('display', 'none');
        $('.pause-control').css('display', 'block');
       $(this).parent().find('video').get(0).play();
    });

    $('.pause-control').on('click', function () {
        $(this).css('display', 'none');
        $('.play-control').css('display', 'block');
    });

    $('.scroll-down').on('click', function (event) {

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash


        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $('#section-gallery').offset().top
        }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = $('#section-gallery');
        });

    });
    if($('.blogslider').length){
        blogSlider();
    }
});