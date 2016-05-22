# Web Worker Controller
Route requests to files / functions in a separate thread through a web worker.

# How to Use

    // Only call once in the entire app to initialize
    window.worker = new Worker('/path/to/worker.js');
    worker.addEventListener('message', function(data) {
      // process data
    });
    
    // Make a call to the worker
    worker.postMessage({
        fileName: 'my-file.js', // URL of the file you want to open, relative to the location of the worker.js file
        functionName: 'myFile.fetchData',
        params: {
          foo: 'bar'
        },
        id: 'fetch', // Will be returned, so you can identify the data returned
        returnPromise: true // The function you are calling returns a Promise (asyncronous). If false, it returns a value immediately.
    });

The above code will open my-file.js in a web worker, and execute myFile.fetchData({ foo: 'bar' }); from that file. Then it will return the value: { id: 'fetch', data: ... }
