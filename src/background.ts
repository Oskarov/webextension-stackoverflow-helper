import {COPY_ALL} from './types';

chrome.commands.onCommand.addListener((command) => {
    if (command === COPY_ALL) {
        getCurrentTabId().then((tabId) => {
            if (tabId) {
                chrome.tabs.sendMessage(tabId, {action: COPY_ALL});
            }
        })

    }
});

async function getCurrentTabId() {
    let queryOptions = {active: true, currentWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}