# polarity [![Build Status](https://img.shields.io/travis/wooorm/polarity.svg?style=flat)](https://travis-ci.org/wooorm/polarity) [![Coverage Status](https://img.shields.io/coveralls/wooorm/polarity.svg?style=flat)](https://coveralls.io/r/wooorm/polarity?branch=master)

Detect the polarity of text, based on [afinn-111](https://github.com/wooorm/afinn-111) and [emoji-emotion](https://github.com/wooorm/emoji-emotion).

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

polarity(['some', 'positive', 'happy', 'cats']);
/* {
 *   polarity: 5,
 *   positive: [ 'positive', 'happy' ],
 *   negative: []
 * }
 */

polarity(['darn', 'self-deluded', 'abandoned', 'dogs']);
/* {
 *   polarity: -4,
 *   positive: [],
 *   negative: [ 'self-deluded', 'abandoned' ]
 * }
 */

polarity(['some', 'positive', 'happy', 'cats'], {
  'cats' : Infinity
});
/* {
 *   polarity: Infinity,
 *   positive: [ 'positive', 'happy', 'cats' ],
 *   negative: []
 * }
 */

polarity.inject({
    'dogs' : -Infinity /* What?! */
});

polarity(['darn', 'self-deluded', 'abandoned', 'dogs']);
/* {
 *   polarity: -Infinity,
 *   positive: [],
 *   negative: [ 'self-deluded', 'abandoned', 'dogs' ]
 * }
 */
```

## API

### polarity(values, inject?)

Get a polarity result from given values, optionally with one time injections.

**polarity** does not tokenise values. There are better tokenisers around (hint hint, **[parse-latin](https://github.com/wooorm/parse-latin)**). However, the following will work pretty good:

```js
function tokenize(value) {
    return value.toLowerCase().match(/\S+/g);
}
```

### polarity.inject(words)

Insert custom values.

### polarity.polarities

Direct access to the internal values.

## Benchmark

On a MacBook Air, it detects the polarity of 142,300 tweets per second.
This is with a manual tokenisation step (like the competition) taken into account. Without the tokenisation step, **polarity** is much faster.

```
         benchmarks * 20 tweets (10 pos, 10 neg)
  7,218 op/s » polarity -- this module
  4,374 op/s » sentiment
  3,182 op/s » sediment
  2,284 op/s » Sentimental
```

## License

MIT © [Titus Wormer](http://wooorm.com)
