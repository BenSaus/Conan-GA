function rangeInt(low, high) {
    return Math.floor(Math.random() * high) + low
}

function randBool() {
    return Math.random() < 0.5
}

function clamp01(number) {
    return Math.min(Math.max(number, 0.0), 1.0)
}

function rangeFloat(low, high) {
    let dist = high - low
    return Math.random() * dist + low
}

module.exports = {
    rangeInt,
    rangeFloat,
    randBool,
    clamp01,
}
