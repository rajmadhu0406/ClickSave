// const token = "61239203_b4507ca9af160d526f4c7aceb5f129be5441aa23"
var e;
var space_id;
var space_name;
var folder_url;
var folders;


function makeRequest_folder(method, url) {
    return new Promise(function (resolve, reject) {
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

function getSpaceId()
{
    return new Promise(function (resolve, reject) {

        e = document.getElementById("space_select");
        space_id = e.value;
        space_name = e.options[e.selectedIndex].text;

        folder_url = `https://api.clickup.com/api/v2/space/${space_id}/folder`;
    
    });

}

function ListHtml()
{
    return new Promise(function (resolve, reject) {

        console.log("inside ListHTML()\n");
        
        // for(var s in spaces['spaces'])
        // {
        //     space_ids.push(spaces['spaces'][s]['id']);
        //     space_names.push(spaces["spaces"][s]['name']);
        // }
        
        var html_code = ` 
        <html> 
        <body> <h1>html_codeeeeee======</h1? </body>
        </html>
        `
        
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

    await makeRequest_folder("GET",folder_url)
        .catch(e => {
            console.log(e)
        });

    await ListHtml()
        .catch(e => {
            console.log(e)
        });
}



const space_continue = document.querySelector('#space-continue');
space_continue.onclick = () => {

    fnAsync2();
    
}
