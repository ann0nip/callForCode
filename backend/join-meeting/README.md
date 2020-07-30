# Join Meeting

This end point joins a person to a meeting.

## Request

| End Point | **/joinMeeting**                  |
| --------- | --------------------------------- |
| Method    | POST                              |
| Headers:  | Content-Type:application/json     |
|           | Authorization:Bearer _<token_id>_ |
| Body:     | `{"meetingId":"<meeting_id>"}`    |

## Response

Example:

```json
{
  "createdAt": "2020-07-30T13:34:52.050Z",
  "createdBy": "adrian chavez",
  "joined": true,
  "meetingId": "814821"
}
```
