# Send Alert

This end point updates the user that informed that got covid19, this action is part of a sequence trigger _IBM function_.

## Request

| End Point | **/sendAlert**                    |
| --------- | --------------------------------- |
| Method    | POST                              |
| Headers:  | Content-Type:application/json     |
|           | Authorization:Bearer _<token_id>_ |

Body:

```json
{
  "message": "Be careful someone that met one of your meetings got sick",
  "email": "hola@mx1.ibm.com",
  "covid19": true,
  "health": "STABLE",
  "symptoms": ["fever", "cough"],
  "testedPositive": [
    { "kind": "Test A", "testedAt": "2020-07-30T00:26:36.396Z" }
  ]
}
```

## Response

Example:

```json
{
  "user": {
    "city": null,
    "country": null,
    "covid19": true,
    "createdAt": "2020-07-30T14:19:15.102Z",
    "email": "hola@mx1.ibm.com",
    "health": "GOOD",
    "state": null,
    "symptoms": ["fever", "cough"],
    "testedPositive": [
      {
        "kind": "Test A",
        "testedAt": "2020-07-30T00:26:36.396Z"
      }
    ],
    "type": "user"
  }
}
```
