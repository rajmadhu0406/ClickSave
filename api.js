const url = "https://api.clickup.com/api/v2/team";
const token = "61239203_b4507ca9af160d526f4c7aceb5f129be5441aa23"

// fetch('https://api.clickup.com/api/v2/team', {
//   method: "GET",
//   headers: {"Authorization": "61239203_b4507ca9af160d526f4c7aceb5f129be5441aa23",
//             "Content-Type": "application/json"}
// })
// .then(response => {

//     response = response.json();
//     console.log("response-1 ==> " + response);

// })
// .then((res) => { 
//     console.log(res.);
// })
// .catch(err => console.log(err));



// async function load (url) {

//     const response = await fetch(url, {
//           method: "GET",
//           headers: {"Authorization": "61239203_b4507ca9af160d526f4c7aceb5f129be5441aa23",
//                     "Content-Type": "application/json"}
//         })

//         const jsonResult = await response.json();

//         console.log("response json ==> ");
//         console.log(jsonResult);

//         return jsonResult

// }



// console.log("100")

//team 

var teams;
var team_id;
var team_name;


function makeRequest_teams(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Authorization",token);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);

                console.log("onload response : ");
                console.log(xhr.response);
                teams = JSON.parse(xhr.responseText);
                console.log("102")
                team_id = teams["teams"][0]['id'];
                team_name = teams['teams'][0]['name'];


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

var space_url = "";
var spaces;


function makeRequest_space(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Authorization",token);
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


async function getSpace(){

   
    let result_space = await makeRequest_space("GET", space_url);
    console.log("getSpace result => ");
    console.log(result_space);
   

    // code below here will only execute when await makeRequest() finished loading
    
}


async function getTeam(){


    let result = await makeRequest_teams("GET", url)
    .then(()=>{space_url = "https://api.clickup.com/api/v2/team/"+ String(team_id) +"/space";})
    .then(() => {getSpace()})
    .catch(e => {
        console.log(e);
    });


    console.log("getTeam result => ")
    console.log(result);
}

getTeam();

//space



// getSpace();

//

// const request = new XMLHttpRequest();
// request.open("GET", url);
// request.setRequestHeader("Authorization",token);
// request.send();
// console.log("101")

// request.onload = ()=>{
//     console.log(request.response);
//     teams = JSON.parse(request.responseText);
//     console.log("102")
//     team_id = teams["teams"][0]['id'];
//     team_name = teams['teams'][0]['name'];
// }


// spaces
// console.log("103")

// var spaces;

// const space_url =  "https://api.clickup.com/api/v2/team/"+ String(team_id) +"/space";
// console.log("104")
// const space_request = new XMLHttpRequest();
// space_request.open("GET", space_url);
// space_request.setRequestHeader("Authorization",token);
// space_request.send();
// console.log("105")

// space_request.onload = ()=>{
//     console.log(space_request.response);
//     spaces = JSON.parse(space_request.responseText);
//     console.log("106")
// }
