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


module.exports = {
    genMsg
};