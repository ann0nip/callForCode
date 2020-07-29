const fetch = require('node-fetch').default;
const base64 = require('base-64');
const jwt_decode = require('jwt-decode');
const username = process.env["CLOUDANT_USER_NAME"];
const password = process.env["CLOUDANT_PASSWORD"];
const publicAPI = process.env["PUBLIC_API"];

function isMeetingActive(doc){
  if(!doc.active){
    return false;
  }
  const expire = new Date(doc.expiresAt);
  const now = new Date();
  if(expire < now){
    return false;
  }
}

async function joinMeeting(doc,email){
  const{_id,integrants} = doc;
  let newIntegrants = null;
  if(! integrants.find(integrant => integrant === email)){
    newIntegrants = [...integrants,email];
  } else {
    newIntegrants = [...integrants];
  }
  try{
    const newDoc = {...doc,integrants:newIntegrants};
    const promise = await fetch(`${publicAPI}/${_id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + base64.encode(username + ":" + password) 
      },
      body: JSON.stringify(newDoc)
    });
    resolve = await promise.json();
    return resolve;
  } catch (err){
    return  { error: err.message};
  }
}

async function main(params){
  const token = params.__ow_headers.authorization;
  var auth = jwt_decode(token);
  let { email } = auth;
  let { meetingId } = params;
  try{
    const selector = { selector : { "meetingId": meetingId ,"active":true},"fields": [
      "_id",
      "_rev",
      "level",
      "integrants",
      "date",
      "active",
      "expiresAt",
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
      await docs.forEach( async doc => {
        if(!isMeetingActive) return {error: { statusCold: 409}};
        const updated = await joinMeeting(doc, email );
      });
      return { meetingId, joined : true};
    }
  }catch(err){
    return { error: JSON.stringify(err.message)};
  }
}

main();
global.main = main