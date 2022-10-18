const url = "https://api.clickup.com/api/v2/team";
// var token = "61239203_b4507ca9af160d526f4c7aceb5f129be5441aa23"
var token;

// chrome.storage.local.get("token")

var teams;
var team_id;
var team_name;
var space_url = "";
var spaces;
var space_ids = [];
var space_names = [];
var OauthCode;
var TokenURL;

function makeRequest_tokens(method) {
    return new Promise(function (resolve, reject) {

        chrome.storage.local.get("codec", function (st) {

            OauthCode = st["codec"];
            console.log(OauthCode);
            TokenURL = "https://api.clickup.com/api/v2/oauth/token?client_id=KAEZK7PJ5BC3EW7TFY5XO8FD7MDYHV5F&client_secret=SB8X0LFM403S5G0O399E6PZGGTUEXTX6S0F5FIZY9YODAT6X832UVA596ZDJ5UGI&code=" + OauthCode;
            console.log("TokenURL : " + TokenURL);

            let xhr = new XMLHttpRequest();
            // console.log("opeming...");
            xhr.open(method, TokenURL);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);

                    // console.log("onload response** : ");
                    // console.log(xhr.response);
                    ResponseToken = JSON.parse(xhr.responseText);
                    // console.log("102**")
                    token = ResponseToken["access_token"];
                    chrome.storage.local.set({ "userToken": token }, function () {
                        chrome.storage.local.get("userToken", function (st) {
                  
                          console.log("userToken: " + st["userToken"]);
                        
                  
                        //   setTimeout(() => {
                        //   // console.log("World!");
                  
                        // //   if (typeof window !== 'undefined') {
                        // //     localStorage.setItem('userToken', token);
                        // //   }
                  
                        //   }, 10);
                        
                        });
                      });
                    // console.log("token : " + token);

                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();

        });


    });
}

function makeRequest_teams(method, url) {
    return new Promise(function (resolve, reject) {

        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Authorization", token);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);

                // console.log("onload response : ");
                // console.log(xhr.response);
                teams = JSON.parse(xhr.responseText);
                // console.log("102")
                team_id = teams["teams"][0]['id'];
                team_name = teams['teams'][0]['name'];

                space_url = "https://api.clickup.com/api/v2/team/" + String(team_id) + "/space";

            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}




function makeRequest_space(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Authorization", token);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);

                // console.log(xhr.response);
                spaces = JSON.parse(xhr.responseText);


            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}


function list_spaces() {

    return new Promise(function (resolve, reject) {

        // console.log("inside list_space()\n");

        for (var s in spaces['spaces']) {
            space_ids.push(spaces['spaces'][s]['id']);
            space_names.push(spaces["spaces"][s]['name']);
        }

        var html_code = ` 
    <html> 
  
    <head>
        <link rel="stylesheet" href="teams.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    </head>
    
    <body>
    <h3 align="center" id="heading">ClickSave</h2>
    <select id="space_select">`

        for (let i = 0; i < space_ids.length; i++) {

            var ss = `<option value="${space_ids[i]}">
                        ${space_names[i]}
                  </option>`
            html_code += ss;
        }

        html_code += `</select>

    <br><br>
    <button id="space-continue">Continue</button>

    <button id="logout-button"> Logout </button>


    <script src="folder.js"></script>
    <body>
    
    </html>`

        document.open();

        // document.body.appendChild(html_code);
        document.write(html_code);


        document.close();

    });
}


async function fnAsync() {

    chrome.storage.local.get("userToken", async function(utoken){

        if(utoken['userToken'] == undefined)
        {
            await makeRequest_tokens("POST")
            .catch(e => {
                console.log(e)
            });
            

            await makeRequest_teams("GET", url)
                .catch(e => {
                    console.log(e)
                });

            await makeRequest_space("GET", space_url)
                .catch(e => {
                    console.log(e)
                });

            await list_spaces()
                .catch(e => {
                    console.log(e)
                });


        }
        else{
            //debugging...
            token = utoken['userToken'];
            console.log("token set to : " + token);


            await makeRequest_teams("GET", url)
                .catch(e => {
                    console.log(e)
                });

            await makeRequest_space("GET", space_url)
                .catch(e => {
                    console.log(e)
                });

            await list_spaces()
                .catch(e => {
                    console.log(e)
                });
        }
        
    });

    


    
}

fnAsync();



