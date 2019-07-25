chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	// make HTTP request
  	if (request.message = "HttpRequest") {
		const url = 'https://jsonplaceholder.typicode.com/todos/1';

		fetch(url)
	        .then(response => response.text())
	        .then(text => sendResponse(text))
	        .catch(error => sendResponse("error")) 
	    return true;  // will respond asynchronously
	}
});