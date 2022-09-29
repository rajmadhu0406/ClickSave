var redirect_code;
var client_id = "KAEZK7PJ5BC3EW7TFY5XO8FD7MDYHV5F";
var client_secret = "SB8X0LFM403S5G0O399E6PZGGTUEXTX6S0F5FIZY9YODAT6X832UVA596ZDJ5UGI";
var authUrl;
var ResponseToken;
var tokenIndex;

chrome.storage.local.get("codec", function(st){

    if((st['codec'] == undefined))
    {
        console.log("undefineee");
    }
    else{
        console.log("defineee : " + st['codec']);
        redirect_code = st['codec'];

        authUrl = "https://api.clickup.com/api/v2/oauth/token?client_id=KAEZK7PJ5BC3EW7TFY5XO8FD7MDYHV5F&client_secret=SB8X0LFM403S5G0O399E6PZGGTUEXTX6S0F5FIZY9YODAT6X832UVA596ZDJ5UGI&code="+redirect_code;

        console.log(authUrl);
        window.location.replace("teams.html");
    }

});

const signin_button = document.querySelector('#signin-button');
signin_button.onclick = () => {
    var newURL = "https://app.clickup.com/api?client_id=KAEZK7PJ5BC3EW7TFY5XO8FD7MDYHV5F&redirect_uri=https://clickup-react-redirecting.netlify.app";
    chrome.tabs.create({ url: newURL });
}

var urlx;
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    urlx = tabs[0].url;
});


// console.log("out : " + String(urlx));
 
