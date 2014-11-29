'use strict';

/**
 * Dependencies.
 */

var polarity,
    fs,
    table,
    gemoji;

polarity = require('..').polarities;
fs = require('fs');
table = require('markdown-table');
gemoji = require('gemoji');

/**
 * Create an expression from all emoji.
 */

var expression;

expression = new RegExp(Object.keys(gemoji.unicode).join('|'), 'g');

/**
 * Set up data.
 */

var data;

data = [
    ['Value', 'Polarity', 'Valence']
].concat(
    Object.keys(polarity).sort().map(function (thing) {
        var valence,
            score;

        valence = polarity[thing];

        if (valence > 0) {
            score = ':smile:';
        } else if (valence < 0) {
            score = ':frowning:';
        } else {
            score = ':neutral_face:';
        }

        return [
            thing,
            score,
            valence
        ]
    })
);

/**
 * Write support.
 */

fs.writeFileSync('Support.md',
    'Support:\n' +
    '\n' +
    '=================\n' +
    '\n' +
    'More info: [**afinn-111** support](https://github.com/' +
        'wooorm/afinn-111#supported-words) and [**emoji-emotion**' +
        'support](https://github.com/wooorm/' +
        'emoji-emotion#supported-emoji).\n' +
    '\n' +
    'Gemoji are listed at the top, emoji at the end.\n' +
    '\n' +

    table(data, {
        'align': 'c',
        'stringLength': function (value) {
            return value.replace(expression, '  ').length;
        }
    }) +

    '\n'
);
