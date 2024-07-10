const APP = {
  init: () => {
    const $orderList = document.querySelector(".orders-list");
    const $backBtn = document.querySelector('.back-btn');
    const $orderItems = $orderList.querySelectorAll('.order-item');

    let activeIndex = 0;

    if ($orderItems) {
      $orderItems.forEach(($el) => $el.setAttribute('tabindex', '0'));
      $orderItems[activeIndex].focus();
      $orderItems[activeIndex].classList.add('active');
      $orderItems.forEach(($item) => {
        $item.addEventListener('keydown', function(e) {
          switch(e.keyCode) {
            case 40: //DOWN arrow
              e.preventDefault();
              if ($orderItems[activeIndex + 1]) {
                activeIndex += 1;
                $orderItems.forEach(($el) => $el.classList.remove('active'));
                $orderItems[activeIndex].classList.add('active');
                $orderItems[activeIndex].focus();
                if ($orderItems[activeIndex].getBoundingClientRect().top > $orderList.offsetHeight) {
                  $orderList.scrollTop += 500
                }
              } else {
                $orderItems.forEach(($el) => $el.classList.remove('active'));
                $backBtn.focus();
              }
              break;
            case 38: //UP arrow
              e.preventDefault();
              if ($orderItems[activeIndex - 1]) {
                activeIndex -= 1;
                $orderItems.forEach(($el) => $el.classList.remove('active'));
                $orderItems[activeIndex].classList.add('active');
                $orderItems[activeIndex].focus();
                if ($orderItems[activeIndex].getBoundingClientRect().top < $orderList.offsetHeight / 2) {
                  $orderList.scrollTop -= 500
                }
              } else {
                $orderItems[activeIndex].focus();
                $orderList.scrollTop = 0
              }
              break;
            case 13: //OK button
              e.preventDefault();
              openMessageModal($orderItems[activeIndex]); // TODO: remove this
              break;
          }
        });

      })
    }

    $backBtn.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
        case 38: //UP arrow
          e.preventDefault();
          $orderItems[activeIndex].classList.add('active');
          $orderItems[activeIndex].focus();
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