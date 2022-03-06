const token = require('../utils/token');
const filter = require('../utils/filter');

test('Data sent into token should match data from verified token.', async ()=>{
    await token.setKeys();
    const newToken = await token.getToken('Hello! This is a test of the token system.');
    const results = await token.decryptToken(newToken);
    expect(results.payload.metadata).toBe('Hello! This is a test of the token system.');
});


test('Invalid input into token verification should cause decryptToken to throw with the message "Invalid Compact JWS"', async ()=>{
    await token.setKeys();
    try{
        await token.decryptToken('I am not a token');
    } catch(err){
        expect(err.message).toBe('Invalid Compact JWS');
    }
});

test('Valid input with swear words should return censored after being filtered', async ()=>{
    await token.setKeys();
    const filtered = filter('Hello! This is a great assessment for the assassins that take the assessments of a damn.')
    const newToken = await token.getToken(filtered);
    const results = await token.decryptToken(newToken);
    expect(results.payload.metadata).toBe('Hello! This is a great assessment for the assassins that take the assessments of a ****.');
});