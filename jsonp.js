/*
* Lightweight JSONP fetcher
* Copyright 2010 Erik Karlsson. All rights reserved.
* BSD licensed
*/


/*
* Usage:
* 
* JSONP.get( 'someUrl.php', {param1:'123', param2:'456'}, function(data){
*   //do something with data, which is the JSON object you should retrieve from someUrl.php
* });
*/
var JSONP = (function(){
	var counter = 0, head, query, key, window = this;
	function load(url, failureCallback) {
		var script = document.createElement('script'),
			done = false;
		script.src = url;
		script.async = true;
 
		script.onerror = function() { 
			failureCallback(); 
		}
		script.onload = script.onreadystatechange = function() {
			if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
				done = true;
				script.onload = script.onreadystatechange = null;
				if ( script && script.parentNode ) {
					script.parentNode.removeChild( script );
				}
			}
		};
		if ( !head ) {
			head = document.getElementsByTagName('head')[0];
		}
		head.appendChild( script );
	}
	function jsonp(url, params, callback, failureCallback) {
		query = "?";
		params = params || {};
		for ( key in params ) {
			if ( params.hasOwnProperty(key) ) {
				query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
			}
		}
		var jsonp = "json" + (++counter);
		window[ jsonp ] = function(data){
			callback(data);
			try {
				delete window[ jsonp ];
			} catch (e) {}
			window[ jsonp ] = null;
		};
 
		load(url + query + "callback=" + jsonp, failureCallback);
		return jsonp;
	}
	return {
		get:jsonp
	};
}());
