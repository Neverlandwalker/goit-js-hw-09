let t=null;const o={startButton:document.querySelector("button[data-start]"),stopButton:document.querySelector("button[data-stop]"),bodyBG:document.querySelector("body")};o.startButton.disabled=!1,o.stopButton.disbaled=!0,o.startButton.addEventListener("click",(function(){t=setInterval((()=>{o.bodyBG.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),o.startButton.disabled=!0,o.stopButton.disbaled=!1})),o.stopButton.addEventListener("click",(function(){clearInterval(t),o.startButton.disabled=!1,o.stopButton.disbaled=!0}));
//# sourceMappingURL=01-color-switcher.8a9da956.js.map