// /sign in button click and open new url
// var background = chrome.extension.getBackgroundPage();
// background.transfer;
var redirect_code;
var client_id = "KAEZK7PJ5BC3EW7TFY5XO8FD7MDYHV5F";
var client_secret = "SB8X0LFM403S5G0O399E6PZGGTUEXTX6S0F5FIZY9YODAT6X832UVA596ZDJ5UGI";
var authUrl;
var ResponseToken;
var tokenIndex;


// function getToken(url)
// {
//         xhr.open("POST", url);
//         xhr.onload = function () {
//             if (this.status >= 200 && this.status < 300) {
//                 resolve(xhr.response);

//                 console.log("onload response** : ");
//                 console.log(xhr.response);
//                 ResponseToken = JSON.parse(xhr.responseText);
//                 console.log("102**")
//                 tokenIndex = teams["access_token"][0];
//                 console.log("tokenIndex : "+tokenIndex);

//             } else {
//                 reject({
//                     status: this.status,
//                     statusText: xhr.statusText
//                 });
//             }
//         };
//         xhr.onerror = function () {
//             reject({
//                 status: this.status,
//                 statusText: xhr.statusText
//             });
//         };
//         xhr.send();
// }



chrome.storage.local.get("codec", function(st){

    if((st['codec'] == undefined))
    {
        console.log("undefineee");
    }
    else{
        console.log("defineee : " + st['codec']);
        redirect_code = st['codec'];

        authUrl = "https://api.clickup.com/api/v2/oauth/token?client_id=KAEZK7PJ5BC3EW7TFY5XO8FD7MDYHV5F&client_secret=SB8X0LFM403S5G0O399E6PZGGTUEXTX6S0F5FIZY9YODAT6X832UVA596ZDJ5UGI&code="+redirect_code;
        // getToken(authUrl);

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


    console.log("out : " + String(urlx));
 
    // if(localStorage.getItem('code') == null)
    // {
        
    //     console.log("if : " + urlx)

    //     var splitUrl=  String(urlx).split("=")[1];
    //     console.log(splitUrl);
    //     localStorage.setItem('code',splitUrl);
        
    // // let searchParams=new URLSearchParams(url);
    // }
      

    // else{

    //     console.log("else : " + urlx)
    //     console.log(localStorage.getItem('code'));
        
    // }




        
        

// const pop_button = document.querySelector('#pop-button');
// pop_button.onclick = () => {

//     chrome.storage.local.set({'phasersTo': 'valuexxxx'}, function() {
//         alert('Value is set to ');
//     });
// }

// const redirect_button = document.querySelector('#redirect');
// redirect_button.onclick = () => {
    
//     window.location.href("teams.html");

// }
