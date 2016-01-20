var debug           = false;
var When            = require('when');
var deferredRunner  = null;

var log = function(str){
  if(debug){
    console.log(str)
  }
};

function runner(arr, i, iteratorCB, params){
  // This is a recursive function to process the array sequentially using promises

  if(!deferredRunner){ deferredRunner = When.defer(); }

  if(!params){ var params = ''; }

  var iterationPromise = function(arr, i){
    var deferred  = When.defer();
    log('Starting:' + i);
    iteratorCB(arr, i, params)
      .then(function(params){
        log('Finishing:' + i);

        if(params.end === true){
            deferredRunner.resolve(true);
            deferredRunner  = null;
        }
        else{
            deferred.resolve([arr, i+1]);
        }

      });
    return deferred.promise;
  };

  iterationPromise(arr, i)
    .then(function(result){
      // Receives new item to process
      if(result[1] == result[0].length){
        // Completed list, resolve promise
        deferredRunner.resolve(true);
        deferredRunner = null;
      }
      else{
        // Recursive call to next item
        // result[0]: the array to process
        // result[1]: the index to process
        runner(result[0], result[1], iteratorCB, params);
      }
    });
  return deferredRunner.promise;
}

exports.run = runner;