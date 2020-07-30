const fetch = require('node-fetch').default;
const base64 = require('base-64');
const jwt_decode = require('jwt-decode');

async function main(params){
  const token = params.__ow_headers.authorization;
  var auth = jwt_decode(token);
  let { email, name } = auth;
  const { CLOUDANT_USER_NAME:username, CLOUDANT_PASSWORD:password , PUBLIC_API:publicAPI} = params;
  let { level } = params;
  const levels = ["HIGH","MEDIUM","LOW"];
  if(!level || ! levels.includes(level)){
    level = "MEDIUM";
  }
  try{
    const now = new Date().toISOString();
    let tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    tomorrow = tomorrow.toISOString();
    let meetingId = "";
    for(let i = 0; i < 6; i++){
      meetingId += Math.floor(Math.random() * 10).toString();
    }
    
    const promise = await fetch(`${publicAPI}/`,
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Basic "+ base64.encode(username + ":" + password) 
      },
      body: JSON.stringify({meetingId, level, integrants:[email],
        createdAt:now, active:true, expiresAt:tomorrow, createdBy:name})
    });
    const resolve = await promise.json();
    return { meetingId, email, createdBy: name, createdAt:now};
  }catch(err){
    return { error: JSON.stringify(err.message)};
  }
}

global.main = main;