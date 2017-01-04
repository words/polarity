# polarity [![Build Status][travpolarity]][travis] [![Coverage Status][codecov-badge]][codecov]

Detect the polarity of text, based on [**afinn-165**][afinn] and
[**emoji-emotion**][emoji].

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

*   `words` (`Array.<string>`) — Words to parse;
*   `inject` (`Object.<number>`, optional) — Custom valences for words.

###### Returns

`Object`:

*   `polarity` (`number`) — Calculated polarity of input;
*   `positivity` (`number`) — Total positivity;
*   `negativity` (`number`) — Total negativity;
*   `positive` (`Array.<string>`) — All positive words;
*   `negative` (`Array.<string>`) — All negative words.

### `polarity.inject(words)`

Insert custom values.

### `polarity.polarities`

Direct access to the internal values.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travpolarity]: https://img.shields.io/travis/wooorm/polarity.svg

[travis]: https://travis-ci.org/wooorm/polarity

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/polarity.svg

[codecov]: https://codecov.io/github/wooorm/polarity

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[afinn]: https://github.com/wooorm/afinn-165

[emoji]: https://github.com/wooorm/emoji-emotion

[latin]: https://github.com/wooorm/parse-latin
