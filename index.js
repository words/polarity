'use strict';

/**
 * Dependencies.
 */

var afinn;

afinn = require('afinn-111');

/**
 * Cached methods.
 */

var has;

has = Object.prototype.hasOwnProperty;

/**
 * Get the polarity of a word.
 *
 * @param {string} value
 * @param {Object.<string, number>} inject
 * @return {number}
 */

function getPolarity(value, inject) {
    if (has.call(afinn, value)) {
        return afinn[value];
    } else if (inject && has.call(inject, value)) {
        return inject[value];
    }

    return 0;
}

/**
 * Define `polarity`
 *
 * @param {Array.<string>} values
 * @param {Object.<string, number>} inject
 * @return {Object}
 */

function polarity(values, inject) {
    var index,
        value,
        weigth,
        positive,
        negative,
        positivity,
        negativity;

    if (!values) {
        values = [];
    }

    index = values.length || 1;

    positivity = 0;
    negativity = 0;

    positive = [];
    negative = [];

    while (index--) {
        value = values[index];

        weigth = getPolarity(value, inject);

        if (!weigth) {
            continue;
        }

        if (weigth > 0) {
            positive.push(value);

            positivity += weigth;
        } else {
            negative.push(value);

            negativity += weigth;
        }
    }

    return {
        'polarity': positivity + negativity,
        'positivity': positivity,
        'negativity': negativity,
        'positive': positive,
        'negative': negative
    };
}

/**
 * Inject values on the `afinn` object.
 *
 * @param {Object.<string, number>} inject
 */

function inject(values) {
    var value;

    for (value in values) {
        /* istanbul ignore else */
        if (has.call(values, value)) {
            afinn[value] = values[value];
        }
    }
}

/**
 * Expose `inject` on `polarity`.
 */

polarity.inject = inject;

/**
 * Expose `afinn` on `polarity`.
 */

polarity.afinn = afinn;

/**
 * Expose `polarity`.
 */

module.exports = polarity;
