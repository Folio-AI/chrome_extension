import React from 'react';
import ReactDOM from 'react-dom';
import Popup from '../pages/popup';

declare const chrome: any;
 
const init = () => {
    const injectElement = document.createElement('div');

    // Create a shadow root
    const shadow = injectElement.attachShadow({ mode: 'open' });  

    // Create and append the reset style
    const resetStyle = document.createElement('style');
    resetStyle.textContent = `
        :host {
            all: initial !important;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
        }
    `;
    shadow.appendChild(resetStyle);

    // Load styles into the shadow root using chrome.runtime.getURL
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', chrome.runtime.getURL('css/main.css'));
    shadow.appendChild(linkElem);

    const styledContainer = document.createElement('div');
    styledContainer.className = 'font-mono';
    ReactDOM.render(<Popup stylesheetUrl={chrome.runtime.getURL('css/main.css')}/>, styledContainer);
    
    shadow.appendChild(styledContainer);
    document.body.appendChild(injectElement);

    // window.addEventListener('message', (event) => {
    //     console.log(event.data.action);
    //     if (event.data.action === 'TOGGLE_IFRAME') {
    //         if (event.data.state) {
    //             injectElement.style.transform = 'translateX(0)';
    //         } else {
    //             injectElement.style.transform = 'translateX(100%)';
    //         }
    //     }
    // });
};

init();
