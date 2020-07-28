const fetch = require('node-fetch').default;
const base64 = require('base-64');
const jwt_decode = require('jwt-decode');

async function main(params){
  const token = params.__ow_headers.authorization;
  var auth = jwt_decode(token);
  let {email} = auth;
  
  try{
    //they will move to env variable later
    const username ="3d9a0c41-f0d9-46ae-88d9-6c4767000652-bluemix";
    const password = "be41c23c0cd254ee6b786e0dcedf4bd77d7084d332f25289c36341ea2e1c213a";
    const now = new Date().toISOString();
    let tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    tomorrow = tomorrow.toISOString();
    let meetingId = "";
    for(let i = 0; i < 6; i++){
      meetingId += Math.floor(Math.random() * 10).toString();
    }
    
    const a = await fetch("https://3d9a0c41-f0d9-46ae-88d9-6c4767000652-bluemix.cloudant.com/call/",
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Basic "+ base64.encode(username + ":" + password) 
      },
      body: JSON.stringify({meetingId,integrants:[...email],date:now,active:true,expiresAt:tomorrow})
    });
    const b = await a.json();
    return { meetingId, createdBy: email, createdAt:now};
  }catch(err){
    console.log(err.message);
    return { error: JSON.stringify(err.message)};
  }
}

global.main = main