/*
 * app.config.js
 * Configuration module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, app */

app.config = (function () {
	'use strict';
  	var		
  		configMap = {
			'dev': {
				'api-key' : 'YOUR PAGE SPEED INSIGHTS DEV MODE API KEY HERE'
			},
			'prod':{
				'api-key' : 'YOUR PAGE SPEED INSIGHTS PROD MODE API KEY HERE',
			}
		},
  		dataMode,
  		setDataMode,
  		getDataMode,
  		get_client_id,
  		get_api_key,
  		show_key;

  	get_api_key = function(){
  		return configMap[dataMode]['api-key'];
  	};

  	setDataMode = function ( mode ) {
		dataMode = mode;
	};

	getDataMode = function ( ) {
		return dataMode;
	};

	show_key = function () {
		console.log('----------- Credentials -----------');
		console.log('api-key: ', configMap[app.config.getDataMode()]['api-key']);
		console.log('-----------------------------------');
	};

	return {
		setDataMode		: setDataMode,
		getDataMode		: getDataMode,
		get_client_id	: get_client_id,
		get_api_key		: get_api_key,
		show_key		: show_key
	}; 
}());