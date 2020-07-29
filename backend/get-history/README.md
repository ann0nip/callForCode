/getHistory endpoint

Content-Type: application/json
Authorization: Bearer <token_id>
HTTP Method: GET

paremeters opcional:
/getHistory?limit=<number>

Example respose:
{
"meetings": [
{
"date": "2222-07-28T23:47:26.541Z",
"level": "MEDIUM",
"meetingId": "762866"
},
{
"date": "2020-09-28T23:47:22.349Z",
"level": "MEDIUM",
"meetingId": "354128"
},
{
"date": "2020-07-28T23:47:28.592Z",
"level": "MEDIUM",
"meetingId": "414778"
}
]
}
