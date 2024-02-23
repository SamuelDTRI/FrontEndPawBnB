const TOKEN_KEY = "miAppToken";

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const setAuthToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const removeAuthToken = () => localStorage.removeItem(TOKEN_KEY);

export const isAuthenticated = () => {
  return !!getAuthToken();
};
