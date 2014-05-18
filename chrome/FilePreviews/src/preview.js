/* global FilePreviews */
/* global url */
'use strict';
var previews = new FilePreviews({debug:true}),
    $result = $('#result'),
    $img = $result.find('img');

var options = {};

url.setUrl(window.location.href);
var encUrl = encodeURIComponent(url.url);

function insertThumbnail(thumb) {
  $img.clone().attr('src', thumb.url).appendTo('#result');
  $result.append('<br>');
}

function handlePSD(psd) {
  if (psd.url) insertThumbnail(psd);
  if (psd.layers) handlePSD(psd.layers);

  if (psd.length) {
    psd.forEach(function(layer) {
      handlePSD(layer);
    });
  }
}

function handleDocument(doc) {
  doc.forEach(function(page) {
    insertThumbnail(page);
  });
}

previews.generate(encUrl, options, function(err, result) {
  var resultTitle;

  if (err) {
    $result.html(':( Ups! An error ocurred.<br>' + err);
    resultTitle = 'Error';

  } else {
    if (result.metadata.extra_data.psd){
      handlePSD(result.metadata.extra_data.psd);
    } else {
        handleDocument(result.metadata.thumbnails);
    }

    resultTitle = 'Done - FilePreviews.io';
  }

  // Hide spinner
  $img.hide();
  document.title = resultTitle;
});
