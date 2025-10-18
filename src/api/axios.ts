import axios from "axios";

// Konfigurasi API client
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// State untuk refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

/**
 * Proses antrian request yang gagal setelah token di-refresh
 */
const processQueue = (error: any = null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });

  failedQueue = [];
};

/**
 * Fungsi untuk refresh token
 */
const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      { refresh_token: refreshToken }
    );

    const newAccessToken = response.data.access_token;
    localStorage.setItem("access_token", newAccessToken);

    // Update refresh token jika ada
    if (response.data.refresh_token) {
      localStorage.setItem("refresh_token", response.data.refresh_token);
    }

    return newAccessToken;
  } catch (error) {
    // Hapus token dan redirect ke login
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
    throw error;
  }
};

// ========================================
// REQUEST INTERCEPTOR
// ========================================
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========================================
// RESPONSE INTERCEPTOR
// ========================================
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Cek apakah error 401 dan belum di-retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Jika sedang refresh, tambahkan ke queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Tandai bahwa request ini sudah di-retry
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token
        const newToken = await refreshAccessToken();

        // Proses semua request yang pending
        processQueue(null, newToken);

        // Retry original request dengan token baru
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Jika refresh gagal, reject semua pending requests
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Untuk error selain 401, langsung reject
    return Promise.reject(error);
  }
);

export default apiClient;
