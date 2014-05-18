/* global chrome */
'use strict';

function openPreviewTab(url) {
  var encUrl = encodeURIComponent(url);
  chrome.tabs.create({
    url: chrome.extension.getURL('src/preview.html?url=' + encUrl)
  });
}

function srcHandler(info) {
  openPreviewTab(info.srcUrl);
}

function linkHandler(info) {
  openPreviewTab(info.linkUrl);
}

// Create one test item for each context type.
var tagContexts = ['image', 'video', 'audio'];
var textContexts = ['selection', 'link','editable'];

chrome.contextMenus.create({title: 'Preview from source...',
                           contexts: tagContexts, onclick: srcHandler});

chrome.contextMenus.create({title: 'Preview from link...',
                            contexts: textContexts, onclick: linkHandler});

