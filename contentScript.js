const CLICKS_BATCH_SIZE = 1;
const MAX_LATENCY = 5000;

var click_times = [];
var hold_times = [];
var latency = [];
var sides = [];
var num_clicks = 0;

var left_characters = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b'];
var right_characters = ['y', 'u', 'i', 'o', 'p', 'h', 'j', 'k', 'l', ';', 'n', 'm', ',', '.', '/'];

var side = '';

var lastKeyDown = -1;
var keyDown = -1;
var keyUp = -1;

var countPress = false;
var pressed = false;

// triggered when keyboard key is pressed
document.addEventListener("keydown", function(e) {

    if (pressed) {
        return;
    }

    lastKeyDown = keyDown;
    keyDown = Date.now();

    countPress = false;
    pressed = true;

	var key = String.fromCharCode(e.keyCode).toLowerCase();

    // convert weird characters
    switch (key) {
        case 'º': key = ';';
            break;
        case '¼': key = ',';
            break;
        case '¾': key = '.';
            break;
        case '¿': key = '/';
    }

    // which hand was used to press key
    if (left_characters.includes(key)) {
        side = 'L';
    } 

    else if (right_characters.includes(key)) {
        side = 'R';
    }

    // ignore some characters
    else {
        return;
    }

    console.log(key);
    num_clicks++;
    let lat = keyDown - lastKeyDown;

    // calculate latency
    if (lastKeyDown != -1 && lat < MAX_LATENCY) { // if there was a break between keys - restart counting

        latency.push(lat);
        console.log("latency: " + (lat));
        countPress = true; 

        // time of the click
        click_times.push(keyDown);
        // keep track of which hand was used
        sides.push(side);
    } 

});


// triggered when keyboard key is released
document.addEventListener("keyup", function(e) {

    if (!pressed) {
        return;
    }

    pressed = false;

    if (!countPress) {
        return;
    }

    var key = String.fromCharCode(e.keyCode).toLowerCase();

    // convert weird characters
    switch (key) {
        case 'º': key = ';';
            break;
        case '¼': key = ',';
            break;
        case '¾': key = '.';
            break;
        case '¿': key = '/';
    }

    if (!left_characters.includes(key) && !right_characters.includes(key)) {
        return;
    } 

    keyUp = Date.now();

    let hold_time = keyUp - keyDown;
    hold_times.push(hold_time);
    console.log("hold: " + hold_time);

    // make POST request
    if (num_clicks >= CLICKS_BATCH_SIZE) {

        // make HTTP request in background
        chrome.runtime.sendMessage({
            message: "post", 
            time: click_times, 
            hold: hold_times, 
            latency: latency,
            side: sides,
        }, function(response) {

            // log the HTTP response
            console.log(response);
        });

        // reset arrays after post request
        num_clicks = 0;
        hold_times.length = 0;
        latency.length = 0;
        sides.length = 0;
        click_times.length = 0;
    }
});