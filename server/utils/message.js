// função data
var moment = require('moment-timezone');


var genMsg = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};
var genLocMsg = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: moment().valueOf()
    }
};

module.exports = {
    genMsg,
    genLocMsg
};