var io;
if (!io) io = {};
if (!io.github) io.github = {};
if (!io.github.aafactory) io.github.aafactory = {};

var script = document.createElement('script');
script.onload = function() { init() };
script.src = '/js/io/github/aafactory/gisutils.js';
document.head.appendChild(script);

