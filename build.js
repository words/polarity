'use strict'

var fs = require('fs')
var emotion = require('emoji-emotion')
var emojiToName = require('gemoji/emoji-to-name')

var data = {}
var index = -1

while (++index < emotion.length) {
  data[emotion[index].emoji] = emotion[index].polarity
  data[':' + emojiToName[emotion[index].emoji] + ':'] = emotion[index].polarity
}

fs.writeFileSync('emoji.json', JSON.stringify(data, null, 2) + '\n')
