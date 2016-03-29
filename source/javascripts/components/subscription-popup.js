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

  SubscriptionPopup.prototype.submitEmail = function() {
    email = $('#subscription-popup-email').val();
    $.ajax({
      method: "POST",
      url: "http://skabu-crm.herokuapp.com/users",
      headers: {
        accept: 'application/json',
      },
      contentType: 'application/json',
      data: JSON.stringify({ user: { email: email } })
    })
      .done(function(data) {
        console.log(data);
      });
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
