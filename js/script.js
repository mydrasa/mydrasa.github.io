//ServiceWorker for notifications
if ('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/js/ServiceWorker.js");
    });
}



//detect iframe
var pageIsInAnIframe = false;
if (window.location !== window.parent.location) {
    pageIsInAnIframe = true;
}

//Center a popup window on screen
function popupCenter({ url, title, w, h }){

    let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    let dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    let systemZoom = width / window.screen.availWidth;
    let left = (width - w) / 2 / systemZoom + dualScreenLeft;
    let top = (height - h) / 2 / systemZoom + dualScreenTop;
    let myNewWindow = window.open(url, title,
        `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    );

    if (myNewWindow && window.focus) {
        myNewWindow.focus();
    }
};

(function ($) {
    "use strict";

    $(window).load(function () {
        //get image dimensions for square crop:
        $(".square-crop").each(function () {
            $(this).height($(this).width());
        });
        $(".square-crop img").each(function () {
            if ($(this)[0].naturalWidth > $(this)[0].naturalHeight) {
                $(this).addClass("landscape");
            } else {
                $(this).addClass("portrait");
            }
        });
    });
    



    //bootstrap tooltips
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    

    //hide elements if iframe
    if (pageIsInAnIframe) {
        $(".hide-in-iframe").hide();
    }


    //Hide Loading Box (Preloader)
    function handlePreloader() {
        if ($(".preloader").length) {
            $(".preloader")
                .delay(200)
                .fadeOut(500);
        }
    }

    var currentUrl = window.location.pathname;
    $("#navbarSupportedContent a").each(function () {
        var linkUrl = $(this).attr("href");
        if (currentUrl.includes(linkUrl) && !(linkUrl == "/" && currentUrl != linkUrl)) {
            $(this).parent().addClass("current");
            if ($(this).parent().parent().parent().hasClass("dropdown")) {
                $(this).parent().parent().parent().addClass("current")
            }
        }

    });

    //Submenu Dropdown Toggle
    if ($(".main-header li.dropdown ul").length) {
        $(".main-header li.dropdown").append(
            '<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>'
        );

        //Dropdown Button
        $(".main-header li.dropdown .dropdown-btn").on("click", function () {
            $(this)
                .prev("ul")
                .slideToggle(500);
        });

        //Disable dropdown parent link
        $(
            ".main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a"
        ).on("click", function (e) {
            e.preventDefault();
        });
    }

    // //Update Header Style and Scroll to Top
    // function headerStyle() {
    // 	if($('.main-header').length){
    // 		var windowpos = $(window).scrollTop();
    // 		var siteHeader = $('.main-header');
    // 		var scrollLink = $('.scroll-to-top');
    // 		var sticky_header = $('.main-header .sticky-header');
    // 		if (windowpos > 100) {
    // 			siteHeader.addClass('fixed-header');
    // 			sticky_header.addClass("animated slideInDown");
    // 			scrollLink.fadeIn(300);
    // 		} else {
    // 			siteHeader.removeClass('fixed-header');
    // 			sticky_header.removeClass("animated slideInDown");
    // 			scrollLink.fadeOut(300);
    // 		}
    // 	}
    // }

    // headerStyle();

    //Hidden Sidebar
    if ($(".hidden-bar").length) {
        var hiddenBar = $(".hidden-bar");
        var hiddenBarOpener = $(".nav-toggler");
        var hiddenBarCloser = $(".hidden-bar-closer");
        $(".hidden-bar-wrapper").mCustomScrollbar();

        //Show Sidebar
        hiddenBarOpener.on("click", function () {
            hiddenBar.addClass("visible-sidebar");
        });

        //Hide Sidebar
        hiddenBarCloser.on("click", function () {
            hiddenBar.removeClass("visible-sidebar");
        });
    }

    //Hidden Bar Menu Config
    function hiddenBarMenuConfig() {
        var menuWrap = $(".hidden-bar .side-menu");
        // appending expander button
        menuWrap
            .find(".dropdown")
            .children("a")
            .append(function () {
                return '<button type="button" class="btn expander"><i class="icon fa fa-angle-right"></i></button>';
            });
        // hidding submenu
        menuWrap
            .find(".dropdown")
            .children("ul")
            .hide();
        // toggling child ul
        menuWrap.find(".btn.expander").each(function () {
            $(this).on("click", function () {
                $(this)
                    .parent() // return parent of .btn.expander (a)
                    .parent() // return parent of a (li)
                    .children("ul")
                    .slideToggle();

                // adding class to expander container
                $(this)
                    .parent()
                    .toggleClass("current");
                // toggling arrow of expander
                $(this)
                    .find("i")
                    .toggleClass("fa-angle-right fa-angle-down");

                return false;
            });
        });
    }

    hiddenBarMenuConfig();

    //Mobile Nav Hide Show
    if ($(".mobile-menu").length) {
        $(".mobile-menu .menu-box").mCustomScrollbar();

        var mobileMenuContent = $(".main-header .nav-outer .main-menu").html();
        $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);
        $(".sticky-header .main-menu").append(mobileMenuContent);

        //Dropdown Button
        $(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
            $(this).toggleClass("open");
            $(this)
                .prev("ul")
                .slideToggle(500);
        });
        //Menu Toggle Btn
        $(".mobile-nav-toggler").on("click", function () {
            $("body").addClass("mobile-menu-visible");
        });

        //Menu Toggle Btn
        $(".mobile-menu .menu-backdrop,.mobile-menu .close-btn").on(
            "click",
            function () {
                $("body").removeClass("mobile-menu-visible");
            }
        );
    }

    //Parallax Scene for Icons
    if ($(".parallax-scene-1").length) {
        var scene = $(".parallax-scene-1").get(0);
        var parallaxInstance = new Parallax(scene);
    }
    if ($(".parallax-scene-2").length) {
        var scene = $(".parallax-scene-2").get(0);
        var parallaxInstance = new Parallax(scene);
    }
    if ($(".parallax-scene-3").length) {
        var scene = $(".parallax-scene-3").get(0);
        var parallaxInstance = new Parallax(scene);
    }

    //Fact Counter + Text Count
    if ($(".count-box").length) {
        $(".count-box").appear(
            function () {
                var $t = $(this),
                    n = $t.find(".count-text").attr("data-stop"),
                    r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: $t.find(".count-text").text()
                    }).animate(
                        {
                            countNum: n
                        },
                        {
                            duration: r,
                            easing: "linear",
                            step: function () {
                                $t.find(".count-text").text(Math.floor(this.countNum));
                            },
                            complete: function () {
                                $t.find(".count-text").text(this.countNum);
                            }
                        }
                    );
                }
            },
            { accY: 0 }
        );
    }

    //Tabs Box
    function initTabBoxes() {
        if ($(".tabs-box").length) {
            $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
                e.preventDefault();
                var target = $($(this).attr("data-tab"));

                if ($(target).is(":visible")) {
                    return false;
                } else {
                    target
                        .parents(".tabs-box")
                        .find(".tab-buttons")
                        .find(".tab-btn")
                        .removeClass("active-btn");
                    $(this).addClass("active-btn");
                    target
                        .parents(".tabs-box")
                        .find(".tabs-content")
                        .find(".tab")
                        .fadeOut(0);
                    target
                        .parents(".tabs-box")
                        .find(".tabs-content")
                        .find(".tab")
                        .removeClass("active-tab");
                    $(target).fadeIn(300);
                    $(target).addClass("active-tab");
                }
            });
        }
    };
    initTabBoxes();
    $(document).on('DOMNodeInserted', function () {
        initTabBoxes();
    });



    //Header Search
    if ($(".search-box-outer").length) {
        $(".search-box-outer").on("click", function () {
            $("body").addClass("search-active");
        });
        $(".close-search").on("click", function () {
            $("body").removeClass("search-active");
        });
    }

    if ($(".paroller").length) {
        $(".paroller").paroller({
            factor: 0.2, // multiplier for scrolling speed and offset, +- values for direction control
            factorLg: 0.4, // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control
            type: "foreground", // background, foreground
            direction: "horizontal" // vertical, horizontal
        });
    }

    // Testimonial Carousel
    if ($(".testimonial-carousel").length) {
        $(".testimonial-carousel").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            navText: [
                '<span class="flaticon-back-2"></span>',
                '<span class="flaticon-arrow"></span>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1024: {
                    items: 2
                },
                1200: {
                    items: 2
                },
                1400: {
                    items: 2
                },
                1600: {
                    items: 2
                }
            }
        });
    }

    // partners Carousel
    if ($(".partners-carousel").length) {
        $(".partners-carousel").owlCarousel({
            loop: true,
            margin: 0,
            nav: false,
            slideTransition: "linear",
            autoplay: 500,
            autoplaySpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });
    }

    //Product Carousel
    if ($(".project-carousel").length) {
        $(".project-carousel").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            navText: [
                '<span class="flaticon-back-2"></span>',
                '<span class="flaticon-arrow"></span>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                800: {
                    items: 2
                },
                1024: {
                    items: 3
                },
                1200: {
                    items: 3
                },
                1400: {
                    items: 3
                },
                1600: {
                    items: 3
                }
            }
        });
    }

    //Product Tabs
    if ($(".project-tab").length) {
        $(".project-tab .product-tab-btns .p-tab-btn").on("click", function (e) {
            e.preventDefault();
            var target = $($(this).attr("data-tab"));

            if ($(target).hasClass("actve-tab")) {
                return false;
            } else {
                $(".project-tab .product-tab-btns .p-tab-btn").removeClass(
                    "active-btn"
                );
                $(this).addClass("active-btn");
                $(".project-tab .p-tabs-content .p-tab").removeClass("active-tab");
                $(target).addClass("active-tab");
            }
        });
    }

    //Accordion Box
    if ($(".accordion-box").length) {
        $(".accordion-box").on("click", ".acc-btn", function () {
            var outerBox = $(this).parents(".accordion-box");
            var target = $(this).parents(".accordion");

            if ($(this).hasClass("active") !== true) {
                $(outerBox)
                    .find(".accordion .acc-btn")
                    .removeClass("active");
            }

            if (
                $(this)
                    .next(".acc-content")
                    .is(":visible")
            ) {
                $(this).removeClass("active");
                $(this)
                    .next(".acc-content")
                    .slideUp(300);
                $(target).removeClass("active-block");
            } else {
                $(this).addClass("active");
                $(outerBox)
                    .children(".accordion")
                    .removeClass("active-block");
                $(outerBox)
                    .find(".accordion")
                    .children(".acc-content")
                    .slideUp(300);
                target.addClass("active-block");
                $(this)
                    .next(".acc-content")
                    .slideDown(300);
            }
        });
    }

    // Main Slider Carousel
    if ($(".main-slider-carousel").length) {
        $(".main-slider-carousel").owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: [
                '<span class="fa fa-angle-left"></span>',
                '<span class="fa fa-angle-right"></span>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 1
                },
                1200: {
                    items: 1
                },
                1500: {
                    items: 1
                }
            }
        });
    }

    // Sponsors Carousel
    if ($(".sponsors-carousel").length) {
        $(".sponsors-carousel").owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: [
                '<span class="fa fa-angle-left"></span>',
                '<span class="fa fa-angle-right"></span>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                800: {
                    items: 3
                },
                1024: {
                    items: 4
                },
                1200: {
                    items: 4
                },
                1500: {
                    items: 4
                }
            }
        });
    }

    // Single Item Carousel
    if ($(".single-item-carousel").length) {
        $(".single-item-carousel").owlCarousel({
            //animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: [
                '<span class="fa fa-angle-left"></span>',
                '<span class="fa fa-angle-right"></span>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 1
                },
                1200: {
                    items: 1
                },
                1500: {
                    items: 1
                }
            }
        });
    }

    //Event Countdown Timer
    if ($(".time-countdown").length && $.fn.countdown) {
        $(".time-countdown").each(function () {
            var $this = $(this),
                finalDate = $(this).data("countdown");
            $this.countdown(finalDate, function (event) {
                var $this = $(this).html(
                    event.strftime(
                        "" +
                        '<div class="counter-column"><span class="count">%D</span>Days</div> ' +
                        '<div class="counter-column"><span class="count">%H</span>Hours</div>  ' +
                        '<div class="counter-column"><span class="count">%M</span>Minutes</div>  ' +
                        '<div class="counter-column"><span class="count">%S</span>Seconds</div>'
                    )
                );
            });
        });
    }

    //Custom Seclect Box
    if ($(".custom-select-box").length && $.fn.selectmenu) {
        $(".custom-select-box")
            .selectmenu()
            .selectmenu("menuWidget")
            .addClass("overflow");
    }

    //Jquery Spinner / Quantity Spinner
    if ($(".quantity-spinner").length && $.fn.TouchSpin) {
        $("input.quantity-spinner").TouchSpin({
            verticalbuttons: true
        });
    }

    //Gallery Filters
    if ($(".filter-list").length && $.fn.mixItUp) {
        $(".filter-list").mixItUp({});
    }

    //LightBox / Fancybox
    if ($(".lightbox-image").length && $.fn.fancybox) {
        $(".lightbox-image").fancybox({
            openEffect: "fade",
            closeEffect: "fade",
            helpers: {
                media: {}
            }
        });
    }

    //Contact Form Validation
    if ($("#contact-form").length && $.fn.validate) {
        $("#contact-form").validate({
            rules: {
                username: {
                    required: true
                },
                lastname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
                message: {
                    required: true
                }
            }
        });
    }

    // Scroll to a Specific Div
    if ($(".scroll-to-target").length) {
        $(".scroll-to-target").on("click", function () {
            var target = $(this).attr("data-target");
            // animate
            $("html, body").animate(
                {
                    scrollTop: $(target).offset().top
                },
                1500
            );
        });
    }

    // Elements Animation
    if ($(".wow").length) {
        var wow = new WOW({
            boxClass: "wow", // animated element css class (default is wow)
            animateClass: "animated", // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    // select2
    $(".select2").select2();


    // home search

    var searchPlaceholder = "What subject do you want to learn today?";

    $(".subjects-search").select2({
        placeholder: searchPlaceholder,
        theme: "classic",
        dropdownCssClass: "subjects-search-ddl",
        sorter: function (results) {
            var query = $(".subjects-search-ddl .select2-search__field")
                .val()
                .toLowerCase();
            return results.sort(function (a, b) {
                return (
                    a.text.toLowerCase().indexOf(query) -
                    b.text.toLowerCase().indexOf(query)
                );
            });
        }
    });

    $(".subjects-search").on("select2:select", function (e) {
        window.location.href = $(e.params.data.element).data("url");
    });

    $(".subjects-search").on("select2:open", function () {
        $(".subjects-search-ddl .select2-results__options").hide();
        $(".subjects-search-ddl input.select2-search__field").attr(
            "placeholder",
            searchPlaceholder
        );
        $(".subjects-search-ddl input.select2-search__field").on(
            "input",
            function () {
                if ($(this).val().length > 0) {
                    $(".subjects-search-ddl .select2-results__options").slideDown();
                } else {
                    $(".subjects-search-ddl .select2-results__options").slideUp();
                }
            }
        );
    });


    // subject accordion 
    $("#subjectButton").click(function () {
        $(".subject-accordion").toggleClass("expanded");
    })


    // inner search

    var searchPlaceholder = "What subject do you want to learn today?";

    $(".inner-search").select2({
        placeholder: searchPlaceholder,
        theme: "classic",
        dropdownCssClass: "subjects-search-ddl",
        sorter: function (results) {
            var query = $(".subjects-search-ddl .select2-search__field")
                .val()
                .toLowerCase();
            return results.sort(function (a, b) {
                return (
                    a.text.toLowerCase().indexOf(query) -
                    b.text.toLowerCase().indexOf(query)
                );
            });
        }
    });

    $(".inner-search").on("select2:select", function (e) {
        window.location.href = $(e.params.data.element).data("url");
    });

    $(".inner-search").on("select2:open", function () {
        $(".subjects-search-ddl .select2-results__options").hide();
        $(".subjects-search-ddl input.select2-search__field").attr(
            "placeholder",
            searchPlaceholder
        );
        $(".subjects-search-ddl input.select2-search__field").on(
            "input",
            function () {
                if ($(this).val().length > 0) {
                    $(".subjects-search-ddl .select2-results__options").slideDown();
                } else {
                    $(".subjects-search-ddl .select2-results__options").slideUp();
                }
            }
        );
    });



    // return url hidden fields
    $(".return-url").val(window.location.pathname);

    // slide validation

    $(".contact-form .form-group .validation-message").on('DOMNodeInserted', 'span', function () {
        $(this).parent().hide().slideDown(1000);
    });


    // Block Element
    function blockElement(id) {
        if (!$.fn.block || !window.feather) {
            return;
        }

        $("#" + id).block({
            css: {
                backgroundColor: 'transparent',
                border: 'none'
            },
            message: '<i class="fa-spin" data-feather="loader"></i>',
            baseZ: 1500,
            overlayCSS: {
                backgroundColor: '#FFFFFF',
                opacity: 0.7,
                cursor: 'wait'
            }
        });
        feather.replace({ 'height': '48px', 'width': '48px', 'stroke-width': 2 });
    }

    //rich text editor
    if (window.Quill && $(".snow-container").length) {
        var snowIndex = 1;
        $(".snow-container").each(function () {
            var containerId = "snow-container-" + snowIndex;
            $(this).attr('id', containerId);

            var quill = new Quill('#' + containerId + ' .editor', {
                bounds: '#' + containerId + ' .editor',
                modules: {
                    formula: true,
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                        ['link', 'image', 'video'],
                        ['formula'],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'direction': 'rtl' }],
                        ['clean']
                    ],
                    imageResize: {
                        modules: ['Resize', 'DisplaySize', 'Toolbar']
                    }
                },
                theme: 'snow'
            });

            var submitableInput = $(this).parent().find('input.submitable');
            var validatableInput = $(this).parent().find('input.validatable');

            quill.on('text-change', function () {
                var text = $("#" + containerId + " .editor .ql-editor").html();
                submitableInput.val(htmlEncode(text));
                validatableInput.val(stripTagsAndSpaces(text));
            });

            function htmlEncode(value) {
                return $('<textarea/>').text(value).html();
            }

            function htmlDecode(html) {
                var txt = document.createElement("textarea");
                txt.innerHTML = html;
                return txt.value;
            }

            function stripTagsAndSpaces(value) {
                value = value.replace(/<[^>]*>?/gm, '');
                value = htmlDecode(value);
                value = value.replace(/\s/g, "");
                return value;
            }

            snowIndex++;
        });
    }




    // When document is Scrollig, do

    // $(window).on('scroll', function() {
    // 	headerStyle();
    // });


    $(document).on("ready", function () {

        // When document is loading, do

        handlePreloader();



        // toasts

        function initToasts() {

            var time = 500;

            $('.toast-container').each(function () {
                var toast = $($(this).html());
                $(this).remove();
                $('#toasters-container').append(toast);

                toast.toast({
                    autohide: false
                });

                setTimeout(function () {
                    toast.toast('show');
                }, time);

                time += 500;

            });

        }

        initToasts();


    });
    $(window).on("load", function () {



        // make services boxes same height
        $(".equal-heights").each(function () {
            var highestBox = 0;

            $(".inner", this).each(function () {
                if ($(this).height() > highestBox) {
                    highestBox = $(this).height();
                }
            });

            $(".inner", this).height(highestBox);
        });









    });
})(window.jQuery);

/* ==========================================================================
   Public methods
   ========================================================================== */

// get url query string utility
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
