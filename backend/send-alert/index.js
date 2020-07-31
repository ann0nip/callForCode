const fetch = require('node-fetch').default;
const base64 = require('base-64');
const jwt_decode = require('jwt-decode');
let username = null;
let password = null;
let publicAPI = null;
let publicPushNotificationAPI = null;
let appSecret = null;

async function isRegistered(email){
  try{  
    const selector = { selector :  { "email" : email } };
    const promise = await fetch(`${publicAPI}/_find`,
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + base64.encode(username + ":" + password) 
      },
      body: JSON.stringify(selector)
    });
    const resolve = await promise.json();
    if(resolve && resolve.docs.length === 1){
      return resolve.docs[0];
    }
    return false;
  }catch(err){
    return false;
  }
}
async function main(params){
  const token = params.__ow_headers.authorization;
  var auth = jwt_decode(token);
  let { email } = auth;

  username =  params.CLOUDANT_USER_NAME;
  password = params.CLOUDANT_PASSWORD;
  publicAPI = params.PUBLIC_API;
  publicPushNotificationAPI = params.PUBLIC_PUSH_API;
  appSecret=params.APP_SECRET;
  if(params && params.email){
    email = params.email;
  }
  const user = await isRegistered(email);
  if(!user){
    return { sendAlert : { statusCode: 404 } };
  }
  const healthLevels = [ "GOOD", "STABLE", "BAD" ];
  let health = "GOOD";
  if(params && params.health &&  healthLevels.includes(params.health)){
    health = params.health;
  }
  if(!params || !params.covid19){
    return { sendAlert : { statusCode: 400 }};
  }
  
  if(!params || !params.symptoms){
    return { sendAlert : { statusCode: 400 }};
  }
  
  if(!params || !params.testedPositive){
    return { sendAlert : { statusCode: 400 }};
  }
  const userUpd = { ...user };
  userUpd.covid19 = params.covid19;
  userUpd.symptoms = [ ...params.symptoms ];
  userUpd.testedPositive = [ ...params.testedPositive ];
  try{
    const now = new Date().toISOString();
    const promise = await fetch(`${publicAPI}/${userUpd._id}`,
    {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Basic "+ base64.encode(username + ":" + password) 
      },
      body: JSON.stringify(userUpd)
    });
    const resolve = await promise.json();

    const message = {
      "message": {
        "alert": params.message || "Alert",
        "url": params.url || "https://gracious-boyd-76a065.netlify.app/"
      }
    };
    const promiseNotify = await fetch(`${publicPushNotificationAPI}`,
    {
      method:'POST',
      headers: { 
        'clientSecret': appSecret,
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language':'en-US'
      },
      body: JSON.stringify(message)
    });
    const resolveNotifycation = await promiseNotify.json();
    return { created : { statusCode: 204 }};
  }catch(err){
    return { error: JSON.stringify(err.message)};
  }
}
global.main = main;