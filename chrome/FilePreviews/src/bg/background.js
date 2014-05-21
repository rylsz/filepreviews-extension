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

function selectionHandler(info) {
  openPreviewTab(info.selectionText);
}

function linkHandler(info) {
  openPreviewTab(info.linkUrl);
}

// Create one test item for each context type.
var tagContexts = ['image', 'video', 'audio'];
var textContexts = ['selection', 'editable'];
var linkContext = ['link'];

chrome.contextMenus.create({title: 'Preview from source...',
                           contexts: tagContexts, onclick: srcHandler});

chrome.contextMenus.create({title: 'Preview from selection...',
                            contexts: textContexts, onclick: selectionHandler});

chrome.contextMenus.create({title: 'Preview from link...',
                            contexts: linkContext, onclick: linkHandler});
