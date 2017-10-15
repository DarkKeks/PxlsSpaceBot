// ==UserScript==
// @name         Pxls Bot Loader
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       DarkKeks
// @match        https://pxls.space/*
// @downloadURL  https://rawgit.com/DarkKeks/PxlsSpaceBot/master/PxlsBotLoader.user.js
// @updateURL    https://rawgit.com/DarkKeks/PxlsSpaceBot/master/PxlsBotLoader.user.js
// @grant        none
// ==/UserScript==

var botTask = {
    use: true,
    url: 'https://i.imgur.com/YNACc3J.png',
    x: 1147,
    y: 641,
    width: -1,
    opacity: 0.5
};

var scripts = {
    main: 'https://rawgit.com/DarkKeks/PxlsSpaceBot/master/pxls.js',
    pxlog: 'https://rawgit.com/quazzart/PxlsSpaceBotX/master/pxlog.js'
};

var inject = function() {
    var injectOne = function(name, onload) {
        console.log("Injecting " + name);
        var script = document.createElement('script');
        document.body.appendChild(script);
        if(onload) script.onload = onload;
        script.src = scripts[name] + '?v=' + Math.random();
    };

    injectOne('main', function() {
        App.onBoardReady.addListener(function() {
            App.template.update(botTask);
        });
    });
    injectOne('pxlog');
};

if (document.readyState == 'complete') {
    inject();
} else {
    window.addEventListener("load", function() {
        inject();
    });
}