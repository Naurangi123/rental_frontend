/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { authAPI, userAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth on app load
  useEffect(() => {
    const init = async () => {
      try {
        // Only try to fetch profile if token exists
        const token = sessionStorage.getItem('access');
        if (!token) {
          setLoading(false);
          return;
        }

        const { data } = await userAPI.getProfile();
        setUser(data.results?.[0] || data);
      } catch (error) {
        // Clear invalid token
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (credentials) => {
    const { data } = await authAPI.login(credentials);
    // Store tokens in sessionStorage
    sessionStorage.setItem('access', data.access);
    if (data.refresh) {
      sessionStorage.setItem('refresh', data.refresh);
    }
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.removeItem('access');
      sessionStorage.removeItem('refresh');
      setUser(null);
    }
  };

  const register = async (userData) => {
    const { data } = await authAPI.register(userData);
    return data;
  };

  const verifyEmail = async (otp) => {
    const { data } = await authAPI.verifyEmail(otp);
    return data;
  };

  /**
   * Get current user profile
   */
  const getProfile = async () => {
    const { data } = await userAPI.getProfile();
    const userData = data.results?.[0] || data;
    setUser(userData);
    return userData;
  };

  /**
   * Update user profile
   */
  // const updateProfile = async (profileData) => {
  //   const { data } = await userAPI.updateProfile(profileData);
  //   const userData = data.results?.[0] || data;
  //   setUser(userData);
  //   return userData;
  // };

  const updateProfile = async (profileData) => {
    const { data } = await userAPI.updateProfile(profileData);
    setUser(data.user); // your response shape
    return data.user;
  };


  /**
   * Upload user avatar
   */
  const uploadAvatar = async (formData) => {
    const { data } = await userAPI.uploadAvatar(formData);
    const userData = data.results?.[0] || data;
    setUser(userData);
    return userData;
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      register,
      verifyEmail,
      getProfile,
      updateProfile,
      uploadAvatar,
      isAuthenticated: !!user,
      role: user?.role,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
