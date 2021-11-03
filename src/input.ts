import {COPY_ALL} from "./types";

const preEls: NodeListOf<HTMLPreElement> = document.querySelectorAll('pre');
import './input.css';

preEls.forEach(el => {
    const button = document.createElement('button');
    button.innerText = 'Copy';
    button.type = 'button';

    const cssUrl = chrome.runtime.getURL('dist/input.css');
    const root = document.createElement('div');
    root.style.position = "relative";
    const shadowRoot = root.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `<link rel='stylesheet' href='${cssUrl}'/>`
    shadowRoot.prepend(button);
    el.prepend(root);

    const code = el.querySelector('code');

    button.addEventListener('click', (e) => {
        if (!!code?.innerText) {
            navigator.clipboard.writeText(code.innerText).then(() => {
                notify();
            });
        }
    });
});

chrome.runtime.onMessage.addListener((req, info, cb): boolean => {
    console.log(cb)
    if (req.action === COPY_ALL) {
        const allCode = getAllCode();
        navigator.clipboard.writeText(allCode).then(() => {
            notify();
            cb(allCode);
        });
        return true;
    }
    return false;
})

const getAllCode = () => {
    const allCode: string[] = [];
    preEls.forEach(el => {
        const selector = el.querySelector('code');
        if (selector) allCode.push(selector.innerText);
    })
    return allCode.join('');
}

const notify = () => {
    const scriptEl = document.createElement('script');
    scriptEl.src = chrome.runtime.getURL('dist/execute.js');
    document.body.appendChild(scriptEl);
    scriptEl.onload = () => {
        scriptEl.remove();
    }
}
