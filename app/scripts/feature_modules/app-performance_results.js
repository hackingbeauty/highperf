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

app.performance_results = (function () {
  'use strict';
  
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html         : Handlebars.compile($('#app-performance-results-template').html()),
      results_list_html : Handlebars.compile($('#app-performance-results-list-template').html())
    },
    stateMap  = { $container : null },
    jqueryMap = {},

    showResults,

    setJqueryMap, configModule, initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // example : getTrimmedString
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$append_target.find('#app-performance-results');

    jqueryMap = { $container : $container };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  showResults = function( evt, results ){
    jqueryMap.$container.show();
    jqueryMap.$container.append(
      configMap.results_list_html({
        speedScore: results.ruleGroups.SPEED.score,
        numberResources         : results.pageStats.numberResources,
        cssResponseBytes        : parseInt( results.pageStats.cssResponseBytes / 1000 ),
        htmlResponseBytes       : parseInt( results.pageStats.htmlResponseBytes / 1000 ),
        imageResponseBytes      : parseInt( results.pageStats.imageResponseBytes / 1000 ),
        javascriptResponseBytes : parseInt( results.pageStats.javascriptResponseBytes / 1000 ),
        numberCssResources      : results.pageStats.numberCssResources,
        numberHosts             : results.pageStats.numberHosts,
        numberJsResources       : results.pageStats.numberJsResources,
        numberStaticResources   : results.pageStats.numberStaticResources,
        otherResponseBytes      : parseInt( results.pageStats.otherResponseBytes / 1000 ),
        totalRequestBytes       : parseInt( results.pageStats.totalRequestBytes / 1000 ),
        results                 : results,
        pageStats               : results.pageStats
      })
    )
    console.log('THE RESULTS ARE: ', results);
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
    $.gevent.subscribe( jqueryMap.$container, 'app-show-results', showResults );
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
