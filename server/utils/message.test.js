const expect = require('expect');

var {genMsg} = require('./message');

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