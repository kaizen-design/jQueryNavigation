const APP = {
  init: () => {
    APP.initSlider(".product-preview-slider");
    APP.initSlider(".product-modal-slider");
    APP.initMainMenu();
  },

  initMainMenu: () => {
    const $mainMenu = document.querySelector(".menu-slider");
    
    if (!$mainMenu) return;
    
    const swiper = new Swiper($mainMenu, {
      slidesPerView: 4,
      spaceBetween: 48,
      navigation: {
          nextEl: `.main-menu .next-btn`,
          prevEl: `.main-menu .prev-btn`,
      }
    });
    
    const $menuItems = $mainMenu.querySelectorAll('.slider-item');
    const menuLength = $menuItems.length;
    $menuItems[0].focus();
    $menuItems[0].classList.add('active');

    let activeIndex = 0;
    let activeSlide = 0;

    $mainMenu.addEventListener('keydown', function(e) {
      console.log(e);
      console.log(activeIndex, activeSlide)
    	switch(e.keyCode){
        case 37: //LEFT arrow
          e.preventDefault();
          console.log('Arrow left click');
          if ($menuItems[activeIndex - 1]) {
            activeIndex -= 1;
            $menuItems.forEach(($el) => $el.classList.remove('active'));
            $menuItems[activeIndex].classList.add('active');
            if (activeIndex === activeSlide - 1) {
              swiper.slidePrev();
              activeSlide -= 1;
            }
          }
          break;
        case 38: //UP arrow
          break;
        case 39: //RIGHT arrow
          e.preventDefault();
          e.stopPropagation();
          console.log('Arrow right click');
          if ($menuItems[activeIndex + 1]) {
            activeIndex += 1;
            $menuItems.forEach(($el) => $el.classList.remove('active'));
            $menuItems[activeIndex].classList.add('active');
            if (activeIndex > activeSlide + 3) {
              swiper.slideNext();
              activeSlide += 1;
            }
          }
          break;
        case 40: //DOWN arrow
          console.log('Down right click');
          const $backBtn = document.querySelector('.back-btn');
          $menuItems.forEach(($el) => $el.classList.remove('active'));
          $backBtn.focus();
          break;
        case 13: //OK button
          //e.preventDefault();
          window.location = $menuItems[activeIndex].getAttribute('href');
          break;
        case 10009: //RETURN button
          tizen.application.getCurrentApplication().exit();
          break;
        default:
          console.log('Key code : ' + e.keyCode);
    		  break;
    	}
    });
    
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