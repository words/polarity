'use strict'

/* eslint-env browser */

var polarity = require('polarity')
var English = require('parse-english')
var emoji = require('nlcst-emoji-modifier')
var toString = require('nlcst-to-string')

var english = new English()
english.useFirst('tokenizeSentence', emoji)

var $input = document.querySelector('textarea')
var $output = document.querySelector('div')

$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  var words = english
    .tokenizeSentence($input.value)
    .children.map(toString)
    .map(lower)
  var result = polarity(words)
  var valence

  $output.dataset.polarity = result.polarity

  if (result.polarity > 0) {
    valence = 'positive'
  } else if (result.polarity < 0) {
    valence = 'negative'
  } else {
    valence = 'neutral'
  }

  $output.dataset.valence = valence

  $output.innerHTML = [
    'Total polarity: ' + result.polarity,
    'Total positivity: ' + result.positivity,
    'Total negativity: ' + result.negativity,
    'Positive phrases: ' + result.positive.join('; '),
    'Negative phrases: ' + result.negative.join('; ')
  ].join('<br>')
}

function lower(value) {
  return value.toLowerCase()
}
