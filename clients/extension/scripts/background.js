'use strict';

/**
 * builds the correct report url and calls it.
 * @param {string} url
 */
function openReport(url) {
  const apiUrl = new URL('https://googlechrome.github.io/lighthouse/viewer/');
  apiUrl.searchParams.append('psiurl', url);
  window.open(apiUrl.href);
}

chrome.contextMenus.create({title: 'Generate Report', onclick: startReport});

function startReport() {
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    // open new window
    chrome.windows.create({focused: true});

    // generate report for active tab
    tabs.forEach((tab) => {
      if (tab.active) {
        openReport(tab.url);
      }
    });
  });
}
