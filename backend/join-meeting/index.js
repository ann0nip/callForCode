const fetch = require('node-fetch').default;
const base64 = require('base-64');
const jwt_decode = require('jwt-decode');
let username = null;
let password = null;
let publicAPI = null;

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
  let newIntegrants = [...integrants];
  if(! integrants.find(integrant => integrant == email)){
    newIntegrants.push(email);
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
    return true;
  } catch (err){
    return  err.message;
  }
}

async function main(params){
  const token = params.__ow_headers.authorization;
  username =  params.CLOUDANT_USER_NAME;
  password = params.CLOUDANT_PASSWORD;
  publicAPI = params.PUBLIC_API;

 var auth = jwt_decode(token);
  let { email } = auth;
  let { meetingId } = params;
  try{
    const selector = { selector : { "meetingId": meetingId.toString()}};
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
    let createdAt = "";
    let createdBy = "";
    if(docs){
      const doc = docs[0];
      if(!isMeetingActive) return {error: { statusCode: 409}};
      createdAt = doc.createdAt;
      createdBy = doc.createdBy;
      const updated = await joinMeeting(doc, email );
      return { meetingId, joined : true, createdAt, createdBy };
    }
  }catch(err){
    return { error: JSON.stringify(err.message)};
  }
}
global.main = main;