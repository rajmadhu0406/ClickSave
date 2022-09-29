const url = "https://api.clickup.com/api/v2/team";
// var token = "61239203_b4507ca9af160d526f4c7aceb5f129be5441aa23"
var token;

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
            console.log("opeming...");
            xhr.open(method, TokenURL);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);

                    console.log("onload response** : ");
                    console.log(xhr.response);
                    ResponseToken = JSON.parse(xhr.responseText);
                    console.log("102**")
                    token = ResponseToken["access_token"];
                    console.log("token : " + token);

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

                console.log("onload response : ");
                console.log(xhr.response);
                teams = JSON.parse(xhr.responseText);
                console.log("102")
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

                console.log(xhr.response);
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

        console.log("inside list_space()\n");

        for (var s in spaces['spaces']) {
            space_ids.push(spaces['spaces'][s]['id']);
            space_names.push(spaces["spaces"][s]['name']);
        }

        var html_code = ` 
    <html> 
  
    <head>
        <link rel="stylesheet" href="body.css">
    </head>
    
    <body>
    
    <select id="space_select">`

        for (let i = 0; i < space_ids.length; i++) {

            var ss = `<option value="${space_ids[i]}">
                        ${space_names[i]}
                  </option>`
            html_code += ss;
        }

        //   <option value="${}">test1</option>
        //   <option value="2" selected="selected">test2</option>
        //   <option value="3">test3</option>

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

fnAsync();



