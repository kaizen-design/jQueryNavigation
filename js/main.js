const APP = {
  init: () => {
    APP.initSlider(".product-preview-slider");
    APP.initSlider(".product-modal-slider");
    APP.initMainMenu();
  },

  initMainMenu: () => {
    const $el = document.querySelector(".menu-slider");
    if ($el) {
      new Swiper($el, {
        slidesPerView: 4,
        spaceBetween: 48,
        navigation: {
            nextEl: `.main-menu .next-btn`,
            prevEl: `.main-menu .prev-btn`,
        }
      });
      const $menuItems = $el.querySelectorAll('.slider-item');
      $menuItems[0].focus();
      $menuItems[0].classList.add('active');
    }
  },

  initSlider: (selector) => {
    const $el = document.querySelector(selector);
    if ($el) {
      new Swiper($el, APP.createSliderOptions(selector));
    }
  },

  createSliderOptions: (selector) => {
    return {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 30,
      effect: "fade",
      keyboard: {
        enabled: true,
      },
      pagination: {
        el: `${selector} .swiper-pagination`,
        type: "bullets",
        clickable: true
      },
      autoplay: {
        delay: 5000,
      },
    };
  },
  
};

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  APP.init();
} else {
  document.addEventListener("DOMContentLoaded", APP.init);
}