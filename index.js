'use strict';

var afinn, isOwnProperty;

afinn = require('afinn-111');

isOwnProperty = Object.prototype.hasOwnProperty;

function getPolarity(value, inject) {
    if (isOwnProperty.call(afinn, value)) {
        return afinn[value];
    } else if (inject && isOwnProperty.call(inject, value)) {
        return inject[value];
    }

    return 0;
}

function polarity(values, inject) {
    var iterator, length, value, weigth, positive, negative, positivity,
        negativity;

    if (!values) {
        values = [];
    }

    length = values.length || 0;
    positivity = negativity = 0;
    iterator = -1;
    positive = [];
    negative = [];

    while (++iterator < length) {
        value = values[iterator];
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

function inject(values) {
    var value;

    for (value in values) {
        /* istanbul ignore else */
        if (isOwnProperty.call(values, value)) {
            afinn[value] = values[value];
        }
    }
}

polarity.inject = inject;

polarity.afinn = afinn;

exports = module.exports = polarity;
