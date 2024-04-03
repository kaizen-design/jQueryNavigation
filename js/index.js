const APP = {
  init: () => {
    const $basket = document.querySelector('.basket');
    const $mainMenu = document.querySelector(".menu-slider");
    const $backBtn = document.querySelector('.back-btn');
    
    //if (!$mainMenu) return;
    
    const $mainMenuSlider = new Swiper($mainMenu, {
      slidesPerView: 4,
      spaceBetween: 16,
      navigation: {
        nextEl: `.main-menu .next-btn`,
        prevEl: `.main-menu .prev-btn`
      }
    });
    
    const $menuItems = $mainMenu.querySelectorAll('.slider-item');
    $menuItems[0].focus();
    $menuItems[0].classList.add('active');

    let activeIndex = 0, activeSlide = 0;

    $mainMenu.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 37: //LEFT arrow
          e.preventDefault();
          if ($menuItems[activeIndex - 1]) {
            activeIndex -= 1;
            $menuItems.forEach(($el) => $el.classList.remove('active'));
            $menuItems[activeIndex].classList.add('active');
            if (activeIndex === activeSlide - 1) {
              $mainMenuSlider.slidePrev();
              activeSlide -= 1;
            }
          }
          break;
        case 38: //UP arrow
          $menuItems.forEach(($el) => $el.classList.remove('active'));
          $basket.focus();
          break;
        case 39: //RIGHT arrow
          e.preventDefault();
          if ($menuItems[activeIndex + 1]) {
            activeIndex += 1;
            $menuItems.forEach(($el) => $el.classList.remove('active'));
            $menuItems[activeIndex].classList.add('active');
            if (activeIndex > activeSlide + 3) {
              $mainMenuSlider.slideNext();
              activeSlide += 1;
            }
          }
          break;
        case 40: //DOWN arrow
          e.preventDefault();
          $menuItems.forEach(($el) => $el.classList.remove('active'));
          $backBtn.focus();
          break;
        case 13: //OK button
          e.preventDefault();
          window.location.href = $menuItems[activeIndex].getAttribute('href');
          break;
        case 10009: //RETURN button
          tizen.application.getCurrentApplication().exit();
          break;
        default:
          console.log('Key code : ' + e.keyCode);
    		  break;
    	}
    });

    $backBtn.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 38: //UP arrow
          e.preventDefault();
          $menuItems[activeIndex].classList.add('active');
          $menuItems[activeSlide].focus();
          break;
        case 13: //OK button
          tizen.application.getCurrentApplication().exit();
          break;
        case 10009: //RETURN button
          tizen.application.getCurrentApplication().exit();
          break;
        default:
          console.log('Key code : ' + e.keyCode);
    		  break;
    	}
    });

    $basket.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 13: //OK button
          console.log('Go to basket')
          break;
        case 40: //DOWN arrow
          $menuItems[activeIndex].classList.add('active');
          $menuItems[activeSlide].focus();
          break;
        default:
          console.log('Key code : ' + e.keyCode);
    		  break;
    	}
    });
  }  
};

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  APP.init();
} else {
  document.addEventListener("DOMContentLoaded", APP.init);
}