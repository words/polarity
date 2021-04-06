/**
 * @typedef {Object} Polarity
 * @property {number} polarity
 * @property {number} positivity
 * @property {number} negativity
 * @property {Array.<string>} positive
 * @property {Array.<string>} negative
 *
 * @typedef {Object.<string, number>} Inject
 */

import {afinn165} from 'afinn-165'
import {emoji} from './emoji.js'

export var polarities = {}

var own = {}.hasOwnProperty

inject(afinn165)
inject(emoji)

/**
 * Get a polarity result from given values, optionally with one time injections.
 *
 * @param {Array.<string>} values
 * @param {Inject} inject
 * @returns {Polarity}
 */
export function polarity(values, inject) {
  var words = values || []
  var index = words.length === 0 ? 1 : words.length
  var positivity = 0
  var negativity = 0
  /** @type {Array.<string>} */
  var positive = []
  /** @type {Array.<string>} */
  var negative = []
  /** @type {string} */
  var value
  /** @type {number} */
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

/**
 * Inject values on the `polarities` object.
 *
 * @param {Inject} values
 */
export function inject(values) {
  /** @type {string} */
  var value

  for (value in values) {
    if (own.call(values, value)) {
      polarities[value] = values[value]
    }
  }
}

/**
 * Get the polarity of a word.
 *
 * @param {string} value
 * @param {Inject} inject
 */
function getPolarity(value, inject) {
  if (own.call(polarities, value)) {
    return polarities[value]
  }

  if (inject && own.call(inject, value)) {
    return inject[value]
  }

  return 0
}
