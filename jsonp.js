'use strict'
/*!
* Lightweight JSONP fetcher
* Copyright 2010-2019 Erik Arenhill. All rights reserved.
* BSD Zero Clause License
*/
var JSONP = (function(window){
	var counter = 0, head, config = {}, timeoutTimer;
	function load(url, onTimeout) {
		var script = document.createElement('script'),
			done = false,
			didTimeout = false;
		script.src = url;
		script.async = true;
 
		var errorHandler = config.error;
		if ( typeof errorHandler === 'function' ) {
			script.onerror = function(ex){
				_clearTimeout();
				errorHandler({url: url, event: ex});
			};
		}
		
		script.onload = script.onreadystatechange = function() {
			if ( !done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') ) {
				done = true;
				_clearTimeout();
				script.onload = script.onreadystatechange = null;
				if ( script && script.parentNode ) {
					script.parentNode.removeChild( script );
				}
			}
		};

		function _clearTimeout(){
			clearTimeout(timeoutTimer);
			timeoutTimer = null;
		}

		function triggerTimeout() {
			if ( typeof errorHandler === 'function' ) {
				errorHandler({url: url, event: new Error('Timeout')})
				onTimeout();
			}
		}

		if ( config.timeout ) {
			timeoutTimer = setTimeout(triggerTimeout, config.timeout)
		}
		
		if ( !head ) {
			head = document.getElementsByTagName('head')[0];
		}
		head.appendChild( script );
	}
	function encode(str) {
		return encodeURIComponent(str);
	}
	function jsonp(url, params, callback, callbackName) {
		var query = (url||'').indexOf('?') === -1 ? '?' : '&', key;
				
		callbackName = (callbackName||config['callbackName']||'callback');
		if ( !config['callbackName'] ) {
			callbackName = callbackName + '_jsonp_' + (++counter);
		}
		
		params = params || {};
		for ( key in params ) {
			if ( params.hasOwnProperty(key) ) {
				query += encode(key) + '=' + encode(params[key]) + '&';
			}
		}	
		
		var didTimeout = false;
		window[ callbackName ] = function(data){
			if ( !didTimeout ) {
				callback(data);
			}
			try {
				delete window[ callbackName ];
			} catch (e) {}
			window[ callbackName ] = null;
		};
 
		load(url + query + 'callback=' + callbackName, function(){didTimeout = true;});
		return callbackName;
	}
	function setDefaults(obj){
		config = obj;
	}
	return {
		get:jsonp,
		init:setDefaults
	}
}(window))

if ( typeof module !== 'undefined' ) {
	module.exports = JSONP
}