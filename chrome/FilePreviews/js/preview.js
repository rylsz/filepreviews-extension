/* global FilePreviews */
/* global url */
'use strict';
var previews = new FilePreviews({apiKey:'V5Z2n1DmeKChINJD2188lZZZY5SSOQ'}),
    $result = $('#result'),
    $img = $result.find('img');

var options = {};

url.setUrl(window.location.href);

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

previews.generate(url.url, options, function(err, result) {
  var resultTitle,
      metadataResults = result.metadata.results;

  if (err) {
    $result.html(':( Ups! An error ocurred.<br>' + err);
    resultTitle = 'Error';

  } else {
    if (metadataResults.metadata.psd){
      handlePSD(metadataResults.metadata.psd);
    } else {
      handleDocument(metadataResults.thumbnails);
    }

    resultTitle = 'Done - FilePreviews.io';
  }

  // Hide spinner
  $img.hide();
  document.title = resultTitle;
});
