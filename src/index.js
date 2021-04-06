/* eslint-env browser */

import {polarity} from 'polarity'
import {ParseEnglish} from 'parse-english'
import emoji from 'nlcst-emoji-modifier'
import toString from 'nlcst-to-string'

const english = new ParseEnglish()
english.useFirst('tokenizeSentence', emoji)

const $input = document.querySelector('textarea')
const $output = document.querySelector('div')

$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  const words = english
    .tokenizeSentence($input.value)
    .children.map((d) => toString(d))
    .map((d) => d.toLowerCase())
  const result = polarity(words)
  let valence

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
    'Total negativity: ' + result.negativity * -1,
    'Positive phrases: ' + result.positive.join('; '),
    'Negative phrases: ' + result.negative.join('; ')
  ].join('<br>')
}
