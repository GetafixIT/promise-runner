promise-runner
==============

A node module that processes each item in an array, firing a callback promise function for each item, and returning a promise on completion

Usage
-----

```javascript
var runner = require('promise-runner');
var When = require('when');

var arr = [1,2,3]

var iteratorCallback = function(arr, i, params){
  var deferred = When.defer();

  if(arr[i] == 2){
    params.end = true;
    deferred.resolve(params);
  }

  console.log('Array', arr);
  console.log('Current index', i);
  console.log('Current value', arr[i]);
  console.log('Extra Params', params);
  console.log('********************');

  deferred.resolve(params);

  return deferred.promise;
}

runner.run(arr, arr.length-1, iteratorCallback, {someParam: 123, someOtherParam: 456}).then(function(){
  console.log('Done!');
});
```

