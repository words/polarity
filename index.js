/**
 * @typedef Polarity
 *   Info.
 * @property {number} polarity
 *   Calculated polarity of input.
 * @property {number} positivity
 *   Total positivity.
 * @property {number} negativity
 *   Total negativity.
 * @property {Array<string>} positive
 *   All positive words.
 * @property {Array<string>} negative
 *   All negative words.
 *
 * @typedef {Record<string, number>} Inject
 *   Values to inject.
 */

import {afinn165} from 'afinn-165'
import {emojiEmotion} from 'emoji-emotion'

/** @type {Inject} */
export const polarities = {}

const own = {}.hasOwnProperty

/** @type {Inject} */
const emoji = {}
let index = 0

while (++index < emojiEmotion.length) {
  const info = emojiEmotion[index]
  polarities[info.emoji] = info.polarity
  polarities[':' + info.name + ':'] = info.polarity
}

inject(afinn165)
inject(emoji)

/**
 * Get a polarity result from given values, optionally with one time injections.
 *
 * @param {Array<string>} values
 * @param {Inject} [inject]
 * @returns {Polarity}
 */
export function polarity(values, inject) {
  const words = values || []
  let index = words.length === 0 ? 1 : words.length
  let positivity = 0
  let negativity = 0
  /** @type {Array<string>} */
  const positive = []
  /** @type {Array<string>} */
  const negative = []

  while (index--) {
    const value = words[index]
    const weight = getPolarity(value, inject)

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
  let value

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
 * @param {Inject} [inject]
 * @returns {number}
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
