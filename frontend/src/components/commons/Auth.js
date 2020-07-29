// TODO: This clould be a Hooks

export const checkAuth = () => {
  const token = localStorage.getItem("tokenId") ? true : false;
  return token;
};

export const setAuth = (token) => {
  localStorage.setItem("tokenId", token);
  // localStorage.setItem("username", user);
};
