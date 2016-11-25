'use strict';

var fs = require('fs');
var table = require('markdown-table');
var gemoji = require('gemoji');
var polarity = require('..').polarities;

var expression = new RegExp(Object.keys(gemoji.unicode).join('|'), 'g');

var data = [
  ['Value', 'Polarity', 'Valence']
].concat(Object.keys(polarity).sort().map(function (thing) {
  var valence = polarity[thing];
  var score = ':neutral_face:';

  if (valence > 0) {
    score = ':smile:';
  } else if (valence < 0) {
    score = ':frowning:';
  }

  return [thing, score, valence];
}));

fs.writeFileSync('support.md',
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

  table(data, {align: 'c', stringLength: function (value) {
    return value.replace(expression, '  ').length;
  }}) +

  '\n'
);
