'use strict';

var fs = require('fs');
var path = require('path');

var fixtures = {};

fs
  .readdirSync(path.join('test', 'fixtures'))
  .forEach(function (file) {
    var extensionIndex = file.indexOf('.txt');

    if (extensionIndex === -1) {
      return;
    }

    var filename = file.substr(0, extensionIndex);
    var fixture = fs.readFileSync(path.join('test', 'fixtures', file), 'utf8');
    var start = filename.indexOf('-') + 1;
    var polarity = filename.substr(start, filename.lastIndexOf('-') - start);

    if (!(polarity in fixtures)) {
      fixtures[polarity] = [];
    }

    fixtures[polarity].push(fixture.trim());
  });

fixtures = JSON.stringify(fixtures, null, 2);

fs.writeFileSync(path.join('test', 'fixtures.json'), fixtures + '\n');
