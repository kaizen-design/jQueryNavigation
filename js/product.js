const APP = {
  init: () => {
    const $basket = document.querySelector('.basket');
    const $product = document.querySelector('.single-product');
    const $productPreview = document.querySelector('.product-preview-slider');
    const $modalEl = document.querySelector('#productModal');
    const $productModal = new bootstrap.Modal($modalEl);
    const $closeModalBtn = document.querySelector('#productModal .back-btn');
    const $backBtn = document.querySelector('footer .back-btn');
    
    const $productPreviewSlider = new Swiper($productPreview, {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 30,
      effect: "fade",
      pagination: {
        el: `.product-preview-slider .swiper-pagination`,
        type: "bullets",
        //clickable: true
      },
      autoplay: {
        delay: 5000,
      },
    });

    const $productModalSlider = new Swiper(document.querySelector('.product-modal-slider'), {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 30,
      effect: "fade",
      pagination: {
        el: `.product-modal-slider .swiper-pagination`,
        type: "bullets",
        //clickable: true
      },
      keyboard: {
        enabled: true,
      },
      autoplay: {
        delay: 5000,
      },
    });
    
    $productPreview.setAttribute('tabindex', '0');
    $productPreview.focus();
    $productPreview.classList.add('active');

    let isModalOpen = false;

    $productPreview.addEventListener('keydown', function(e) {
      console.log(e)
    	switch(e.keyCode){
        case 37: //LEFT arrow
          e.preventDefault();
          
          break;
        case 38: //UP arrow
          //$categories.forEach(($el) => $el.classList.remove('active'));
          $productPreview.classList.remove('active');
          $basket.focus();
          break;
        case 39: //RIGHT arrow
          e.preventDefault();
          
          break;
        case 40: //DOWN arrow
          e.preventDefault();
          
          break;
        case 13: //OK button
          e.preventDefault();
          $productModal.show();
          isModalOpen = true;
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
          $productPreview.focus();
          $productPreview.classList.add('active');
          break;
        default:
          console.log('Key code : ' + e.keyCode);
    		  break;
    	}
    });

    $modalEl.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 13: //OK button
          break;
        case 38: //UP arrow
          e.preventDefault();
          $modalEl.focus();
          break;  
        case 40: //DOWN arrow
          //$categories[activeCategoryIndex].classList.add('active');
          $closeModalBtn.focus();
          break;
        default:
          console.log('Key code : ' + e.keyCode);
    		  break;
    	}
    });

    $closeModalBtn.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 13: //OK button
          e.preventDefault();
          $productModal.hide();
          $productPreview.focus();
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
          //$products[activeProductIndex].classList.add('active');
          //$products[activeProductSlide].focus();
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