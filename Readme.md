# polarity [![Build Status](https://img.shields.io/travis/wooorm/polarity.svg?style=flat)](https://travis-ci.org/wooorm/polarity) [![Coverage Status](https://img.shields.io/coveralls/wooorm/polarity.svg?style=flat)](https://coveralls.io/r/wooorm/polarity?branch=master)

Detect the polarity of text, based on [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010).

Uses [wooorm/afinn-111](https://github.com/wooorm/afinn-111).

## Installation

npm:
```sh
$ npm install polarity
```

Component:
```sh
$ component install wooorm/polarity
```

Bower:
```sh
$ bower install polarity
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

## Benchmark

On a MacBook Air, it detects the polarity of 141,980 tweets per second.
This is with a manual tokenisation step (like the competition) taken into account. Without the tokenisation step, **polarity** is much faster.

```
         benchmarks * 20 tweets (10 pos, 10 neg)
  7,099 op/s » polarity -- this module
  4,484 op/s » sentiment
  3,207 op/s » sediment
  2,298 op/s » Sentimental
```

## License

MIT © Titus Wormer
