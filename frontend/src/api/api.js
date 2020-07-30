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
