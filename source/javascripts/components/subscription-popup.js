//= require jquery/dist/jquery
//= require magnific-popup/dist/jquery.magnific-popup

OnIdle = function(time, callback) {

  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;

  function resetTimer() {
    clearTimeout(window.popupTimer);
    window.popupTimer = setTimeout(callback, time)
  }

}

SubscriptionPopup = function() {

  trackPopupOpen = function(name) {
     ga('send', 'event', 'popup', 'open', name);
  }

  OnIdle(20000, function(t) {
    $.magnificPopup.open({
      items: {
        src: '#subscription-popup',
        type: 'inline',
      },
      callbacks: {
        open: function() {
          window.onload = undefined;
          document.onmousemove = undefined;
          document.onkeypress = undefined;
          clearTimeout(window.popupTimer);

          trackPopupOpen('email-subscription');
        }
      }
    });
  });
};
