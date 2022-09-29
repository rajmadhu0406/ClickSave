var list_id;
var list_name;
var task_result;
var list_name = "new_list_test_1"
var create_list_result;
var new_list_id;
var create_list_url;
var task_url_new;
var task_result_new;
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

//getting the current tab url from chrome storage
var link_to_add;
chrome.storage.local.get("currentUrl", function (stt) {
                  
    console.log("currentUrl: " + stt["currentUrl"]);
    link_to_add = stt['currentUrl'];

  });

var new_list_name;


function getListId() {
    return new Promise(function (resolve, reject) {

        // console.log("Inside getListId()\n");

        e = document.getElementById("list_select");
        list_id = e.value;
        list_name = e.options[e.selectedIndex].text;

        task_url = `https://api.clickup.com/api/v2/list/${list_id}/task`; //create task


        makeRequest_task("POST", task_url)
            .catch(e => {
                console.log(e)
            });

        DisplayDone()
            .catch(e => {
                console.log(e)
            });

    });
}

function makeRequest_task(method, url) {
    return new Promise(function (resolve, reject) {

        // console.log("Inside makeRequest_task()\n");

        params["name"] = link_to_add; //adding the url in the body of the API request

        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Authorization", token);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);


                // console.log(xhr.response);
                task_result = JSON.parse(xhr.responseText);


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
        xhr.send(JSON.stringify(params));
    });
}

function DisplayDone() {
    return new Promise(function (resolve, reject) {

        // console.log("inside DisplayDone()\n");

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

async function fnAsync4() {
    await getListId()
        .catch(e => {
            console.log(e)
        });
}

const add_task = document.querySelector('#list-continue');
add_task.onclick = () => {

    fnAsync4();

}

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

            } else {
                reject({
                    status: this.status,
                    statusText: xhr_list.statusText
                });
            }
        };
        xhr_list.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr_list.statusText
            });
        };
        xhr_list.send(JSON.stringify(new_list_params));

    });
}

function getListName() {
    return new Promise(function (resolve, reject) {

        console.log("Inside getListName()\n");

        e = document.getElementById("list_name");
        new_list_name = e.value;

        create_list_url = `https://api.clickup.com/api/v2/folder/${folder_id}/list`; //create list
        // task_url = `https://api.clickup.com/api/v2/list/${list_id}/task`; //create task

        makeRequest_create_list("POST", create_list_url)
            .catch(e => {
                console.log(e)
            });


        DisplayDone()
            .catch(e => {
                console.log(e)
            });
    });
}




async function fnAsync5() {
    await getListName()
        .catch(e => {
            console.log(e)
        });
}

const new_list_button = document.querySelector('#new_list_button');
new_list_button.onclick = () => {
    fnAsync5();
}