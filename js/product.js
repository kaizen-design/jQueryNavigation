const APP = {
  init: () => {
    const $basket = document.querySelector('.basket');
    const $productPreview = document.querySelector('.product-preview-slider');
    const $modalEl = document.querySelector('#productModal');
    const $productModal = new bootstrap.Modal($modalEl);
    const $closeModalBtn = document.querySelector('#productModal .back-btn');
    const $backBtn = document.querySelector('footer .back-btn');
    const $addToCartBtn = document.querySelector('.add-to-cart-btn');
    const $minusBtn = document.getElementById('minusBtn');
    const $plusBtn = document.getElementById('plusBtn');
    const $quantity = document.getElementById('quantity');
    const $productDescription = document.querySelector('.product-description');
    //const $productOptions = document.querySelectorAll('.product-description input:not([type=hidden])');
    const $datepicker = document.querySelector('.date-picker');

    let $calendar;

    if ($datepicker) {
      $datepicker.value = new Date().toLocaleDateString();
      /* $calendar = new AirDatepicker($datepicker, {
        selectedDates: [new Date()],
        inline: true
      }) */
    }

    const $productOptions = document.querySelectorAll('.product-description input:not([type=hidden])');

    if ($productDescription.scrollHeight > $productDescription.offsetHeight) {
      Array.from($productDescription.children).forEach(($child) => $child.classList.add('me-5'))
    }
    
    const $productSlider = new Swiper($productPreview, {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 30,
      effect: "fade",
      pagination: {
        el: `.product-preview-slider .swiper-pagination`,
        type: "bullets",
      },
      autoplay: {
        delay: 5000,
      },
    });

    const $modalSlider = new Swiper(document.querySelector('.product-modal-slider'), {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 30,
      effect: "fade",
      pagination: {
        el: `.product-modal-slider .swiper-pagination`,
        type: "bullets",
      },
      autoplay: {
        delay: 5000,
      },
    });

    $modalEl.addEventListener('shown.bs.modal', event => {
      $modalSlider.update();
      $modalSlider.autoplay.start();      
    })
    
    $productPreview.setAttribute('tabindex', '0');
    $productPreview.focus();
    $productPreview.classList.add('active');

    let activeOption = 0;

    $productPreview.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 38: //UP arrow
          $productPreview.classList.remove('active');
          $basket.focus();
          break;
        case 39: //RIGHT arrow
          e.preventDefault();
          if ($productOptions) {
            $productPreview.classList.remove('active');
            $productOptions[activeOption].focus();
          }
          break;
        case 40: //DOWN arrow
          e.preventDefault();
          $productPreview.classList.remove('active');
          $addToCartBtn.focus();
          break;
        case 13: //OK button
          e.preventDefault();
          $productModal.show();
          //$productModal.setAttribute('tabindex', '0');
          break;
        default:
          console.log('Key code : ' + e.keyCode);
    		  break;
    	}
    });

    if ($productOptions) {
      $productOptions.forEach((option) => {
        option.addEventListener('keydown', function(e) {
          switch(e.keyCode){
            case 37: //LEFT arrow
              e.preventDefault();
              if ($productOptions[activeOption - 1] && $productOptions[activeOption - 1].classList.contains('btn-check')) {
                $productOptions[activeOption - 1].focus();
                activeOption -= 1;
              } else {
                $productPreview.classList.add('active');
                $productPreview.focus();
              }              
              break;
            case 38: //UP arrow
              e.preventDefault();
              if ($productOptions[activeOption - 1]) {
                $productOptions[activeOption - 1].focus();
                if ($productOptions[activeOption - 1].getBoundingClientRect().top < $productDescription.offsetHeight / 2) {
                  $productDescription.scrollTop -= 500
                }
                activeOption -= 1;
              } else {
                $productDescription.scrollTop = 0;
                $basket.focus();
              }
              break;
            case 39: //RIGHT arrow
              e.preventDefault();
              if ($productOptions[activeOption + 1] && $productOptions[activeOption + 1].classList.contains('btn-check')) {
                $productOptions[activeOption + 1].focus();
                activeOption += 1;
              } else {
                $productPreview.classList.add('active');
                $productPreview.focus();
              }
              break;
            case 40: //DOWN arrow
              e.preventDefault();
              if ($productOptions[activeOption + 1]) {
                $productOptions[activeOption + 1].focus({ preventScroll: true });
                if ($productOptions[activeOption + 1].getBoundingClientRect().top > $productDescription.offsetHeight) {
                  $productDescription.scrollTop += 500
                }
                activeOption += 1;
              } else {
                $addToCartBtn.focus();
              }
              break;
            case 13 || 32: //OK || Space button
              e.preventDefault();
              /* console.log('calendar')
              if ($calendar && $productOptions[activeOption].classList.contains('date-picker')) {
                $calendar.open();
              } */
              if($productOptions[activeOption].checked == false) {
                $productOptions[activeOption].checked = true; 
              }
              else {
                if($productOptions[activeOption].checked == true) {
                    $productOptions[activeOption].checked = false; 
                }   
              }
              break;
            default:
              console.log('Key code : ' + e.keyCode);
              break;
          }
        });
      });
    }

    $addToCartBtn.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 37: //LEFT arrow
          e.preventDefault();
          if ($plusBtn) {
            $plusBtn.focus();
          }
          break;
        case 38: //UP arrow
          $productPreview.classList.add('active');
          $productPreview.focus();
          break;
        case 39: //RIGHT arrow
          e.preventDefault();
          $backBtn.focus();
          break;
        case 40: //DOWN arrow
          e.preventDefault();
          
          break;
        case 13: //OK button
          e.preventDefault();
          console.log('Added to cart')
          break;
        default:
          console.log('Key code : ' + e.keyCode);
    		  break;
    	}
    });

    if ($plusBtn) {
      $plusBtn.addEventListener('keydown', function(e) {
        switch(e.keyCode){
          case 37: //LEFT arrow
            e.preventDefault();
            if ($minusBtn) {
              $minusBtn.focus();
            }
            break;
          case 38: //UP arrow
            $productPreview.classList.add('active');
            $productPreview.focus();
            break;
          case 39: //RIGHT arrow
            e.preventDefault();
            $addToCartBtn.focus();
            break;
          case 13: //OK button
            e.preventDefault();
            const value = parseInt($quantity.textContent);
            $quantity.innerText = value + 1;
            break;
          default:
            console.log('Key code : ' + e.keyCode);
            break;
        }
      });
    }
    
    if ($minusBtn) {
      $minusBtn.addEventListener('keydown', function(e) {
        switch(e.keyCode){
          case 38: //UP arrow
            $productPreview.classList.add('active');
            $productPreview.focus();
            break;
          case 39: //RIGHT arrow
            e.preventDefault();
            $plusBtn.focus();
            break;
          case 13: //OK button
            e.preventDefault();
            const value = parseInt($quantity.textContent);
            if (value > 1) {
              $quantity.innerText = value - 1;
            }
            break;
          default:
            console.log('Key code : ' + e.keyCode);
            break;
        }
      });
    }
    

    $basket.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 13: //OK button
          e.preventDefault();
          console.log('Go to basket')
          break;
        case 40: //DOWN arrow
          e.preventDefault();
          if ($productOptions) {
            $productOptions[activeOption].focus({ preventScroll: true });
          }
          break;
        default:
          console.log('Key code : ' + e.keyCode);
    		  break;
    	}
    });

    $modalEl.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 37: //LEFT arrow
          e.preventDefault();
          console.log('Left arrow pressed');
          $modalSlider.update();
          $modalSlider.slidePrev();
          break;
        case 39: //RIGHT arrow
          e.preventDefault();
          console.log('Right arrow pressed')
          $modalSlider.update();
          $modalSlider.slideNext();
          break;  
        case 13: //OK button
          break;
        case 38: //UP arrow
          e.preventDefault();
          $modalEl.focus();
          break;  
        case 40: //DOWN arrow
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
        case 37: //LEFT arrow
          e.preventDefault();
          if ($addToCartBtn) {
            $addToCartBtn.focus();
          }
          break;
        case 38: //UP arrow
          e.preventDefault();
          if ($productOptions) {
            $productOptions[activeOption].focus({ preventScroll: true });
          }
          break;
        case 13: //OK button
          e.preventDefault();
          window.location.href = $backBtn.getAttribute('href');
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