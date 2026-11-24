// ==UserScript==
// @name         ER Pocket Option
// @description  Lance automatiquement le script ER sur Pocket Option, a chaque chargement de page
// @match        *://pocketoption.com/*
// @match        *://*.pocketoption.com/*
// @run-at       document-end
// @noframes
// @grant        none
// ==/UserScript==

(function () {
  if (window.top !== window.self) return;
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/gh/princegnivo/er.js@main/er11.js?auto=1&v=' + Date.now();
  (document.head || document.documentElement).appendChild(s);
})();
