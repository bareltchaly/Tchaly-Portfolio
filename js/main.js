/**loader */
var loader = '<div style="" id="ctn-preloader" class="ctn-preloader"><div class="animation-preloader"><div class="spinner"></div><div class="txt-loading"><span data-text-preloader="T" class="letters-loading"> B </span><span data-text-preloader="C" class="letters-loading"> A </span><span data-text-preloader="H" class="letters-loading"> // </span><span data-text-preloader="A" class="letters-loading"> R </span><span data-text-preloader="L" class="letters-loading"> E </span><span data-text-preloader="Y" class="letters-loading"> L </span></div><p class="text-center">Loading</p></div><div class="loader"><div class="row"><div class="col-3 loader-section section-left"><div class="bg"></div></div><div class="col-3 loader-section section-left"><div class="bg"></div></div><div class="col-3 loader-section section-right"><div class="bg"></div></div><div class="col-3 loader-section section-right"><div class="bg"></div></div></div></div></div>'
$('body').append(loader);
$(window).on('load', function () {
    setTimeout(removeLoader, 2400); //wait for page load PLUS two seconds.

    AOS.refresh();
});
function removeLoader() {
    $("#ctn-preloader").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#ctn-preloader").remove(); //makes page more lightweight
    });
}

AOS.init({
    once: true,
    duration: 1400,
})
/**click to scroll top */
$('.move-up').click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});


$(document).scroll(function () {
    var scroll = $(window).scrollTop();
    $move_up = $(' .move-up')

    if (scroll > 600) {
        $move_up.css({ 'opacity': '1' })
    } else {
        $move_up.css({ 'opacity': '0' })
    }
    amount = (scroll * 0.0017)
    if (scroll > 200) {
        $('.hero').css({ "opacity": '1' - amount })
    } else {
        $('.hero').css({ 'opacity': '1' })
    }
    var brand = $('.header .brand')
    $hamburger = $('.hamburger')
    $brand_h1 = $('#header .header .nav-bar .brand .brand-name h1');
    $brand_span = $('#header .header .nav-bar .brand .brand-name span.sub');
    $hamburger_bar = $('#header .nav-bar .nav-list .hamburger span')
    if (scroll > 400 && !$hamburger.hasClass('active')) {
        $brand_h1.css({ 'color': 'var(--dark)' })
        $brand_span.css({ 'color': 'var(--dark)' })
        $hamburger_bar.css({ 'background': 'var(--dark)' })
    }
    else if ($hamburger.hasClass('active')) {
        $brand_h1.css({ 'color': 'var(--light)' })
        $brand_span.css({ 'color': 'var(--light)' })
        $hamburger_bar.css({ 'background': 'var(--light)' })
    }

    else {
        $brand_h1.css({ 'color': 'var(--white)' })
        $brand_span.css({ 'color': 'var(--white)' })
        $hamburger_bar.css({ 'background': 'var(--white)' })
    }

})
$(document).ready(function () {
    (function toggleActive() {
        $menu = $('.nav-list ul');
        $hamburger = $('.hamburger')
        $brand = $('.header .brand')
        $header_ = $('#header')
        $('.hamburger').click(function () {
            $hamburger.toggleClass('active');
            $menu.toggleClass('active');
            $brand.toggleClass('active')
            $header_.css({ 'width': '100vw' })
        })
    })


        /** slider script */
        (function () {

            var $$ = function (selector, context) {
                var context = context || document;
                var elements = context.querySelectorAll(selector);
                return [].slice.call(elements);
            };

            function _fncSliderInit($slider, options) {
                var prefix = ".fnc-";

                var $slider = $slider;
                var $slidesCont = $slider.querySelector(prefix + "slider__slides");
                var $slides = $$(prefix + "slide", $slider);
                var $controls = $$(prefix + "nav__control", $slider);
                var $controlsBgs = $$(prefix + "nav__bg", $slider);
                var $progressAS = $$(prefix + "nav__control-progress", $slider);

                var numOfSlides = $slides.length;
                var curSlide = 1;
                var sliding = false;
                var slidingAT = +parseFloat(getComputedStyle($slidesCont)["transition-duration"]) * 1000;
                var slidingDelay = +parseFloat(getComputedStyle($slidesCont)["transition-delay"]) * 1000;

                var autoSlidingActive = false;
                var autoSlidingTO;
                var autoSlidingDelay = 5000; // default autosliding delay value
                var autoSlidingBlocked = false;

                var $activeSlide;
                var $activeControlsBg;
                var $prevControl;

                function setIDs() {
                    $slides.forEach(function ($slide, index) {
                        $slide.classList.add("fnc-slide-" + (index + 1));
                    });

                    $controls.forEach(function ($control, index) {
                        $control.setAttribute("data-slide", index + 1);
                        $control.classList.add("fnc-nav__control-" + (index + 1));
                    });

                    $controlsBgs.forEach(function ($bg, index) {
                        $bg.classList.add("fnc-nav__bg-" + (index + 1));
                    });
                };

                setIDs();

                function afterSlidingHandler() {
                    $slider.querySelector(".m--previous-slide").classList.remove("m--active-slide", "m--previous-slide");
                    $slider.querySelector(".m--previous-nav-bg").classList.remove("m--active-nav-bg", "m--previous-nav-bg");

                    $activeSlide.classList.remove("m--before-sliding");
                    $activeControlsBg.classList.remove("m--nav-bg-before");
                    $prevControl.classList.remove("m--prev-control");
                    $prevControl.classList.add("m--reset-progress");
                    var triggerLayout = $prevControl.offsetTop;
                    $prevControl.classList.remove("m--reset-progress");

                    sliding = false;
                    var layoutTrigger = $slider.offsetTop;

                    if (autoSlidingActive && !autoSlidingBlocked) {
                        setAutoslidingTO();
                    }
                };

                function performSliding(slideID) {
                    if (sliding) return;
                    sliding = true;
                    window.clearTimeout(autoSlidingTO);
                    curSlide = slideID;

                    $prevControl = $slider.querySelector(".m--active-control");
                    $prevControl.classList.remove("m--active-control");
                    $prevControl.classList.add("m--prev-control");
                    $slider.querySelector(prefix + "nav__control-" + slideID).classList.add("m--active-control");

                    $activeSlide = $slider.querySelector(prefix + "slide-" + slideID);
                    $activeControlsBg = $slider.querySelector(prefix + "nav__bg-" + slideID);

                    $slider.querySelector(".m--active-slide").classList.add("m--previous-slide");
                    $slider.querySelector(".m--active-nav-bg").classList.add("m--previous-nav-bg");

                    $activeSlide.classList.add("m--before-sliding");
                    $activeControlsBg.classList.add("m--nav-bg-before");

                    var layoutTrigger = $activeSlide.offsetTop;

                    $activeSlide.classList.add("m--active-slide");
                    $activeControlsBg.classList.add("m--active-nav-bg");

                    setTimeout(afterSlidingHandler, slidingAT + slidingDelay);
                };



                function controlClickHandler() {
                    if (sliding) return;
                    if (this.classList.contains("m--active-control")) return;
                    if (options.blockASafterClick) {
                        autoSlidingBlocked = true;
                        $slider.classList.add("m--autosliding-blocked");
                    }

                    var slideID = +this.getAttribute("data-slide");

                    performSliding(slideID);
                };

                $controls.forEach(function ($control) {
                    $control.addEventListener("click", controlClickHandler);
                });

                function setAutoslidingTO() {
                    window.clearTimeout(autoSlidingTO);
                    var delay = +options.autoSlidingDelay || autoSlidingDelay;
                    curSlide++;
                    if (curSlide > numOfSlides) curSlide = 1;

                    autoSlidingTO = setTimeout(function () {
                        performSliding(curSlide);
                    }, delay);
                };

                if (options.autoSliding || +options.autoSlidingDelay > 0) {
                    if (options.autoSliding === false) return;

                    autoSlidingActive = true;
                    setAutoslidingTO();

                    $slider.classList.add("m--with-autosliding");
                    var triggerLayout = $slider.offsetTop;

                    var delay = +options.autoSlidingDelay || autoSlidingDelay;
                    delay += slidingDelay + slidingAT;

                    $progressAS.forEach(function ($progress) {
                        $progress.style.transition = "transform " + (delay / 1000) + "s";
                    });
                }

                $slider.querySelector(".fnc-nav__control:first-child").classList.add("m--active-control");

            };

            var fncSlider = function (sliderSelector, options) {
                var $sliders = $$(sliderSelector);

                $sliders.forEach(function ($slider) {
                    _fncSliderInit($slider, options);
                });
            };

            window.fncSlider = fncSlider;
        }());

    /* not part of the slider scripts */

    /* Slider initialization
    options:
    autoSliding - boolean
    autoSlidingDelay - delay in ms. If audoSliding is on and no value provided, default value is 5000
    blockASafterClick - boolean. If user clicked any sliding control, autosliding won't start again
    */
    fncSlider(".example-slider", { autoSlidingDelay: 4000 });

    var $demoCont = document.querySelector(".hero");


    document.querySelector(".js-activate-global-blending").addEventListener("click", function () {
        document.querySelector(".example-slider").classList.toggle("m--global-blending-active");
    });
   


})
 

var counted = 0;
$(window).scroll(function () {

    var oTop = $('#counter').offset().top - window.innerHeight;
    if (counted == 0 && $(window).scrollTop() > oTop) {
        $('.count').each(function () {
            var $this = $(this),
                countTo = $this.attr('data-target');
            $({
                countNum: $this.text()
            }).animate({
                countNum: countTo
            },

                {
                    duration: 4000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                        //alert('finished');
                    }

                });
        });
        counted = 1;
    }

});



const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});

/**owl-carousel  */
$('.slider-wrapper .owl-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000,
    items: 1,
    animateOut: 'fadeOut',
    nav: false,
    dots: false
});

