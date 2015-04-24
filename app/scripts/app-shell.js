/*
 * module_template.js
 * Template for browser feature modules
*/

/*jslint         browser    : true, continue : true,
  devel  : true, indent     : 2,    maxerr   : 50,
  newcap : true, nomen      : true, plusplus : true,
  regexp : true, sloppy     : true, vars     : false,
  white  : true, camelcase  : false
*/

/*global $, app, Handlebars, unescape */

app.shell = (function () {
  'use strict';

  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html: Handlebars.compile($('#app-shell-template').html())
    },
    stateMap  = { $container : null },
    jqueryMap = {},

    parseRoute,
    closeModalsOnClick,

    setJqueryMap,
    configModule,
    initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // example : getTrimmedString
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    jqueryMap = {
      $container        : $container,
      $shell            : $container.find('#app-shell'),
      $shellBody        : $container.find('#app-shell-body'),
      $headerContainer  : $('#app-header-container'),
    };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------

  closeModalsOnClick = function(){
    $('html').on('click',function( ){
      $.gevent.publish( 'app-close-modals', [ ] );
    });
  };

  parseRoute = function(){

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
  initModule = function ( $container ) {
    var dataMode;
    dataMode = window.location.host === 'localhost:9000' ? 'dev' : 'prod';
    app.config.setDataMode( 'prod' );
    console.log('----------- Data Mode = ' + app.config.getDataMode() + ' -----------');
    
    stateMap.$container = $container;
    $container.html(  configMap.main_html() );
    setJqueryMap();

    app.header.initModule                 ( jqueryMap.$headerContainer );
    app.login_modal.initModule            ( jqueryMap.$shellBody );
    app.alert_modal.initModule            ( jqueryMap.$shellBody );
    app.search_box.initModule             ( jqueryMap.$shellBody );
    // app.recent_insights.initModule        ( jqueryMap.$shellBody );
    app.performance_results.initModule    ( jqueryMap.$shellBody );

    closeModalsOnClick();
  
    $(window)
      .bind( 'hashchange', parseRoute );
    
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
