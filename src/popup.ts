import {GET_COUNT} from "./types";

chrome.runtime.sendMessage({action: GET_COUNT}, (count) => {
    render(count);
});

const title = document.querySelector("h1");

function render(count: number) {
    if (title) {
        title.innerText = `LOC: ${count}`;
    }
}

chrome.storage.onChanged.addListener(({counter}) => {
    if (counter) {
        render(counter.newValue);
    }
});