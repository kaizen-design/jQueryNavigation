const APP = {
  init: () => {
    const $checkoutBtn = document.querySelector('.checkout-btn');
    const $cartList = document.querySelector(".cart-list");
    const $backBtn = document.querySelector('.back-btn');
    const $cartItems = $cartList.querySelectorAll('.cart-item');
    const $actionButtons = document.querySelectorAll(".btn-dark");

    let activeIndex = 0;

    if ($cartItems) {
      $cartItems.forEach(($el) => $el.setAttribute('tabindex', '0'));
      $cartItems[activeIndex].focus();
      $cartItems[activeIndex].classList.add('active');
      $cartItems.forEach(($item) => {
        $item.addEventListener('keydown', function(e) {
          switch(e.keyCode) {
            case 40: //DOWN arrow
              e.preventDefault();
              if ($cartItems[activeIndex + 1]) {
                activeIndex += 1;
                $cartItems.forEach(($el) => $el.classList.remove('active'));
                $cartItems[activeIndex].classList.add('active');
              } else {
                $cartItems.forEach(($el) => $el.classList.remove('active'));
                $checkoutBtn.focus();
              }
              break;
            case 38: //UP arrow
              e.preventDefault();
              if ($cartItems[activeIndex - 1]) {
                activeIndex -= 1;
                $cartItems.forEach(($el) => $el.classList.remove('active'));
                $cartItems[activeIndex].classList.add('active');
              }
              break;
          }
        });
      })
    }

    $checkoutBtn.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 38: //UP arrow
          e.preventDefault();
          $cartItems[activeIndex].classList.add('active');
          $cartItems[activeIndex].focus();
          break;
        case 39: //RIGHT arrow
          e.preventDefault();
          $backBtn.focus();
          break;
        case 13: //OK button
          /* tizen.application.getCurrentApplication().exit(); */
          break;
        case 10009: //RETURN button
          /* tizen.application.getCurrentApplication().exit(); */
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
          $checkoutBtn.focus();          
          break;
        case 38: //UP arrow
          e.preventDefault();
          $cartItems[activeIndex].classList.add('active');
          $cartItems[activeIndex].focus();
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

    $actionButtons.forEach(($btn) => {
      $btn.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
          e.target.classList.add("active");
          setTimeout(() => e.target.classList.remove("active"), 250);
        }
      });
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