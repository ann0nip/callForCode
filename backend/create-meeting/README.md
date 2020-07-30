# Create Meeting

This end point creates a meeting where participants can join.

## Request

| End Point | **/createMeeting**                |
| --------- | --------------------------------- |
| Method    | POST                              |
| Headers:  | Content-Type:application/json     |
|           | Authorization:Bearer _<token_id>_ |
| Body:     | `{"level":"LOW"}`                 |

## Response

Example:

```json
{
  "createdAt": "2020-07-30T00:26:36.396Z",
  "createdBy": "adrian chavez",
  "email": "adrianchavez065@gmail.com",
  "meetingId": "238447"
}
```
