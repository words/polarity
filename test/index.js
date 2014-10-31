'use strict';

/**
 * Dependencies.
 */

var polarity,
    assert,
    fixtures;

polarity = require('..');
fixtures = require('./fixtures.json');
assert = require('assert');

/**
 * Simple word tokenizer.
 *
 * @param {string} value - Body of text, such as a paragraph.
 * @return {Array.<string>} List of lower-case words.
 */

function tokenize(value) {
    return value.toLowerCase().replace(/[^-a-z0-9 ]/g, '').split(' ');
}

/**
 * Tests.
 */

describe('polarity()', function () {
    it('should be a `function`', function () {
        assert(typeof polarity === 'function');
    });

    it('should return a result object', function () {
        var result;

        result = polarity(['cool']);

        assert(typeof result === 'object');

        assert(typeof result.polarity === 'number');

        assert('length' in result.positive);
        assert('length' in result.negative);

        assert(result.positive.length > -1);
        assert(result.negative.length > -1);
    });

    it('should return a result object when no value is given', function () {
        var result;

        result = polarity();

        assert(typeof result === 'object');

        assert(typeof result.polarity === 'number');

        assert('length' in result.positive);
        assert('length' in result.negative);

        assert(result.positive.length > -1);
        assert(result.negative.length > -1);
    });

    it('should return a result object when an array-like value is given',
        function () {
            var result;

            result = polarity({
                'length': 1,
                '0': 'hate'
            });

            assert(typeof result === 'object');

            assert(typeof result.polarity === 'number');

            assert('length' in result.positive);
            assert('length' in result.negative);

            assert(result.positive.length > -1);
            assert(result.negative.length > -1);
        }
    );

    it('should return a result object when a non-array-like value is given',
        function () {
            var result;

            result = polarity(Infinity);

            assert(typeof result === 'object');

            assert(typeof result.polarity === 'number');

            assert('length' in result.positive);
            assert('length' in result.negative);

            assert(result.positive.length > -1);
            assert(result.negative.length > -1);
        }
    );

    it('should accept a temporary inject object', function () {
        var source,
            result;

        source = tokenize('hate hate cat hate hate');

        result = polarity(source).polarity;

        assert(polarity(source, {
            'cat': 5
        }).polarity !== result);

        assert(polarity(source).polarity === result);
    });

    it('should not throw when reaching for prototypal functions on afinn',
        function () {
            assert.doesNotThrow(function () {
                var result;

                result = polarity(['toString', 'prototype', 'constructor']);

                assert(typeof result.polarity === 'number');
            });
        }
    );
});

describe('algorithm', function () {
    var type;

    function classifyPolarity(fixture, type) {
        var result,
            isPositive;

        result = polarity(tokenize(fixture));

        isPositive = type === 'positive';

        /* istanbul ignore if */
        if (
            (
                result.polarity < 1 &&
                isPositive
            ) ||
            (
                result.polarity > 1 &&
                !isPositive
            )
        ) {
            throw new Error(
                'Expected ' + isPositive + ', but got `' +
                result.polarity + '`'
            )
        }
    }

    function classifyPolarities(typedFixtures, type) {
        typedFixtures.forEach(function (fixture) {
            it('should classify `' + fixture + '` as `' + type + '`',
                function () {
                    classifyPolarity(fixture, type);
                }
            );
        });
    }

    for (type in fixtures) {
        classifyPolarities(fixtures[type], type);
    }
});

describe('polarity.inject()', function () {
    it('should be a `function`', function () {
        assert(typeof polarity.inject === 'function');
    });

    it('should inject values', function () {
        var source,
            result;

        source = tokenize('hate hate cat hate hate');

        result = polarity(source).polarity;

        polarity.inject({
            'cat': 5
        });

        assert(polarity(source).polarity !== result);
    });
});
