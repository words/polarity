import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import {polarity, inject} from '../index.js'

test('polarity()', function () {
  assert.equal(typeof polarity, 'function', 'should be a `function`')

  assert.deepEqual(
    polarity(['cool']),
    {
      polarity: 1,
      positivity: 1,
      negativity: 0,
      positive: ['cool'],
      negative: []
    },
    'should return a result object'
  )

  assert.deepEqual(
    // @ts-expect-error: missing.
    polarity(),
    {
      polarity: 0,
      positivity: 0,
      negativity: 0,
      positive: [],
      negative: []
    },
    'should return a result object when no value is given'
  )

  assert.deepEqual(
    // @ts-expect-error: array-like
    polarity({
      length: 1,
      0: 'hate'
    }),
    {
      polarity: -3,
      positivity: 0,
      negativity: -3,
      positive: [],
      negative: ['hate']
    },
    'should return a result object when an array-like value is given'
  )

  assert.deepEqual(
    // @ts-expect-error: invalid
    polarity(Number.POSITIVE_INFINITY),
    {
      polarity: 0,
      positivity: 0,
      negativity: 0,
      positive: [],
      negative: []
    },
    'should return a result object when an invalid value is given'
  )

  assert.deepEqual(
    polarity(['hate', 'hate', 'cat', 'hate', 'hate'], {cat: 5}),
    {
      polarity: -7,
      positivity: 5,
      negativity: -12,
      positive: ['cat'],
      negative: ['hate', 'hate', 'hate', 'hate']
    },
    'should accept a temporary inject object'
  )

  inject({cat: 5})

  assert.deepEqual(
    polarity(['hate', 'hate', 'cat', 'hate', 'hate']),
    {
      polarity: -7,
      positivity: 5,
      negativity: -12,
      positive: ['cat'],
      negative: ['hate', 'hate', 'hate', 'hate']
    },
    '`inject()`'
  )

  inject({cat: 0})

  assert.deepEqual(
    polarity(['toString', 'prototype', 'constructor']),
    {
      polarity: 0,
      positivity: 0,
      negativity: 0,
      positive: [],
      negative: []
    },
    'should not throw when reaching for prototypal functions on `polarities`'
  )

  assert.deepEqual(
    polarity(['he', 'made', 'me', ':smile:']),
    {
      polarity: 2,
      positivity: 2,
      negativity: 0,
      positive: [':smile:'],
      negative: []
    },
    'should accept gemoji'
  )

  assert.deepEqual(
    polarity(['he', 'made', 'me', '\uD83D\uDE31']),
    {
      polarity: -3,
      positivity: 0,
      negativity: -3,
      positive: [],
      negative: ['\uD83D\uDE31']
    },
    'should accept emoji'
  )
})

test('algorithm', async function () {
  const rootUrl = new URL('fixtures/', import.meta.url)
  const files = await fs.readdir(rootUrl)
  let index = -1

  /* eslint-disable no-await-in-loop */
  while (++index < files.length) {
    if (path.extname(files[index]) !== '.txt') {
      continue
    }

    const stem = path.basename(files[index], '.txt')
    const fixtureUrl = new URL(files[index], rootUrl)
    const doc = String(await fs.readFile(fixtureUrl)).trim()
    const type = stem.split('-')[1]

    assert.doesNotThrow(function () {
      const result = polarity(tokenize(doc))
      const positive = type === 'positive'

      if (
        (result.polarity < 1 && positive) ||
        (result.polarity > 1 && !positive)
      ) {
        throw new Error(
          'Expected ' + positive + ', but got `' + result.polarity + '`'
        )
      }
    }, type + ': `' + doc + '`')
  }
  /* eslint-enable no-await-in-loop */
})

/**
 * Simple word tokenizer.
 *
 * @param {string} value
 * @returns {Array<string>}
 */
function tokenize(value) {
  const match = value.toLowerCase().match(/\S+/g)
  return match ? [...match] : []
}
