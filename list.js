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
        
        <option value="new_list"> Create new list </option>

        </select>
    
        <br><br>
        <button id="list-continue">Add task</button>
    
        <br><br>
        <form id="new_list_form">
            <label for="list_name">List Name:</label><br>
            <input type="text" id="list_name" name="list_name"><br>
            <button id="new_list_button" type="submit">Create New List & add task</button>
        </form>

        
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
