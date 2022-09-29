var Varurl;
var post = "null";

// console.log(typeof window);

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
