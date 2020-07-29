# Join Meeting

This end point join a person to a meeting.

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
  "joined": "true|false",
  "meetingId": "<meeting_id>"
}
```
