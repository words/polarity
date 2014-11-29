'use strict';

/**
 * Dependencies.
 */

var polarity,
    fixtures;

polarity = require('./');
fixtures = require('./test/fixtures.json');

/**
 * Optional dependencies.
 */

var sentiment,
    sentimental,
    sediment,
    hasException;

try {
    sentiment = require('sentiment');
} catch (error) {
    hasException = true;
}

try {
    sentimental = require('Sentimental').analyze;
} catch (error) {
    hasException = true;
}

try {
    sediment = require('sediment');

    sediment.initialize();
} catch (error) {
    hasException = true;
}

if (hasException) {
    console.log(
        '\u001B[0;31m' +
        'The libraries needed by this benchmark could not be found. ' +
        'Please execute:\n' +
        '\tnpm run install-benchmark\n\n' +
        '\u001B[0m'
    );
}

/**
 * Invoke `callback` for every fixture.
 *
 * @param {function(string)} callback
 */

function eachFixture(callback) {
    Object.keys(fixtures).forEach(function (type) {
        fixtures[type].forEach(function (fixture) {
            callback(fixture);
        });
    });
}

/**
 * Simple word tokenizer.
 *
 * @param {string} value - Body of text, such as a paragraph.
 * @return {Array.<string>} List of lower-case words.
 */

function tokenize(value) {
    return value.toLowerCase().match(/\S+/g);
}

/**
 * Benchmarks.
 */

suite('benchmarks * 20 tweets (10 pos, 10 neg)', function () {
    bench('polarity -- this module', function () {
        eachFixture(function (fixture) {
            polarity(tokenize(fixture));
        });
    });

    if (sentiment) {
        bench('sentiment', function () {
            eachFixture(function (fixture) {
                sentiment(fixture);
            });
        });
    }

    if (sediment) {
        bench('sediment', function () {
            eachFixture(function (fixture) {
                sediment.analyze(fixture);
            });
        });
    }

    if (sentimental) {
        bench('Sentimental', function () {
            eachFixture(function (fixture) {
                sentimental(fixture);
            });
        });
    }
});
