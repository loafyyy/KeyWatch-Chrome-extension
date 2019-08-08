# KeyWatch-Chrome-extension

This guide explains how to add and use this Chrome extension:

### 1. Set up the Chrome extension
* Clone this repo 
* On chrome, go to chrome://extensions/  
* Enable "Developer mode" at the top right  
* Click "Load unpacked" at the top left  
* Select this repo
* You should now have the Chrome extension on Chrome  

### 2. Set up the backend server
* Follow the ReadMe in this repo: https://github.com/loafyyy/KeyWatch-backend  
* Make sure the server is running before continuing  

### 3. Testing
* Navigate to a new page or refresh an existing page  
* Open up the browser console - right click in a page -> Inspect
* Click some keyboard keys   
* Make sure the console is printing things correctly  
* Go to "http://127.0.0.1:5000/" in your browser  
* You should see a JSON object with a list of keys you clicked (the actual character is not recorded)  



