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
  let { limit } = params;
  if(!limit){
    limit = 5;
  }
  try{  
    const selector = { selector : { "integrants": { "$in": [email ]},"date": {"$ne": null } },"fields": [
      "level",
      "date",
      "meetingId"
    ]};
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
    const { docs }  = resolve;
    if(!docs ){
      return {error: { statusCode: 404 } };
    }

    if(docs){
      const meetings = docs.map( doc => {
        const updDoc = {...doc};
        updDoc.date = new Date(updDoc.date);
        return updDoc;
      }).sort(function(a, b) {
        return b.date - a.date;
      }).filter( (d,i) => i < limit);
      console.log(meetings);
      return { meetings };
    }
    return {error: { statusCode: 404 } };
  }catch(err){
    return { error: JSON.stringify(err.message)};
  }
}
global.main = main;