import fs from 'node:fs'
import {emojiEmotion} from 'emoji-emotion'
import {emojiToName} from 'gemoji'

var data = {}
var index = -1

while (++index < emojiEmotion.length) {
  data[emojiEmotion[index].emoji] = emojiEmotion[index].polarity
  data[':' + emojiToName[emojiEmotion[index].emoji] + ':'] =
    emojiEmotion[index].polarity
}

fs.writeFileSync(
  'emoji.js',
  'export var emoji = ' + JSON.stringify(data, null, 2) + '\n'
)
