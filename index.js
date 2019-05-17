'use strict'

var afinn = require('afinn-165')
var emoji = require('./emoji')

module.exports = polarity
polarity.inject = inject
polarity.polarities = {}

var polarities = polarity.polarities

var own = {}.hasOwnProperty

inject(afinn)
inject(emoji)

function polarity(values, inject) {
  var words = values || []
  var index = words.length || 1
  var positivity = 0
  var negativity = 0
  var positive = []
  var negative = []
  var value
  var weight

  while (index--) {
    value = words[index]
    weight = getPolarity(value, inject)

    if (!weight) {
      continue
    }

    if (weight > 0) {
      positive.push(value)
      positivity += weight
    } else {
      negative.push(value)
      negativity += weight
    }
  }

  return {
    polarity: positivity + negativity,
    positivity: positivity,
    negativity: negativity,
    positive: positive,
    negative: negative
  }
}

// Inject values on the `polarities` object.
function inject(values) {
  var value

  for (value in values) {
    polarities[value] = values[value]
  }
}

// Get the polarity of a word.
function getPolarity(value, inject) {
  if (own.call(polarities, value)) {
    return polarities[value]
  }

  if (inject && own.call(inject, value)) {
    return inject[value]
  }

  return 0
}
