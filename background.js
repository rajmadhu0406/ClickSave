chrome.tabs.onCreated.addListener(function() 
{
    alert('inssss');
    chrome.tabs.onUpdated.addListener(function
        (tabId, changeInfo, tab) {
          // read changeInfo data and do something with it (like read the url)
          if (changeInfo.url) {
            // do something here
            alert('dd');
          }
        }
      );
      
}
);