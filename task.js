var list_id;
var list_name;
var task_result;
var list_name = "new_list_test_1"
var  params = {
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


function getListId()
{
    return new Promise(function (resolve, reject) {

        console.log("Inside getListId()\n");

        e = document.getElementById("list_select");
        list_id = e.value;
        list_name = e.options[e.selectedIndex].text;

        

            task_url = `https://api.clickup.com/api/v2/list/${list_id}/task`; //create task
        

            makeRequest_task("POST",task_url)
            .catch(e => {
                console.log(e)
            });

            DisplayDone()
            .catch(e => {
                console.log(e)
            });
    
    });
}

function makeRequest_create_list(method, url) {
    return new Promise(function (resolve, reject) {

        console.log("Inside makeRequest_create_list()\n");

        new_list_params["name"] = link_to_add; //adding the url in the body of the API request

        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Authorization",token);
        xhr.setRequestHeader("Content-Type","application/json");

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);

                
                console.log(xhr.response);
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

function makeRequest_task(method, url) {
    return new Promise(function (resolve, reject) {

        console.log("Inside makeRequest_task()\n");

        params["name"] = link_to_add; //adding the url in the body of the API request

        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Authorization",token);
        xhr.setRequestHeader("Content-Type","application/json");

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);

                
                console.log(xhr.response);
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

function DisplayDone()
{
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


//

async function fnAsync4()
{
    await getListId()
        .catch(e => {
            console.log(e)
        });    
}

async function fnAsync5()
{
    await getListId()
        .catch(e => {
            console.log(e)
        });    

    if(list_id == "new_list")
    {
        //https://api.clickup.com/api/v2/folder/folder_id/list
        create_list_url = `https://api.clickup.com/api/v2/folder/${folder_id}/list`;

    }
        

}




const add_task = document.querySelector('#list-continue');
add_task.onclick = () => {

    fnAsync4();
   
}

const new_list_button = document.querySelector('#new_list_button');
new_list_button.onclick = () => {

    fnAsync5();
   
}