urlc = window.location.origin

x = 123

const buttonB = document.querySelector('#button_B');
buttonB.onclick = () => {

    
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!

        document.write(url)
        
        // chrome.storage.local.set({'phasersTo': 'valuexxxddx'}, function() {
        //     alert('Value is set to ');
        // });

        // chrome.storage.local.get(['phasersTo'], function(result) {
        //     alert('Value currently is ' + result.key);
        //   });
          
        
    });
}



