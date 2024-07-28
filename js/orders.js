const APP = {
  init: () => {
    const $orderList = document.querySelector(".orders-list");
    const $backBtn = document.querySelector('.back-btn');
    const $orderItems = $orderList.querySelectorAll('.order-item');
    const $deleteOrderModalEl = document.querySelector('#deleteOrderModal');
    const $deleteOrderModal = new bootstrap.Modal($deleteOrderModalEl);
    const $closeDeleteOrderModalBtn = $deleteOrderModalEl.querySelector('.close-modal-btn');
    const $deleteOrderModalBtn = $deleteOrderModalEl.querySelector('.delete-order-modal-btn');

    let activeIndex = 0;

    if ($orderItems) {
      const $initialFocusEl = $orderItems[activeIndex].querySelector('.item-details-btn');

      $orderItems.forEach(($el) => $el.setAttribute('tabindex', '0'));
      $initialFocusEl.focus();
      $orderItems[activeIndex].classList.add('active');
      $orderItems.forEach(($item) => {
        const $detailsBtn = $item.querySelector('.item-details-btn');
        const $deleteBtn = $item.querySelector('.item-delete-btn');
        const $itemDetailsList = $item.querySelector('.item-details-list');

        $detailsBtn.addEventListener('keydown', function(e) {
          switch(e.keyCode) {
            case 40: //DOWN arrow
              e.preventDefault();
              if ($orderItems[activeIndex + 1]) {
                activeIndex += 1;
                $orderItems.forEach(($el) => $el.classList.remove('active'));
                $orderItems[activeIndex].classList.add('active');
                $orderItems[activeIndex].querySelector('.item-details-btn').focus();
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
                $orderItems[activeIndex].querySelector('.item-details-btn').focus();
                if ($orderItems[activeIndex].getBoundingClientRect().top < $orderList.offsetHeight / 2) {
                  $orderList.scrollTop -= 500
                }
              } else {
                $orderItems[activeIndex].querySelector('.item-details-btn').focus();
                $orderList.scrollTop = 0
              }
              break;
            case 39: //RIGHT arrow
              e.preventDefault();
              if (!$deleteBtn.classList.contains('disabled')) {
                $deleteBtn.focus();
              }
              break;  
            case 13: //OK button
              e.preventDefault();
              if ($itemDetailsList.classList.contains('d-none')) {
                $itemDetailsList.classList.remove('d-none');
                if (activeIndex === $orderItems.length - 1) {
                  $orderList.scrollTop += 10000
                } 
              } else {
                $itemDetailsList.classList.add('d-none');
              }
              //openMessageModal($orderItems[activeIndex]); // TODO: remove this
              break;
          }
        }); 
        
        $deleteBtn.addEventListener('keydown', function(e) {
          switch(e.keyCode) {
            case 40: //DOWN arrow
              e.preventDefault();
              if ($orderItems[activeIndex + 1]) {
                activeIndex += 1;
                $orderItems.forEach(($el) => $el.classList.remove('active'));
                $orderItems[activeIndex].classList.add('active');
                if (!$orderItems[activeIndex].querySelector('.item-delete-btn').classList.contains('disabled')) {
                  $orderItems[activeIndex].querySelector('.item-delete-btn').focus();
                } else {
                  $orderItems[activeIndex].querySelector('.item-details-btn').focus();
                }
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
                if (!$orderItems[activeIndex].querySelector('.item-delete-btn').classList.contains('disabled')) {
                  $orderItems[activeIndex].querySelector('.item-delete-btn').focus();
                } else {
                  $orderItems[activeIndex].querySelector('.item-details-btn').focus();
                }
                if ($orderItems[activeIndex].getBoundingClientRect().top < $orderList.offsetHeight / 2) {
                  $orderList.scrollTop -= 500
                }
              } else {
                if (!$orderItems[activeIndex].querySelector('.item-delete-btn').classList.contains('disabled')) {
                  $orderItems[activeIndex].querySelector('.item-delete-btn').focus();
                } else {
                  $orderItems[activeIndex].querySelector('.item-details-btn').focus();
                }
                $orderList.scrollTop = 0
              }
              break;
            case 37: //LEFT arrow
              $detailsBtn.focus();
              break;
            case 13: //OK button
              e.preventDefault();
              $deleteOrderModal.show();
              //openMessageModal($orderItems[activeIndex]); // TODO: remove this
              break;
          }
        }); 
        
      })
    }

    $deleteOrderModalEl.addEventListener('shown.bs.modal', event => {
      $closeDeleteOrderModalBtn.focus();
    });
    $deleteOrderModalEl.addEventListener('hidden.bs.modal', event => {
      $orderItems[activeIndex].querySelector('.item-delete-btn').focus();
    });
  
    $closeDeleteOrderModalBtn.addEventListener('keydown', function(e) {
      switch(e.keyCode){
        case 39: //RIGHT arrow
          e.preventDefault();
          $deleteOrderModalBtn.focus();
          break;  
        case 13: //OK button
          e.preventDefault();
          $deleteOrderModal.hide();
          break;
        default:
          console.log('Key code : ' + e.keyCode);
          break;
      }
    });

    $deleteOrderModalBtn.addEventListener('keydown', function(e) {
      switch(e.keyCode){
        case 37: //LEFT arrow
        $closeDeleteOrderModalBtn.focus();
          break;
        case 13: //OK button
          e.preventDefault();
          $deleteOrderModal.hide();
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
          $orderItems[activeIndex].classList.add('active');
          $orderItems[activeIndex].querySelector('.item-details-btn').focus();
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