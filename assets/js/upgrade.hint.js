(function() {
  var $hint = $(
    '<div class= "alert container fade in" id="upgrade-hint"> \
      <a href="#" class ="close" data-dismiss ="alert" >&times;</a> \
      <strong>Hi: </strong> \
      I bet you just landed from an ancient world! \
      Please upgrade your browser to the latest version for better experience. \
      ( <a href="http://www.google.com/chrome">Chrome</a>, \
        <a href="http://www.mozilla.org/en-US/firefox/all.html">Firefox</a>, \
        <a href="http://support.apple.com/downloads/#safari">Safari</a> ...) \
    </div>'
  );
  
  var wcookie = function(key, value) {
    document.cookie = [key, '=', value, '; '].join('');
  };
  
  var rcookie = function(key) {
    var cookies = document.cookie.split('; ');
    for(var i = 0; i < cookies.length; ++i) {
      var pair = cookies[i].split('=');
      if(pair[0] === key) return pair[1];
    }
    return null;
  };
  
  if(!rcookie('upgrade_hint_closed')) {
    $('header').first().after($hint.css({display: 'none'}));
    $hint.fadeIn('slow');
    
    $('.alert').alert();
    $('#upgrade-hint').bind('closed', function() {
      wcookie('upgrade_hint_closed', true);
    });
  }
})();
