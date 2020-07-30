const fetch = require('node-fetch').default;
const base64 = require('base-64');
const jwt_decode = require('jwt-decode');
let username = null;
let password = null;
let publicAPI = null;

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
      return true;
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
  if(params && params.email){
    email = params.email;
  }
  const registered = await isRegistered(email);
  if(registered){
    return { created : { statusCode: 302 }};
  }
  let city = null, state = null, country = null;
  if(params && params.city){
    city = params.city;
  }
  if(params && params.state){
    state = params.state;
  }
  if(params && params.country){
  country = params.country;
  }
  const healthLevels = [ "GOOD", "BAD" ];
  let health = "GOOD";
  if(params && params.health &&  healthLevels.includes(params.health)){
    health = params.health;
  }
  let covid19 = false;
  if(params && params.covid19){
    covid19 = params.covid19;
  }
  let symptoms = [];
  if(params && params.symptoms){
    symptoms = [ ...params.symptoms ];
  }
  let testedPositive = [];
  if(params && params.testedPositive){
    testedPositive = [ ...params.testedPositive ];
  }
  try{
    const now = new Date().toISOString();
    const promise = await fetch(`${publicAPI}/`,
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Basic "+ base64.encode(username + ":" + password) 
      },
      body: JSON.stringify({ city, state, country, health, covid19, symptoms, testedPositive,
      email, createdAt: now, type : "user"})
    });
    const resolve = await promise.json();
    return { created : { statusCode: 201 }};
  }catch(err){
    return { error: JSON.stringify(err.message)};
  }
}
global.main = main;