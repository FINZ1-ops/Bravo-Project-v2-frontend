import { useState } from 'react';
import { getToken, getUser, setToken, setUser, removeToken } from '../utils/cookies';
import { login as apiLogin, logout as apiLogout } from '../api/auth';

export const useAuth = () => {
  const [user, setUserState] = useState(getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true); setError(null);
    try {
      const res = await apiLogin({ email, password });
      const { token, ...userData } = res.data.data;
      setToken(token);
      setUser(userData);
      setUserState(userData);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try { await apiLogout(); } catch {}
    removeToken();
    setUserState(null);
    window.location.href = '/admin/login';
  };

  const isAdmin = () => getUser()?.role === 'admin';
  const isCrew  = () => getUser()?.role === 'crew';

  return { user, loading, error, login, logout, isAdmin, isCrew, isLoggedIn: !!getToken() };
};