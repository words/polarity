'use strict';

/* eslint-disable no-cond-assign */

var fixtures, polarity, sentiment, sentimental, sediment;

polarity = require('..');
fixtures = require('../spec/fixtures.json');

try {
    sentiment = require('sentiment');
    sentimental = require('Sentimental').analyze;
    sediment = require('sediment');
    sediment.initialize();
} catch (error) {
    console.log(error);
    throw new Error(
        '\u001B[0;31m' +
        'The libraries needed by this benchmark could not be found. ' +
        'Please execute:\n' +
        '\tnpm run install-benchmark\n\n' +
        '\u001B[0m'
    );
}

function forEveryFixture(callback) {
    var type, typedFixtures, iterator, length;

    for (type in fixtures) {
        typedFixtures = fixtures[type];
        iterator = -1;
        length = typedFixtures.length;

        while (++iterator < length) {
            callback(typedFixtures[iterator]);
        }
    }
}

function tokenize(value) {
    return value.toLowerCase().replace(/[^-a-z0-9 ]/g, '').split(' ');
}

suite('benchmarks * 20 tweets (10 pos, 10 neg)', function () {
    bench('polarity -- this module', function () {
        forEveryFixture(function (fixture) {
            polarity(tokenize(fixture));
        });
    });

    bench('sentiment', function () {
        forEveryFixture(function (fixture) {
            sentiment(fixture);
        });
    });

    bench('sediment', function () {
        forEveryFixture(function (fixture) {
            sediment.analyze(fixture);
        });
    });

    bench('Sentimental', function () {
        forEveryFixture(function (fixture) {
            sentimental(fixture);
        });
    });
});
