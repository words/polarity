# polarity [![Build Status](https://travis-ci.org/wooorm/polarity.svg?branch=master)](https://travis-ci.org/wooorm/polarity) [![Coverage Status](https://img.shields.io/coveralls/wooorm/polarity.svg)](https://coveralls.io/r/wooorm/polarity?branch=master)

Detect the polarity of text, based on [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010).

Uses [wooorm/afinn-111](https://github.com/wooorm/afinn-111).

## Installation

NPM:
```sh
$ npm install polarity
```

Component.js:
```sh
$ component install wooorm/polarity
```

## Usage

```js
var polarity = require('polarity');

polarity(['some', 'positive', 'happy', 'cats']); /* {
 *   polarity: 5,
 *   positive: [ 'positive', 'happy' ],
 *   negative: []
 * }
 */

polarity(['darn', 'self-deluded', 'abandoned', 'dogs']); /* {
 *   polarity: -4,
 *   positive: [],
 *   negative: [ 'self-deluded', 'abandoned' ]
 * }
 */

polarity(['some', 'positive', 'happy', 'cats'], {
  'cats' : Infinity
}); /* {
 *   polarity: Infinity,
 *   positive: [ 'positive', 'happy', 'cats' ],
 *   negative: []
 * }
 */

polarity.inject({
    'dogs' : -Infinity /* What?! */
});

polarity(['darn', 'self-deluded', 'abandoned', 'dogs']); /* {
 *   polarity: -Infinity,
 *   positive: [],
 *   negative: [ 'self-deluded', 'abandoned', 'dogs' ]
 * }
 */
```

## API

### polarity(values[string]?, inject?)

Get a polarity result from given values, optionally with one time injections.

**polarity** does not tokenise values. There are better tokenisers around (hint hint, **[parse-latin](https://github.com/wooorm/parse-latin)**). However, the following will work pretty good:

```js
function tokenize(value) {
    return value.toLowerCase().replace(/[^-a-z0-9 ]/g, '').split(' ');
}
```

### polarity.inject(inject{word: weight})

Replace AFINN weights with your own.

### polarity.afinn

Direct access to **afinn-111**.

## Supported words

**polarity** supports all AFINN-111 words/phrases. **afinn-111** has more information on what words and phrases are [supported](https://github.com/wooorm/afinn-111#supported-words).

## Other polarity detection libraries

- [thisandagain/sentiment](https://github.com/thisandagain/sentiment) — Slower (but pretty good nonetheless), has tokeniser, async support;
- [mileszim/sediment](https://github.com/mileszim/sediment) — Slower, has tokeniser.
- [thinkroth/Sentimental](https://github.com/thinkroth/Sentimental) — Slower, has tokeniser.

## Benchmark

Run the benchmark yourself:

```sh
$ npm run install-benchmark # Just once of course.
$ npm run benchmark
```

On a MacBook Air, it detects the polarity of 168,820 tweets per second.
This is with a manual tokenisation step (like the others do) taken into account.
Without the tokenisation step, **polarity** is of course much faster.

```
         benchmarks * 20 tweets (10 pos, 10 neg)
  8,441 op/s » polarity -- this module
  7,708 op/s » sentiment
  3,950 op/s » sediment
  2,604 op/s » Sentimental
```

## License

MIT
