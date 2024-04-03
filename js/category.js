const APP = {
  init: () => {
    const $basket = document.querySelector('.basket');
    const $categoryMenu = document.querySelector(".category-slider");
    const $productMenu = document.querySelector(".product-slider");
    const $backBtn = document.querySelector('.back-btn');
    
    //if (!$productMenu) return;

    const $categoryMenuSlider = new Swiper($categoryMenu, {
      slidesPerView: 'auto',
      spaceBetween: 4,
      navigation: {
        nextEl: `.category-menu .next-btn`,
        prevEl: `.category-menu .prev-btn`
      }
    });
    
    const $productMenuSlider = new Swiper($productMenu, {
      slidesPerView: 3,
      spaceBetween: 48,
      navigation: {
        nextEl: `.product-menu .next-btn`,
        prevEl: `.product-menu .prev-btn`
      }
    });
    
    const $categories = $categoryMenu.querySelectorAll('.slider-item');
    const $products = $productMenu.querySelectorAll('.slider-item');
    
    $categories[0].focus();
    $categories[0].classList.add('active');

    let activeCategoryIndex = 0, 
        activeCategorySlide = 0;
        activeProductIndex = 0, 
        activeProductSlide = 0;

        //console.log($categoryMenu.getBoundingClientRect())
        //console.log($categories[activeCategoryIndex].getBoundingClientRect().right)

    $categoryMenu.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 37: //LEFT arrow
          e.preventDefault();
          if ($categories[activeCategoryIndex - 1]) {
            
            activeCategoryIndex -= 1;
            $categories.forEach(($el) => $el.classList.remove('active'));
            $categories[activeCategoryIndex].classList.add('active');
            if (activeCategoryIndex === activeCategorySlide - 1) {
              $categoryMenuSlider.slidePrev();
              activeCategorySlide -= 1;
            }
          }
          break;
        case 38: //UP arrow
          //$categories.forEach(($el) => $el.classList.remove('active'));
          $basket.focus();
          break;
        case 39: //RIGHT arrow
          e.preventDefault();
          if ($categories[activeCategoryIndex + 1]) {
            
            activeCategoryIndex += 1;
            $categories.forEach(($el) => $el.classList.remove('active'));
            $categories[activeCategoryIndex].classList.add('active');
            if (activeCategoryIndex > activeCategorySlide + 2) {
              $categoryMenuSlider.slideNext();
              activeCategorySlide += 1;
            }
          }
          break;
        case 40: //DOWN arrow
          e.preventDefault();
          activeProductIndex = 0;
          //$categories.forEach(($el) => $el.classList.remove('active'));
          $products[activeProductIndex].classList.add('active');
          $products[activeProductIndex].focus();
          break;
        case 13: //OK button
          e.preventDefault();
          $products[activeProductIndex].classList.add('active');
          $products[activeProductIndex].focus();
          //window.location.href = $categories[activeIndex].getAttribute('href');
          break;
        case 10009: //RETURN button
          //tizen.application.getCurrentApplication().exit();
          break;
        default:
          console.log('Key code : ' + e.keyCode);
    		  break;
    	}
    });

    $productMenu.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 37: //LEFT arrow
          e.preventDefault();
          if ($products[activeProductIndex - 1]) {
            activeProductIndex -= 1;
            $products.forEach(($el) => $el.classList.remove('active'));
            $products[activeProductIndex].classList.add('active');
            if (activeProductIndex === activeProductSlide - 1) {
              $productMenuSlider.slidePrev();
              activeProductSlide -= 1;
            }
          }
          break;
        case 38: //UP arrow
          $products.forEach(($el) => $el.classList.remove('active'));
          $categories[activeCategorySlide].focus();
          break;
        case 39: //RIGHT arrow
          e.preventDefault();
          if ($products[activeProductIndex + 1]) {
            activeProductIndex += 1;
            $products.forEach(($el) => $el.classList.remove('active'));
            $products[activeProductIndex].classList.add('active');
            if (activeProductIndex > activeProductSlide + 2) {
              $productMenuSlider.slideNext();
              activeProductSlide += 1;
            }
          }
          break;
        case 40: //DOWN arrow
          e.preventDefault();
          $products.forEach(($el) => $el.classList.remove('active'));
          $backBtn.focus();
          break;
        case 13: //OK button
          e.preventDefault();
          window.location.href = $products[activeProductIndex].getAttribute('href');
          break;
        case 10009: //RETURN button
          //tizen.application.getCurrentApplication().exit();
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
          $products[activeProductIndex].classList.add('active');
          $products[activeProductSlide].focus();
          break;
        case 13: //OK button
          e.preventDefault();
          window.location.href = $backBtn.getAttribute('href');
          break;
        case 10009: //RETURN button
          //tizen.application.getCurrentApplication().exit();
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
          //$categories[activeCategoryIndex].classList.add('active');
          $categories[activeCategorySlide].focus();
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