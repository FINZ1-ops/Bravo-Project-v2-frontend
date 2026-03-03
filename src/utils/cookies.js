import Cookies from 'js-cookie';

const TOKEN_KEY = 'bravo_token';
const USER_KEY  = 'bravo_user';

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: 'Strict' });
};
export const getToken = () => Cookies.get(TOKEN_KEY) || null;
export const removeToken = () => { Cookies.remove(TOKEN_KEY); Cookies.remove(USER_KEY); };
export const setUser = (user) => {
  Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7, sameSite: 'Strict' });
};
export const getUser = () => {
  const raw = Cookies.get(USER_KEY);
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
};
export const isLoggedIn = () => !!getToken();
