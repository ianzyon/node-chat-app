// função data

function DateNow() {
    var t = new Date();
    return date = t.getDate()+"-"+ (t.getMonth()+1) +" "+ t.getHours()+":"+ t.getMinutes();
};

var genMsg = (from, text) => {
    return {
        from,
        text,
        createdAt: DateNow()
    }
};
var genLocMsg = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: DateNow()
    }
};

module.exports = {
    genMsg,
    genLocMsg
};