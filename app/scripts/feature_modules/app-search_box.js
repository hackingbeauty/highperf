/*
 * module_template.js
 * <Module name> feature module
*/

/*jslint         browser    : true, continue : true,
  devel  : true, indent     : 2,    maxerr   : 50,
  newcap : true, nomen      : true, plusplus : true,
  regexp : true, sloppy     : true, vars     : false,
  white  : true, camelcase  : false
*/

/*global $, app, Handlebars */

app.search_box = (function () {
  'use strict';
  
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html: Handlebars.compile($('#app-search-box-template').html())
    },
    stateMap  = { $container : null },
    jqueryMap = {},

    startProgressBar,
    stopProgressBar,
    onSearchBtnClick,

    setJqueryMap, configModule, initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  stopProgressBar = function(){
    jqueryMap.$progressBar.hide();
    jqueryMap.$progressBar.find('.progress-bar').css('width', '0%');
  };

  startProgressBar = function(){
    var widthCount = 0;
    var widthPercent;
    jqueryMap.$progressBar.show();
    setInterval(function(){
      if(widthCount < 100){
        widthCount++;
        widthPercent = widthCount + '%';
        jqueryMap.$progressBar.find('.progress-bar').css('width', widthPercent);
      } else {
        clearInterval();
      }
    },30);
  };
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$append_target.find('#app-search-box');

    jqueryMap = { 
      $container        : $container, 
      $searchBoxInput   : $container.find('#app-search-box-input'),
      $searchBtn        : $container.find('#app-search-btn'),
      $progressBar      : $container.find('#app-progress-bar')
    };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  onSearchBtnClick = function(){
    var page;
    jqueryMap.$searchBtn.on('click', function(){
      page = jqueryMap.$searchBoxInput.val();
      if(true){
        startProgressBar();
        
        app.model.result.get_all( page );
      } else {
        alert('bad url dude');
      }
    });
  };
  //-------------------- END EVENT HANDLERS --------------------



  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin public method /configModule/
  // Purpose    : Adjust configuration of allowed keys
  // Arguments  : A map of settable keys and values
  //   * color_name - color to use
  // Settings   :
  //   * configMap.settable_map declares allowed keys
  // Returns    : true
  // Throws     : none
  //
  configModule = function ( input_map ) {
    app.butil.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };
  // End public method /configModule/

  // Begin public method /initModule/
  // Purpose    : Initializes module
  // Arguments  :
  //  * $container the jquery element used by this feature
  // Returns    : true
  // Throws     : none
  //
  initModule = function ( $append_target ) {
    stateMap.$append_target = $append_target;
    $append_target.append( configMap.main_html );
    setJqueryMap();
    onSearchBtnClick();
    $.gevent.subscribe( jqueryMap.$container, 'app-show-results', stopProgressBar );
    return true;
  };
  // End public method /initModule/

  // return public methods
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
