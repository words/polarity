'use strict';

/**
 * Dependencies.
 */

var emotion,
    gemoji,
    fs;

emotion = require('emoji-emotion');
gemoji = require('gemoji');
fs = require('fs');

/**
 * Data.
 */

var data;

data = {};

/**
 * Add unicode emoji.
 */

emotion.forEach(function (info) {
    data[info.emoji] = info.polarity;
});

/**
 * Add gemoji shortcodes.
 */

emotion.forEach(function (info) {
    data[':' + gemoji.unicode[info.emoji].name + ':'] = info.polarity;
});

/**
 * Write.
 */

fs.writeFileSync('data/emoji.json', JSON.stringify(data, null, 2));
