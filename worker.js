// Process all messages from the main thread
self.onmessage = function(e) {
    var data = e.data;
    importScripts(data.fileName);
    var passedFunction = findNestedFunction(self, data.functionName);

    if (data.returnPromise !== false) {
        passedFunction(data.params)
        .then(sendMessage.bind(null, data.id))
        .catch(sendMessage.bind(null, data.id));
    } else {
        sendMessage(data.id, passedFunction(data.params));
    }
};

function sendMessage(id, response) {
    return self.postMessage({
        id: id,
        response: response
    });
}

// Return the function from a string.
// e.g. 'foo.bar.bazz'
function findNestedFunction(base, names) {
    names.split('.').forEach(function(name) {
        base = base[name];
    });
    return base;
}
