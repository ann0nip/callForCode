/joinMeeting endPoint

Request
Content-Type : application/json
Authorization: Bearer <token>
HTTP Method: POST
Data:
{ "meetingId": <meeting_id>}

Response
application/json
{
  "joined": boolean,
  "meetingId": <meeting_id>
}
