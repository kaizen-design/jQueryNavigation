Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
    }, []);
  }
});

function openMessageModal(
  $focusEl, 
  title = 'Заголовок окна', 
  text = 'Описание ошибки или текст сообщения.', 
  buttonText = 'OK'
) {
  const $messageModalEl = document.querySelector('#messageModal');
  const $messageModal = new bootstrap.Modal($messageModalEl);
  const $closeBtn = $messageModalEl.querySelector('.close-modal-btn');
  const $title = $messageModalEl.querySelector('.modal-title');
  const $text = $messageModalEl.querySelector('.modal-text');

  $messageModalEl.addEventListener('show.bs.modal', event => {
    if (title) {
      $title.textContent = title;
    }
    if (text) {
      $text.textContent = text;
    }
    if (buttonText) {
      $closeBtn.textContent = buttonText;
    }
  });

  $messageModal.show();

  $messageModalEl.addEventListener('shown.bs.modal', event => {
    $closeBtn.focus();
  });
  $messageModalEl.addEventListener('hidden.bs.modal', event => {
    $focusEl.focus();
  });

  $closeBtn.addEventListener('keydown', function(e) {
    switch(e.keyCode){
      case 13: //OK button
        e.preventDefault();
        $messageModal.hide();
        break;
      default:
        console.log('Key code : ' + e.keyCode);
        break;
    }
  });
}