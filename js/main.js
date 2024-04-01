const APP = {
  init: () => {
    APP.initSlider(".product-preview-slider");
    APP.initSlider(".product-modal-slider");
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