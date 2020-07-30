# Get History

This end point returns the list of meetings.

## Request

| End Point | **/getHistory**                   |
| --------- | --------------------------------- |
| Method    | GET                               |
| Params    | limit _number_                    |
| Headers:  | Content-Type:application/json     |
|           | Authorization:Bearer _<token_id>_ |

## Response

Example:

```json
{
  "meetings": [
    {
      "createdAt": "2222-07-28T23:47:26.541Z",
      "level": "MEDIUM",
      "meetingId": "762866"
    },
    {
      "createdAt": "2020-09-28T23:47:22.349Z",
      "level": "MEDIUM",
      "meetingId": "354128"
    },
    {
      "createdAt": "2020-07-28T23:47:28.592Z",
      "level": "MEDIUM",
      "meetingId": "414778"
    }
  ]
}
```
