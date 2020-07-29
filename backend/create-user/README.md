# Create User

This end point creates a user

## Request

| End Point | **/createUser**                   |
| --------- | --------------------------------- |
| Method    | POST                              |
| Headers:  | Content-Type:application/json     |
|           | Authorization:Bearer _<token_id>_ |

Body:

```json
{
  "city": "Irapuato",
  "country": "Mexico",
  "covid19": false,
  "email": "testuser@gmail.com",
  "health": "GOOD",
  "state": "Guanajuato",
  "symptoms": [],
  "testedPositive": []
}
```

## Response

Example:

```json
{
  "user": {
    "city": "Irapuato",
    "country": "Mexico",
    "covid19": false,
    "createdAt": "2020-07-29T22:17:00.505Z",
    "email": "testuser@gmail.com",
    "health": "GOOD",
    "state": "Guanajuato",
    "symptoms": [],
    "testedPositive": [],
    "type": "user"
  }
}
```
