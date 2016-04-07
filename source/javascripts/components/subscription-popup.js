//= require jquery/dist/jquery
//= require magnific-popup/dist/jquery.magnific-popup

OnIdle = function(time, callback) {

  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;
  document.touchstart = resetTimer;
  document.touchmove = resetTimer;

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
    $('body').append('<img height="1" width="1" style="display:none;" alt="" src="https://ct.pinterest.com/?tid=uO5ms9u0FHO&value=0.00&quantity=1"/>');
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

  if (Cookies.get('SubscriptionPopupModal') !== "true") {
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
            document.touchstart = undefined;
            document.touchmove = undefined;
            clearTimeout(window.popupTimer);
            Cookies.set('SubscriptionPopupModal', 'true', { expires: 7 });

            trackPopupOpen('email-subscription');
          }
        }
      });
    });
  }
};
