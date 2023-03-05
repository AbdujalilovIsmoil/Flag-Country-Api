"use strict";

const $ = (selector) => document.querySelector(selector);
const $$ = (selectors) => document.querySelectorAll(selectors);

const createDiv = (tagName,className,content) => {
  const tag = document.createElement(tagName);
  
  if(className){
    tag.setAttribute("class",className);
  }

  if(content){
    tag.innerHTML = content;
  }

  return tag;
};
