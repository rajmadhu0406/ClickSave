// const token = "61239203_b4507ca9af160d526f4c7aceb5f129be5441aa23"
var e;
var folder_id;
var folder_name;
var list_url;
var lists;
var list_ids = [];
var list_names = [];

function getFolderId()
{
    return new Promise(function (resolve, reject) {

        console.log("Inside getFolderId()\n");

        e = document.getElementById("folder_select");
        folder_id = e.value;
        folder_name = e.options[e.selectedIndex].text;

        list_url = `https://api.clickup.com/api/v2/folder/${folder_id}/list`;
        // https://api.clickup.com/api/v2/folder/121291305/list

        makeRequest_list("GET",list_url)
        .catch(e => {
            console.log(e)
        });

        ListHtml_list()
        .catch(e => {
            console.log(e)
        });
    
    });

}


function makeRequest_list(method, url) {
    return new Promise(function (resolve, reject) {

        console.log("Inside makeRequest_list()\n");


        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Authorization",token);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);

                
                console.log(xhr.response);
                lists = JSON.parse(xhr.responseText);


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


//


function ListHtml_list()
{
    return new Promise(function (resolve, reject) {

        console.log("inside ListHtml_list()\n");

        for(var l in lists["lists"])
        {
            list_ids.push(lists["lists"][l]['id']);
            list_names.push(lists["lists"][l]['name']);
        }
        
        var html_code = ` 
        <html> 
      
        <head>
            <link rel="stylesheet" href="body.css">
        </head>
        
        <body>
        
        <select id="list_select">`
        
        for (let i = 0; i < list_ids.length; i++) {
        
            var ff = `<option value="${list_ids[i]}">
                          ${list_names[i]}
                      </option>`
            html_code += ff;
        }
    
        
        html_code += `

        </select>
    
        <br><br>
        <button id="list-continue">Add task</button>
    
        <br><br>
       
            <label for="list_name">List Name:</label><br>
            <input type="text" id="list_name" name="list_name"><br>
            <button id="new_list_button">Create New List & add task</button>
        

        
        <script src="task.js"></script>
        <body>
        
        </html>`
        
        document.open();
    
        // document.body.appendChild(html_code);
        document.write(html_code);
    
    
        document.close();
        
    });
}

async function fnAsync3()
{
    await getFolderId()
        .catch(e => {
            console.log(e)
        });


    
}


const folder_continue = document.querySelector('#folder-continue');
folder_continue.onclick = () => {

    fnAsync3();
    
}
//
var params = {
    "description": "",
    "assignees": [],
    "tags": [],
    "status": null,
    "priority": null,
    "due_date": null,
    "due_date_time": false,
    "time_estimate": null,
    "start_date": null,
    "start_date_time": false,
    "notify_all": true,
    "parent": null,
    "links_to": null,
    "custom_fields": []
};

var new_list_params = {
    "content": "",
    "due_date": null,
    "due_date_time": false,
    "priority": 1,
    "assignee": null,
    "status": "red"
}

var link_to_add = "https://www.google.com/";
var new_list_name;

function makeRequest_task_after_list() {
    return new Promise(function (resolve, reject) {
        console.log("inside makeRequest_task_after_list()....");

        let xhr_task = new XMLHttpRequest();
        xhr_task.open("POST", task_url_new);
        xhr_task.setRequestHeader("Authorization", token);
        xhr_task.setRequestHeader("Content-Type", "application/json");

        xhr_task.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr_task.response);


                console.log(xhr_task.response);
                task_result_new = JSON.parse(xhr_task.responseText);
                console.log(task_result_new)

            } else {
                reject({
                    status: this.status,
                    statusText: xhr_task.statusText
                });
            }
        };
        xhr_task.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr_task.statusText
            });
        };

        xhr_task.send(JSON.stringify(params));

    });
}

function makeRequest_create_list(method, url) {
    return new Promise(function (resolve, reject) {

        console.log("Inside makeRequest_create_list()\n");

        params["name"] = link_to_add; //adding the url in the body of the API request
        new_list_params['name'] = new_list_name;

        let xhr_list = new XMLHttpRequest();
        xhr_list.open(method, url);
        xhr_list.setRequestHeader("Authorization", token);
        xhr_list.setRequestHeader("Content-Type", "application/json");
        // xhr_list.responseType = "json";

        xhr_list.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr_list.response);


                console.log(xhr_list.response);
                create_list_result = JSON.parse(xhr_list.responseText);

                new_list_id = create_list_result['id'];
                task_url_new = `https://api.clickup.com/api/v2/list/${new_list_id}/task`; //create task
                console.log(task_url_new);

                makeRequest_task_after_list()
                    .catch(e => {
                        console.log(e)
                    });

                DisplayDone()
                .catch(e => {
                    console.log(e)
                });

            } else {
                reject({
                    status: this.status,
                    statusText: xhr_list.statusText
                });

                DisplayError()
                .catch(e => {
                    console.log(e)
                });


            }
        };
        xhr_list.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr_list.statusText
            });

            DisplayError()
            .catch(e => {
                console.log(e)
            });

        };
        xhr_list.send(JSON.stringify(new_list_params));

    });
}


var create_folderless_list_url;
function DisplayDone() {
    return new Promise(function (resolve, reject) {

        console.log("inside DisplayDone()\n");



        var html_code = ` 
        <html> 
      
        <head>
            <link rel="stylesheet" href="body.css">
        </head>
        
        <body>

            <h1> Task added successfully </h1>
        
        <script src="displayDone.js"></script>
        <body>
        
        </html>`

        document.open();

        // document.body.appendChild(html_code);
        document.write(html_code);


        document.close();

    });
}
function DisplayError() {
    return new Promise(function (resolve, reject) {

        console.log("inside DisplayError()\n");



        var html_code = ` 
        <html> 
      
        <head>
            <link rel="stylesheet" href="body.css">
        </head>
        
        <body>

            <h1> Error!!! Make sure list name is unique. </h1>
        
        <script src="displayError.js"></script>
        <body>
        
        </html>`

        document.open();

        // document.body.appendChild(html_code);
        document.write(html_code);


        document.close();

    });
}

function getListName() {
    return new Promise(function (resolve, reject) {

        console.log("Inside getSpaceName()\n");

        e = document.getElementById("list_name");
        new_list_name = e.value;




        create_folderless_list_url = `https://api.clickup.com/api/v2/space/${space_id}/list`; //create list
        // task_url = `https://api.clickup.com/api/v2/list/${list_id}/task`; //create task

        makeRequest_create_list("POST", create_folderless_list_url)
            .catch(e => {
                console.log(e)
            });


        // DisplayDone()
        //     .catch(e => {
        //         console.log(e)
        //     });



    });
}


async function fnAsync6() {
    await getListName()
        .catch(e => {
            console.log(e)
        });
}

const new_list_button_f = document.querySelector('#new_list_button');
new_list_button_f.onclick = () => {

    fnAsync6();


}