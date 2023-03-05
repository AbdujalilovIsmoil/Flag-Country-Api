"use strict";

var $ = function $(selector) {
  return document.querySelector(selector);
};

var $$ = function $$(selectors) {
  return document.querySelectorAll(selectors);
};

var createDiv = function createDiv(tagName, className, content) {
  var tag = document.createElement(tagName);

  if (className) {
    tag.setAttribute("class", className);
  }

  if (content) {
    tag.innerHTML = content;
  }

  return tag;
};