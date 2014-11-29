'use strict';

var fixtures,
    directory,
    fixtureDirectory,
    fs,
    files,
    extensionIndex,
    filename,
    fixture,
    start,
    polarity;

fixtures = {};

directory = './test';
fixtureDirectory = directory + '/fixtures';

fs = require('fs');

files = fs.readdirSync(fixtureDirectory);

files.forEach(function (file) {
    extensionIndex = file.indexOf('.txt');

    if (extensionIndex === -1) {
        return;
    }

    filename = file.substr(0, extensionIndex);
    fixture = fs.readFileSync(fixtureDirectory + '/' + file, 'utf-8');

    start = filename.indexOf('-') + 1;

    polarity = filename.substr(start, filename.lastIndexOf('-') - start);

    if (!(polarity in fixtures)) {
        fixtures[polarity] = [];
    }

    fixtures[polarity].push(fixture.trim());
});

fixtures = JSON.stringify(fixtures, null, 2);

fs.writeFileSync(directory + '/fixtures.json', fixtures);
