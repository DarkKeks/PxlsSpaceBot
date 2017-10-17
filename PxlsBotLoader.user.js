// ==UserScript==
// @name         Pxls Bot Loader
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  try to take over the world!
// @author       DarkKeks
// @run-at       document-start
// @match        https://pxls.space/*
// @downloadURL  https://rawgit.com/DarkKeks/PxlsSpaceBot/master/PxlsBotLoader.user.js
// @updateURL    https://rawgit.com/DarkKeks/PxlsSpaceBot/master/PxlsBotLoader.user.js
// @grant        none
// ==/UserScript==

var save = {};
var removeOriginalScript = function() {
    var tryRemove = function() {
        if(!document.body) return setTimeout(tryRemove, 1);
        save.$ = window.$;
        save.setTimeout = window.setTimeout;
        save.setInterval = window.setInterval;

        window.$ = undefined;
        window.setTimeout = undefined;
        window.setInterval = undefined;
    };
    setTimeout(tryRemove, 1);
};

var scripts = {
    main: 'https://rawgit.com/DarkKeks/PxlsSpaceBot/master/pxls.js',
    pxlog: 'https://rawgit.com/quazzart/pxlslog/master/pxlslog.js',
    jQueryUIjs: 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js'
};

var inject = {
    base: function(name, element, attributes, onload) {
        console.log("Injecting " + name);
        document.head.appendChild(element);
        if(onload) element.onload = onload;
        attributes(element);
    },
    script: function(name, onload) {
        inject.base(name, document.createElement('script'), function(script) {
            script.src = scripts[name] + "?v=" + Math.random();
        }, onload);
    },
    link: function(name, url, onload) {
        inject.base(name, document.createElement('link'), function(link) {
            link.rel = 'stylesheet';
            link.href = url + "?v=" + Math.random();
        }, onload);
    }
};

var botTask = {
    use: true,
    url: 'https://i.imgur.com/YNACc3J.png',
    x: 1186,
    y: 582,
    width: -1,
    opacity: 0.5
};

var load = function() {
    for(var key in save)
        if(save.hasOwnProperty(key))
            window[key] = save[key];


    inject.script('main', function() {
        App.onBoardReady.addListener(function() {
            App.template.update(botTask);
        });
    });

    //pxlog
    inject.script('jQueryUIjs', function() {
        if(typeof pxlslog !== 'undefined' && !pxlslog.ready) {
            pxlslog.create();
        }
    });
    inject.script('pxlog');
    inject.link('jQueryUIcss', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css');
    inject.link('pxlogcss', 'https://rawgit.com/quazzart/pxlslog/master/pxlslog.css');
};

removeOriginalScript();
if (document.readyState == 'complete') {
    load();
} else {
    window.addEventListener("load", function() {
        load();
    });
}