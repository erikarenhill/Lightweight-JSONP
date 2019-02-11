# Lightweight JSONP 
### Javascript Library for making JSON requests easy.

No external dependencies except running tests/sample

Usage:
```javascript
/* 
* This will make a request for the url 
* /test?otherParam1&param1=a&param2=b&callback=json{N}  where {N} is an auto incrementing counter
* and then callback your function with the response.
* Fourth parameter is if you want to override the "callback" named parameter. 
*/
JSONP.get('/test?otherParam=1', {param1:'a', param2:'b'}, function(response){
	console.log(response);
}/* , "overrideCallbackName" */);
```

To run the sample:
```
yarn
yarn start
```

Software delivered as is. Have fun and don't be evil.