import {COPY_ALL, GET_COUNT, SEND_CODE} from './types';
import {browser} from "webextension-polyfill-ts";

const incrementCounter = (count:number) => {
    getCounter().then((counter) => {
        browser.storage.local.set({ counter: counter + count });
    });
}

const getCounter = () => {
    return browser.storage.local.get("counter").then((data) => {
        return data.counter ?? 0;
    });
}

chrome.commands.onCommand.addListener((command) => {
    if (command === COPY_ALL) {
        getCurrentTabId().then((tabId) => {
            if (tabId) {
                chrome.tabs.sendMessage(tabId, {action: COPY_ALL},
                    (allCode) => {
                        incrementCounter(getLOC(allCode));
                    });
            }
        })

    }
});

chrome.runtime.onMessage.addListener((req, info, cb) => {
    if (req.action === SEND_CODE) {
        incrementCounter(getLOC(req.code));
    }
    if (req.action === GET_COUNT) {
        getCounter().then((counter) => {
            cb(counter);
        });
        return true;
    }
    return false;
})

const getLOC = (code: string) => {
    return code.split('\n').length;
}

const getCurrentTabId = async () => {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    console.log(tabs)
    return !!tabs.length ? tabs[0].id : null
}

chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === "install") {
        chrome.tabs.create({
            url: chrome.runtime.getURL("../public/welcome.html"),
        });
        chrome.runtime.setUninstallURL("https://google.com/");
    }
});