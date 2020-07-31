# Call for code challenge (backend directory)

The code is dividen in several folders, the backend is using _IBM Cloud functions_ so they are independent and they are not sharing any context. Inside any folders you will find a _function action_, they need _webpack_ to package Nodejs dependecies in a single file inside /dist directory.

## API end points

**Public endpoint** : [https://efd5c485.us-south.apigw.appdomain.cloud/api/v1/]

| End Point      | Method |
| -------------- | ------ |
| /createMeeting | POST   |
| /joinMeeting   | POST   |
| /getHistory    | GET    |
| /createUser    | POST   |
| /getUser       | GET    |
| /sendAlert     | POST   |
| /generateQR    | GET    |
