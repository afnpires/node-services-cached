function render(callback, result, value) {
    callback(null, 'test' + value + result);
}

module.exports = { render };
