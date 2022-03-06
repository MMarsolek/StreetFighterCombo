
const jose = require('jose')

const issuer = 'StreetFighterComboKeeperBackEnd';
const audience = 'StreetFighterComboKeeperFrontEnd';
let publicKey;
let privateKey;


//Get Key
async function setKeys(){
    let obj = await jose.generateKeyPair('PS256');
    publicKey = obj.publicKey;
    privateKey = obj.privateKey;
    return;
}

async function getToken(){
    
    //Get token
    const jwt = await new jose.SignJWT( 
        {quote: 'It’s a dangerous business, Frodo, going out your door.'}
        )
        .setProtectedHeader({ alg: 'PS256' })
        .setIssuedAt()
        //Sets the user
        .setIssuer(issuer)
        //Who the token is for
        .setAudience(audience)
        //When it expires
        .setExpirationTime('48h')
        .sign(privateKey)

    return jwt;
}

//Decrypts the passed in tokens
async function decryptToken(token){
    try{
    const decryptedToken = await jose.jwtVerify(token, publicKey, {
        issuer,
        audience
    }) 
    return decryptedToken;
    }catch(err){
        return false;
    }
}



//Runs all functions to ensure they are working properly
async function test(){
    await setKeys();
    const token = await getToken();
    const response = await decryptToken(token);
}

test();

module.exports = { setKeys, getToken, decryptToken}
