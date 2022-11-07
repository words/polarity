# polarity

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Sentiment analysis of natural language with [`afinn-165`][afinn] and
[`emoji-emotion`][emoji].

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`polarity(words[, inject])`](#polaritywords-inject)
    *   [`inject(words)`](#injectwords)
    *   [`polarities`](#polarities)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [Security](#security)
*   [License](#license)

## What is this?

You can give this package words, and it’ll tell you the
[valence][valence-wiki] (“goodness” vs “badness”), and which words are positive
or negative.

## When should I use this?

You can use this with your own tokenizer to do some simple sentiment analysis.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+, 16.0+), install with [npm][]:

```sh
npm install polarity
```

In Deno with [`esm.sh`][esmsh]:

```js
import {polarity} from 'https://esm.sh/polarity@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {polarity} from 'https://esm.sh/polarity@4?bundle'
</script>
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

This package exports the identifier `polarity`, `inject`, and `polarities`.
There is no default export.

### `polarity(words[, inject])`

Get a polarity result from given values, optionally with one time injections.

> 👉 **Note**: `polarity` does not tokenize values.
> There are good tokenizers around (such as [`parse-latin`][latin]).
> However, the following will work pretty good:
>
> ```js
> function tokenize(value) {
>   return value.toLowerCase().match(/\S+/g)
> }
> ```

###### Parameters

*   `words` (`Array<string>`) — words to check
*   `inject` (`Record<string, number>`, optional) — custom valences for words

###### Returns

Object with the following fields:

*   `polarity` (`number`) — calculated polarity of input
*   `positivity` (`number`) — total positivity
*   `negativity` (`number`) — total negativity
*   `positive` (`Array<string>`) — all positive words
*   `negative` (`Array<string>`) — all negative words

### `inject(words)`

Insert custom values.

### `polarities`

Direct access to the internal values (`Record<string, number>`).

## Types

This package is fully typed with [TypeScript][].
It exports the additional type `Polarity` (the result).

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
It also works in Deno and modern browsers.

## Related

*   [`afinn-165`](https://github.com/words/afinn-165)
    — AFINN list from 2015, containing 3382 entries
*   [`emoji-emotion`](https://github.com/words/emoji-emotion)
    — like AFINN, but for emoji

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## Security

This package is safe.

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

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[license]: license

[author]: https://wooorm.com

[afinn]: https://github.com/words/afinn-165

[emoji]: https://github.com/words/emoji-emotion

[latin]: https://github.com/wooorm/parse-latin

[valence-wiki]: https://en.wikipedia.org/wiki/Valence_\(psychology\)
