'use strict';

var fixtures = {},
    iterator = -1,
    directory = './spec',
    fixtureDirectory = directory + '/fixtures',
    files, file, filename, fixture, fs, extensionIndex, polarity,
    start;

fs = require('fs');

files = fs.readdirSync(fixtureDirectory);

while (files[++iterator]) {
    file = files[iterator];
    extensionIndex = file.indexOf('.txt');

    if (extensionIndex === -1) {
        continue;
    }

    filename = file.substr(0, extensionIndex);
    fixture = fs.readFileSync(fixtureDirectory + '/' + file, 'utf-8');

    start = filename.indexOf('-') + 1;

    polarity = filename.substr(start, filename.lastIndexOf('-') - start);

    if (!(polarity in fixtures)) {
        fixtures[polarity] = [];
    }

    fixtures[polarity].push(fixture.trim());
}

fixtures = JSON.stringify(fixtures, null, 4);
fs.writeFileSync(directory + '/fixtures.json', fixtures);
