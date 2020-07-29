const fetch = require('node-fetch').default;
const base64 = require('base-64');
const jwt_decode = require('jwt-decode');
const username = process.env["CLOUDANT_USER_NAME"];
const password = process.env["CLOUDANT_PASSWORD"];
const publicAPI = process.env["PUBLIC_API"];

async function main(params){
  const token = params.__ow_headers.authorization;
  var auth = jwt_decode(token);
  let { email } = auth;
  if(params.email){
    email = params.email;
  }
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
    if(resolve){
      const user = resolve.docs[0];
      delete user._id;
      delete user._rev;

      return { user };
    }
    return {error: { statusCode: 404 } };
  }catch(err){
    return { error: JSON.stringify(err.message)};
  }
}
global.main = main;