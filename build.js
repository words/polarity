'use strict'

var fs = require('fs')
var emotion = require('emoji-emotion')
var emojiToName = require('gemoji/emoji-to-name')

var data = {}

emotion.forEach(function (info) {
  data[info.emoji] = info.polarity
  data[':' + emojiToName[info.emoji] + ':'] = info.polarity
})

fs.writeFileSync('emoji.json', JSON.stringify(data, null, 2) + '\n')
