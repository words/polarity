# polarity

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Detect the polarity of text, based on [`afinn-165`][afinn] and
[`emoji-emotion`][emoji].

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install polarity
```

## Use

```js
import {polarity} from 'polarity'

polarity(['some', 'positive', 'happy', 'cats'])
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
polarity(['darn', 'self-deluded', 'abandoned', 'dogs'])
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

This package exports the following identifiers: `polarity`, `inject`,
`polarities`.
There is no default export.

### `polarity(words[, inject])`

Get a polarity result from given values, optionally with one time injections.

**polarity** does not tokenize values.
There are better tokenizers around ([**parse-latin**][latin]).
However, the following will work pretty good:

```js
function tokenize(value) {
  return value.toLowerCase().match(/\S+/g)
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

### `inject(words)`

Insert custom values.

### `polarities`

Direct access to the internal values.

## Related

*   [`afinn-96`](https://github.com/words/afinn-96)
    — AFINN list from 2009, containing 1468 entries
*   [`afinn-111`](https://github.com/words/afinn-111)
    — AFINN list from 2011, containing 2477 entries
*   [`afinn-165`](https://github.com/words/afinn-165)
    — AFINN list from 2015, containing 3382 entries
*   [`emoji-emotion`](https://github.com/words/emoji-emotion)
    — Like AFINN, but for emoji

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/words/polarity/workflows/main/badge.svg

[build]: https://github.com/words/polarity/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/words/polarity.svg

[coverage]: https://codecov.io/github/words/polarity

[downloads-badge]: https://img.shields.io/npm/dm/polarity.svg

[downloads]: https://www.npmjs.com/package/polarity

[size-badge]: https://img.shields.io/bundlephobia/minzip/polarity.svg

[size]: https://bundlephobia.com/result?p=polarity

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[afinn]: https://github.com/words/afinn-165

[emoji]: https://github.com/words/emoji-emotion

[latin]: https://github.com/wooorm/parse-latin
