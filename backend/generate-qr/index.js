const QRCode = require('qrcode');

function main(params){ 
const{meetingId} = params;
return QRCode.toDataURL(meetingId,{width:500,errorCorrectionLevel:'Q'})
  .then(data => {
return {data};
  })
  .catch(err => {
    console.error(err)
return { "error": "something went wrong"}
  })
};

global.main = main;
