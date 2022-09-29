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


function addVar() {
  return new Promise(function (resolve, reject) {

    console.log("addVar() : " + Varurl);

    var splitUrl = (Varurl).split("=")[1];
    if (typeof window !== 'undefined') {
      localStorage.setItem('code', splitUrl);
    }



    chrome.storage.local.set({ "codec": splitUrl }, function () {
      chrome.storage.local.get("codec", function (st) {

        console.log("post: " + st["codec"]);
        post = st["codec"];

        setTimeout(() => {
        // console.log("World!");

        if (typeof window !== 'undefined') {
          localStorage.setItem('code', splitUrl);
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

chrome.storage.local.get("codec", function(st){

  if((st['codec'] == undefined))
  {
      console.log("undefineed in background");
  }
  else{
      console.log("defineee : " + st['codec']);
      redirect_code = st['codec'];

      authUrl = "https://api.clickup.com/api/v2/oauth/token?client_id=KAEZK7PJ5BC3EW7TFY5XO8FD7MDYHV5F&client_secret=SB8X0LFM403S5G0O399E6PZGGTUEXTX6S0F5FIZY9YODAT6X832UVA596ZDJ5UGI&code="+redirect_code;

      console.log(authUrl);
      window.location.replace("teams.html");
  }

});


chrome.tabs.onUpdated.addListener(function
  (tabId, changeInfo, tab) {
  if (changeInfo.url) {

    console.log((tab.url));

    // if((tab.url).includes("https://working-react-app-25-sept-loading.netlify.app/?code="))
    if ((tab.url).includes("https://clickup-react-redirecting.netlify.app/?code")) {

      setTimeout(() => { console.log("World!"); }, 5);
      sleep(5);

      Varurl = tab.url;
      callVar();
      console.log("wbfowf : " + post);

    }

  }
}
);
