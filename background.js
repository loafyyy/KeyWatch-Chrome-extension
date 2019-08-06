chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	const url = 'http://127.0.0.1:5000/';

  	// make HTTP request
  	if (request.message == "post") {

      var time = request.time
      var hold = request.hold
      var latency = request.latency
      var side = request.side

      console.log(time)
  		
		fetch(url, {
    		method: 'post',
    		headers: {
      			'Content-Type': 'application/json'
    		},
    		body: JSON.stringify({
    	      time: time, 
            hold: hold, 
            latency: latency,
            side: side,
    		})
  		})
	        .then(response => response.text())
	        .then(text => sendResponse(text))
	        .catch(error => sendResponse("error")); 
	    return true;  // will respond asynchronously
	}
});