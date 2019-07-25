// triggered when keyboard key is pressed
document.onkeypress = function(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    if (charCode) {

    	key = String.fromCharCode(charCode)

    	// log which key was pressed
        console.log("Character typed: " + key);

        // log when the key was pressed
        console.log(Date.now());

        // if clicked on the "r" key
        if (key == "r") {
	        // make HTTP request in background
	        chrome.runtime.sendMessage({message: "HttpRequest"}, function(response) {

	     		// log the HTTP response
	  			console.log(response);
			});
    	}
    }
};