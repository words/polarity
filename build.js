import fs from 'node:fs'
import {emojiEmotion} from 'emoji-emotion'
import {emojiToName} from 'gemoji'

/** @type {Record<string, number>} */
const data = {}
let index = -1

while (++index < emojiEmotion.length) {
  const info = emojiEmotion[index]
  data[info.emoji] = info.polarity
  data[':' + emojiToName[info.emoji] + ':'] = info.polarity
}

fs.writeFileSync(
  'emoji.js',
  'export const emoji = ' + JSON.stringify(data, null, 2) + '\n'
)
