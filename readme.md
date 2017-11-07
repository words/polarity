# polarity [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Detect the polarity of text, based on [`afinn-165`][afinn] and
[`emoji-emotion`][emoji].

## Installation

[npm][]:

```bash
npm install polarity
```

## Usage

```js
var polarity = require('polarity');

polarity(['some', 'positive', 'happy', 'cats']);
```

Yields:

```js
{
  polarity: 5,
  positivity: 5,
  negativity: 0,
  positive: ['happy', 'positive'],
  negative: []
}
```

```js
polarity(['darn', 'self-deluded', 'abandoned', 'dogs']);
```

Yields:

```js
{
  polarity: -4,
  positivity: 0,
  negativity: -4,
  positive: [],
  negative: ['abandoned', 'self-deluded']
}
```

## API

### `polarity(words[, inject])`

Get a polarity result from given values, optionally with one time injections.

**polarity** does not tokenise values.  There are better tokenisers around
([**parse-latin**][latin]).  However, the following will work pretty good:

```js
function tokenize(value) {
  return value.toLowerCase().match(/\S+/g);
}
```

###### Parameters

*   `words` (`Array.<string>`) — Words to parse
*   `inject` (`Object.<number>`, optional) — Custom valences for words

###### Returns

`Object`:

*   `polarity` (`number`) — Calculated polarity of input
*   `positivity` (`number`) — Total positivity
*   `negativity` (`number`) — Total negativity
*   `positive` (`Array.<string>`) — All positive words
*   `negative` (`Array.<string>`) — All negative words

### `polarity.inject(words)`

Insert custom values.

### `polarity.polarities`

Direct access to the internal values.

## Related

*   [`afinn-96`](https://github.com/words/afinn-96)
    — AFINN list from 2009, containing 1468 entries
*   [`afinn-111`](https://github.com/words/afinn-111)
    — AFINN list from 2011, containing 2477 entries
*   [`afinn-169`](https://github.com/words/afinn-169)
    — AFINN list from 2015, containing 3382 entries
*   [`emoji-emotion`](https://github.com/words/emoji-emotion)
    — Like AFINN, but for emoji

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/words/polarity.svg

[travis]: https://travis-ci.org/words/polarity

[codecov-badge]: https://img.shields.io/codecov/c/github/words/polarity.svg

[codecov]: https://codecov.io/github/words/polarity

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[afinn]: https://github.com/words/afinn-165

[emoji]: https://github.com/words/emoji-emotion

[latin]: https://github.com/wooorm/parse-latin
