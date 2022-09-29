var Varurl;
var post = "null";

console.log(typeof window);

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// function writeData(key, data){
//   data = String(data);
//   try{
//       chrome.storage.local.set({[key]: data});
//   }catch{
//       localStorage.setItem(key, data);
//   }
//   console.log("WriteDate()");
// }

function addVar()
{
  return new Promise(function (resolve, reject) {

    console.log("addVar() : "+Varurl);

    var splitUrl=  (Varurl).split("=")[1];


              // chrome.storage.local.setItem('code'  ,splitUrl);
             
              if (typeof window !== 'undefined') {

                localStorage.setItem('code'  ,splitUrl);

              }

            

              chrome.storage.local.set({"codec": splitUrl}, function() {
                chrome.storage.local.get("codec", function(st){

                  console.log("post: " + st["codec"]);
                  post = st["codec"];
                 
                  
                  setTimeout(() => { 
                     console.log("World!");  
                     
                    if (typeof window !== 'undefined') {

                      localStorage.setItem('code'  ,splitUrl);
      
                    }
                    
                    }, 10);
                  
                  
                  randm = "1";
                  console.log("are they the same? " + (st["codec"] == randm ? "yes" : "no"));
                });
              });



              
              
            });
}
      
async function callVar() {

  await addVar()
      .catch(e => {
                  console.log(e)
              });
}
   

chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
      // read changeInfo data and do something with it (like read the url)
      if (changeInfo.url) {
        // do something here
        
        console.log((tab.url));   
        
        
        // if((tab.url).includes("https://working-react-app-25-sept-loading.netlify.app/?code="))
        if((tab.url).includes("https://clickup-react-redirecting.netlify.app/?code"))
        {

          setTimeout(() => {  console.log("World!"); }, 5);
          sleep(5);

          // var splitUrl=  (tab.url).split("=")[1];
          // localStorage.setItem('code'  ,splitUrl);

          Varurl = tab.url;
          callVar();
          console.log("wbfowf : " + post);

        
        }

      }
    }
  );
