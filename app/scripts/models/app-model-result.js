/*
 * app.model.js
 * Model initializer
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/* global TAFFY, $, app */

app.model.result = (function () {
  'use strict';
  var
    GOOGLE_PAGE_SPEED_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?',
    CHART_API_URL = 'http://chart.apis.google.com/chart?',

    get_all,
    show_all;

  get_all = function ( url, callback ) {
    var 
      s = document.createElement('script'),
      query;
    s.type = 'text/javascript';
    s.async = true;
    query = [
      'url=' + url,
      'callback=app.model.result.show_all',
      'key=' + app.config.get_api_key(),
    ].join('&');
    s.src = GOOGLE_PAGE_SPEED_URL + query;
    document.head.insertBefore(s, null);
  };

  show_all = function( results ){
    $.gevent.publish( 'app-show-results', [ results ] );
  }

  return {
    get_all    : get_all,
    show_all   : show_all
  };
  
}());
