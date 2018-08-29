'use strict'

var fs = require('fs')
var emotion = require('emoji-emotion')
var gemoji = require('gemoji')

var data = {}

emotion.forEach(function(info) {
  data[info.emoji] = info.polarity
  data[':' + gemoji.unicode[info.emoji].name + ':'] = info.polarity
})

fs.writeFileSync('emoji.json', JSON.stringify(data, null, 2) + '\n')
