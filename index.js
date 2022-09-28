const signin_button = document.querySelector('#signin-button');
signin_button.onclick = () => {

    // chrome.storage.local.set({'phasersTo': 'valuexxxx'}, function() {
    //     alert('Value is set to ' + value);
    // });
      
    
    var newURL = "https://app.clickup.com/api?client_id=KAEZK7PJ5BC3EW7TFY5XO8FD7MDYHV5F&redirect_uri=clickup-react-cli-working.netlify.app";
    chrome.tabs.create({ url: newURL });

}


const pop_button = document.querySelector('#pop-button');
pop_button.onclick = () => {

    chrome.storage.sync.set({'k1': 'valuexxxx'}, function() {
        alert('Value is set to ');
    });

    chrome.storage.local.set({"k1": "value1"}, function() {
        console.log('Value is set!!!' );
      });
    
}


async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

const get_button = document.querySelector('#get-button');
get_button.onclick = () => {

    return new Promise((resolve, reject) => {
console.log("onclick\n");

chrome.storage.sync.get(['k1'], function(result) {
        alert('Value get is : ' + result.key);
      });

    });
}

const set_button = document.querySelector('#set-button');
set_button.onclick = () => {
    return new Promise((resolve, reject) => {


    chrome.storage.sync.set({"k2": "value2"}, function() {
        alert('Value is set!!!' );
    });

});

}
  
chrome.storage.sync.set({"k1": "value1"}, function() {
    console.log('Value is set!!!' );
  });

  chrome.storage.sync.get(['k1'], function(result) {
    alert('Value get is : ' + result.key);
  });

