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

    chrome.storage.local.set({'phasersTo': 'valuexxxx'}, function() {
        alert('Value is set to ');
    });
    
}


async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}





