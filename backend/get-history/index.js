const fetch = require('node-fetch').default;
const base64 = require('base-64');
const jwt_decode = require('jwt-decode');

async function main(params){
  const token = params.__ow_headers.authorization;
  var auth = jwt_decode(token);
  let { email } = auth;
  let { limit } = params;
  const { CLOUDANT_USER_NAME:username, CLOUDANT_PASSWORD:password , PUBLIC_API:publicAPI} = params;
  if(!limit){
    limit = 5;
  }
  try{  
    const selector = { selector : { "integrants": { "$in": [email ]},"createdAt": {"$ne": null } },"fields": [
      "level",
      "createdAt",
      "createdBy",
      "meetingId",
      "integrants"
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
        updDoc.createdAt = new Date(updDoc.createdAt);
        updDoc.totalMembers = updDoc.integrants.length;
        const { meetingId, level, createdAt, totalMembers, createdBy} = updDoc;
        return { meetingId, level, totalMembers, createdAt, createdBy };
      }).sort(function(a, b) {
        return b.createdAt - a.createdAt;
      }).filter( (d,i) => i < limit);
      return { meetings };
    }
    return {error: { statusCode: 404 } };
  }catch(err){
    return { error: JSON.stringify(err.message)};
  }
}
global.main = main;