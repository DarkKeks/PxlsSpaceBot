// ==UserScript==
// @name         Tumbrl Reg
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  try to take over the world!
// @author       DarkKeks
// @match        https://www.tumblr.com/register*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.$ = function(s) { return document.querySelector(s); };
    
    var step1 = function() {
        if(!$('.signup_get_started_btn.active')) return setTimeout(step1, 100);
        $('.signup_get_started_btn.active').click();
        
        console.log("And now?");

        function randomString() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 10; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }

        function fillForm() {
            var username = randomString();
            $('#signup_email').value = username + "@mail.ru";
            $('#signup_password').value = username + "_9828";
            $('#signup_username').value = username;
            return {
                'username': username,
                'e-mail': username + "@mail.ru",
                'password': username + "_9828"
            };
        }

        var data = fillForm();

        var step2 = function() {
            if(!$('.signup_account_btn.active')) return setTimeout(step2, 100);
            $('.signup_account_btn.active').click();

            $('#signup_age').value = 27;

            $('#signup_tos').checked = 1;

            var step3 = function() {
                if(!$('.signup_birthday_btn.active')) return setTimeout(step3, 100);
                $('.signup_birthday_btn.active').click();

                alert(data['username'] + "\n" + data['password']);
            };
            setTimeout(step3, 100);
        };
        setTimeout(step2, 100);
    };
    setTimeout(step1, 100);
})();