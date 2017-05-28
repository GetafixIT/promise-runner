promise-runner
==============

A node module that processes each item in an array, firing a promise for each item, and resolving a promise on completion. Useful for sequential processing of things which may take a while but are dependent on the previous step. This is effectively a non blocking, sequential processor. Useful for automation.

The run function takes the following parameters: array (Array), startingIndex (Int), iterationCallback (Promise) and params (Object). It returns a promise and which resolves on complettion of the sequence or when escaped by resolving the iterationCallback params.emd set to true. 

The iterationCallback function should return a promise. It receives 3 params (originalArray, currentIndex, params). If you are aggregating values, you can pass them through the sequence by resolving the iterationCallback with params as shown below.

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

