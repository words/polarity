import {afinn165} from 'afinn-165'
import {emoji} from './emoji.js'

export var polarities = {}

var own = {}.hasOwnProperty

inject(afinn165)
inject(emoji)

export function polarity(values, inject) {
  var words = values || []
  var index = words.length === 0 ? 1 : words.length
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
    positivity,
    negativity,
    positive,
    negative
  }
}

// Inject values on the `polarities` object.
export function inject(values) {
  var value

  for (value in values) {
    if (own.call(values, value)) {
      polarities[value] = values[value]
    }
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
