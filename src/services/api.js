import axios from 'axios';
import Cookies from "js-cookie";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // for HttpOnly refresh cookie
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken"),
  },
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    // Skip auth header for auth endpoints
    if (
      config.url?.includes('/login') ||
      config.url?.includes('/signup') ||
      config.url?.includes('/refresh') ||
      config.url?.includes('/verify-email') ||
      config.url?.includes('/send-otp')
    ) {
      return config;
    }

    const accessToken = sessionStorage.getItem('access');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token);
  });
  failedQueue = [];
};

const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem('refresh');
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const { data } = await api.post('/refresh/', {
      refresh: refreshToken,
    });

    sessionStorage.setItem('access', data.access);
    return data.access;
  } catch (error) {
    logout();
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/refresh')
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue request while token is being refreshed
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const token = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        processQueue(null, token);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/* =========================
   LOGOUT HANDLER
========================= */
function logout() {
  sessionStorage.removeItem('access');
  sessionStorage.removeItem('refresh');
  window.location.replace('/login');
}

const apiClient = api;

// Auth API Calls
export const authAPI = {
  login: (credentials) =>
    apiClient.post('/login/', credentials),

  register: (userData) =>
    apiClient.post('/signup/', userData),

  logout: () =>
    apiClient.post('/logout/'),

  verifyEmail: (otp) =>
    apiClient.post('/verify-email/', { otp }),

  sendOtp: (email) =>
    apiClient.post('/send-otp/', { email }),

  refreshToken: () =>
    apiClient.post('/refresh/'),
};

// User API Calls
export const userAPI = {
  getProfile: () =>
    apiClient.get('/users/me/'),

  updateProfile: (data) =>
    apiClient.patch(`/users/me/`, data),

  getReviews: () =>
    apiClient.get('/reviews/'),

  uploadAvatar: (formData) =>
    apiClient.patch(`/users/update_profile_picture/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Rental API Calls
export const rentalAPI = {
  getAllRentals: (filters) =>
    apiClient.get('/rentals/', { params: filters }),

  getRentalById: (id) =>
    apiClient.get(`/rentals/${id}/`),

  createRental: (rentalData) =>
    apiClient.post('/rentals/', rentalData),

  updateRental: (id, rentalData) =>
    apiClient.put(`/rentals/${id}/`, rentalData),

  deleteRental: (id) =>
    apiClient.delete(`/rentals/${id}/`),

  searchRentals: (query) =>
    apiClient.get('/rentals/search/', { params: { q: query } }),

  getRentalHistory: () =>
    apiClient.get('/users/rental-history/'),
};

// Renter API Calls
export const renterAPI = {
  getAllRenters: (filters) =>
    apiClient.get('/renters/', { params: filters }),

  getRenterById: (id) =>
    apiClient.get(`/renters/${id}/`),

  getRenterReviews: (id) =>
    apiClient.get(`/renters/${id}/reviews/`),

  searchRenters: (query) =>
    apiClient.get('/renters/search/', { params: { q: query } }),
};

// Review & Rating API Calls
export const reviewAPI = {
  submitReview: (rentalId, reviewData) =>
    apiClient.post(`/rentals/${rentalId}/reviews/`, reviewData),

  getRentalReviews: (rentalId) =>
    apiClient.get(`/rentals/${rentalId}/reviews/`),

  updateReview: (reviewId, reviewData) =>
    apiClient.put(`/reviews/${reviewId}/`, reviewData),

  deleteReview: (reviewId) =>
    apiClient.delete(`/reviews/${reviewId}/`),
};

// Abuse Report API Calls
export const abuseAPI = {
  submitReport: (reportData) =>
    apiClient.post('/reports/abuse/', reportData),

  getUserReports: () =>
    apiClient.get('/reports/my-reports/'),

  getReportStatus: (reportId) =>
    apiClient.get(`/reports/${reportId}/`),
};

// Messaging API Calls
export const messageAPI = {
  getConversations: () =>
    apiClient.get('/messages/conversations/'),

  getMessages: (conversationId) =>
    apiClient.get(`/messages/conversations/${conversationId}/`),

  sendMessage: (conversationId, content) =>
    apiClient.post(`/messages/conversations/${conversationId}/messages/`, {
      content,
    }),
};

// Analytics API Calls
export const analyticsAPI = {
  trackPageView: (page) =>
    apiClient.post('/analytics/pageview/', { page }),

  trackEvent: (eventName, eventData) =>
    apiClient.post('/analytics/event/', { name: eventName, data: eventData }),
};

export default apiClient;
