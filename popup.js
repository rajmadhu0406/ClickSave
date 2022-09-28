var urlc = window.location.origin
var url;

const buttonB = document.querySelector('#button_B');
buttonB.onclick = () => {

    
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
         url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!

        document.write(url)
        
        // chrome.storage.local.set({'phasersTo': 'valuexxxddx'}, function() {
        //     alert('Value is set to ');
        // });
        // chrome.storage.local.get(['k1'], function(result) {
        //     alert('Value currently is ' + result.key);
        //   });
          
        
    });
}



