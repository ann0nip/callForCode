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
  "createdAt": "2020-07-28T20:03:37.634Z",
  "createdBy": "adrianchavez065@gmail.com",
  "meetingId": "583085"
}
```
