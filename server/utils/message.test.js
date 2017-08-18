const expect = require('expect');

var {genMsg, genLocMsg} = require('./message');

describe('genMsg', ()=>{
    it('should generate correct message object', ()=> {
        var from = 'jen';
        var text = 'Some message';
        var message = genMsg(from, text);

        expect(message.createdAt).toBeA('string');
        expect(message).toInclude({
            from,
            text
        });
    });
});

describe('genLocMsg', () =>{
    it('should generate a location url', ()=>{
        var from = 'Deb';
        var lat = 15;
        var lng = 19;
        var url = 'https://www.google.com/maps?q=15,19';

        var message = genLocMsg( from, lat, lng);

        expect(message.createdAt).toBeA('string');
        expect(message).toInclude({from, url});
    });
});