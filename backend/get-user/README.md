# Get User

This end point returns user's profile;

## Request

| End Point | **/getUser**                      |
| --------- | --------------------------------- |
| Method    | GET                               |
| Params    | email _string_                    |
| Headers:  | Content-Type:application/json     |
|           | Authorization:Bearer _<token_id>_ |

## Response

Example:

```json
{
  "user": {
    "city": "Guadalajara",
    "country": "Mexico",
    "covid19": false,
    "email": "adrianchavez065@gmail.com",
    "health": "GOOD",
    "state": "Jalisco",
    "symptoms": [],
    "testedPositive": [
      {
        "date": "",
        "type": ""
      }
    ],
    "type": "user",
    "createdAt": "2020-07-28T23:47:24.492Z"
  }
}
```
