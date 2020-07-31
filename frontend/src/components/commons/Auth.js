// TODO: This clould be a Hooks

export const checkAuth = () => {
  const token = localStorage.getItem("tokenId") ? true : false;
  return token;
};

export const setAuth = (token, username) => {
  localStorage.setItem("tokenId", token);
  localStorage.setItem("username", username);
};

export const getToken = () => {
  return localStorage.getItem("tokenId");
};
