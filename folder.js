// const token = "61239203_b4507ca9af160d526f4c7aceb5f129be5441aa23"
var e;
var space_id;
var space_name;
var folder_url;
var folders;
var folder_ids = [];
var folder_names = [];

function getSpaceId()
{
    return new Promise(function (resolve, reject) {

        console.log("Inside getSpaceId()\n");

        e = document.getElementById("space_select");
        space_id = e.value;
        space_name = e.options[e.selectedIndex].text;

        folder_url = `https://api.clickup.com/api/v2/space/${space_id}/folder`;

        makeRequest_folder("GET",folder_url)
        .catch(e => {
            console.log(e)
        });

        ListHtml()
        .catch(e => {
            console.log(e)
        });
    
    });

}


function makeRequest_folder(method, url) {
    return new Promise(function (resolve, reject) {

        console.log("Inside makerequest_folder()\n");


        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Authorization",token);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);

                
                console.log(xhr.response);
                folders = JSON.parse(xhr.responseText);


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


function ListHtml()
{
    return new Promise(function (resolve, reject) {

        console.log("inside ListHTML()\n");

        for(var f in folders['folders'])
        {
            folder_ids.push(folders["folders"][f]['id']);
            folder_names.push(folders["folders"][f]['name']);
        }
        
        var html_code = ` 
        <html> 
      
        <head>
            <link rel="stylesheet" href="body.css">
        </head>
        
        <body>
        
        <select id="folder_select">`
        
        for (let i = 0; i < folder_ids.length; i++) {
        
            var ff = `<option value="${folder_ids[i]}">
                          ${folder_names[i]}
                      </option>`
            html_code += ff;
        }
    
        
        html_code += `</select>
    
        <br><br>
        <button id="folder-continue">Continue</button>

        <br><br>
       
            <label for="list_name">List Name:</label><br>
            <input type="text" id="list_name" name="list_name"><br>
            <button id="new_list_button">Create New List & add task</button>
        
        <script src="list.js"></script>
        <body>
        
        </html>`
        
        document.open();
    
        // document.body.appendChild(html_code);
        document.write(html_code);
    
    
        document.close();
        
    });
}

async function fnAsync2()
{
    await getSpaceId()
        .catch(e => {
            console.log(e)
        });
    
}


const space_continue = document.querySelector('#space-continue');
space_continue.onclick = () => {

    fnAsync2();
    
}



//logout button
const logout_button = document.querySelector('#logout-button');
logout_button.onclick = () => {

    chrome.storage.local.clear();
    window.location.replace("index.html");
    // window.location.href("index.html");
     window.location.reload();
     document.write("Logout successful");
}
