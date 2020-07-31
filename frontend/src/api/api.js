import { getToken } from "../components/commons/Auth";

const BASE_URL = "https://efd5c485.us-south.apigw.appdomain.cloud/api/v1";

export const createMeeting = () => {
  const token = getToken();
  return fetch(`${BASE_URL}/createMeeting`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHistory = () => {
  const token = getToken();
  return fetch(`${BASE_URL}/getHistory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const joinMeet = (meetingId) => {
  const token = getToken();
  return fetch(`${BASE_URL}/joinMeeting`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      meetingId: meetingId,
    }),
  });
};

export const sendAlert = (data) => {
  const token = getToken();
  return fetch(`${BASE_URL}/sendAlert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const getUser = () => {
  const token = getToken();
  return fetch(`${BASE_URL}/getUser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
