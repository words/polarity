'use strict';

var fs = require('fs');
var path = require('path');
var test = require('tape');
var polarity = require('..');

test('polarity()', function (t) {
  t.equal(typeof polarity, 'function', 'should be a `function`');

  t.deepEqual(
    polarity(['cool']),
    {
      polarity: 1,
      positivity: 1,
      negativity: 0,
      positive: ['cool'],
      negative: []
    },
    'should return a result object'
  );

  t.deepEqual(
    polarity(),
    {
      polarity: 0,
      positivity: 0,
      negativity: 0,
      positive: [],
      negative: []
    },
    'should return a result object when no value is given'
  );

  t.deepEqual(
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
  );

  t.deepEqual(
    polarity(Infinity),
    {
      polarity: 0,
      positivity: 0,
      negativity: 0,
      positive: [],
      negative: []
    },
    'should return a result object when an array-like value is given'
  );

  t.deepEqual(
    polarity(['hate', 'hate', 'cat', 'hate', 'hate'], {cat: 5}),
    {
      polarity: -7,
      positivity: 5,
      negativity: -12,
      positive: ['cat'],
      negative: ['hate', 'hate', 'hate', 'hate']
    },
    'should accept a temporary inject object'
  );

  polarity.inject({cat: 5});

  t.deepEqual(
    polarity(['hate', 'hate', 'cat', 'hate', 'hate']),
    {
      polarity: -7,
      positivity: 5,
      negativity: -12,
      positive: ['cat'],
      negative: ['hate', 'hate', 'hate', 'hate']
    },
    '`inject()`'
  );

  polarity.inject({cat: 0});

  t.deepEqual(
    polarity(['toString', 'prototype', 'constructor']),
    {
      polarity: 0,
      positivity: 0,
      negativity: 0,
      positive: [],
      negative: []
    },
    'should not throw when reaching for prototypal functions on `polarities`'
  );

  t.deepEqual(
    polarity(['he', 'made', 'me', ':smile:']),
    {
      polarity: 3,
      positivity: 3,
      negativity: 0,
      positive: [':smile:'],
      negative: []
    },
    'should accept gemoji'
  );

  t.deepEqual(
    polarity(['he', 'made', 'me', '\ud83d\ude31']),
    {
      polarity: -4,
      positivity: 0,
      negativity: -4,
      positive: [],
      negative: ['\ud83d\ude31']
    },
    'should accept emoji'
  );

  t.end();
});

test('algorithm', function (t) {
  var root = path.join('test', 'fixtures');

  fs
    .readdirSync(root)
    .forEach(function (filename) {
      if (path.extname(filename) !== '.txt') {
        return;
      }

      var doc = fs.readFileSync(path.join(root, filename), 'utf8').trim();
      var type = path.basename(filename, '.txt').split('-')[1];

      t.doesNotThrow(
        function () {
          var result = polarity(tokenize(doc));
          var positive = type === 'positive';

          if (
            (result.polarity < 1 && positive) ||
            (result.polarity > 1 && !positive)
          ) {
            throw new Error(
              'Expected ' + positive + ', but got `' +
              result.polarity + '`'
            );
          }
        },
        type + ': `' + doc + '`'
      );
    });

  t.end();
});

/* Simple word tokenizer. */
function tokenize(value) {
  return value.toLowerCase().match(/\S+/g);
}
