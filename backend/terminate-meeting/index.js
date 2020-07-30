const fetch = require('node-fetch').default;
const base64 = require('base-64');
const username = process.env["CLOUDANT_USER_NAME"];
const password = process.env["CLOUDANT_PASSWORD"];
const publicAPI = process.env["PUBLIC_API"];

async function terminateMeeting(meetings){
  const now = new Date();
  const results = await meetings.map( async meeting => {
    if(meeting.expiresAt < now){  
      try{
        const updMeeting = { ...meeting };
        updMeeting.active = false;
        const { _id } = updMeeting;
        const promise = await fetch(`${publicAPI}/${_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Basic " + base64.encode(username + ":" + password) 
          },
          body: JSON.stringify(updMeeting)
        });
        resolve = await promise.json();
        return resolve;
      } catch (err){
        return  { error: err.message};
      }
    }
  });
}
async function main(params){
  try{  
    const selector = { selector : { "active" : true,"expiresAt": {"$ne": null } },};
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
        updDoc.expiresAt = new Date(updDoc.expiresAt);
        return updDoc;
      });
      await terminateMeeting(meetings);
      return {payload: 'termined meetings that started yesterday.'};
    }
    return {error: { statusCode: 404 } };
  }catch(err){
    return { error: JSON.stringify(err.message)};
  }
}
global.main = main;