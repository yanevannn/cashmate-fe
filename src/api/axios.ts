import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// ========================================
// TYPES
// ========================================
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

interface RefreshTokenResponse {
  data: {
    access_token: string;
    refresh_token?: string;
  };
}

// ========================================
// TOKEN MANAGER
// ========================================
class TokenManager {
  private isRefreshing = false;
  private failedQueue: QueueItem[] = [];

  private processQueue(
    error: Error | null = null,
    token: string | null = null
  ): void {
    this.failedQueue.forEach((item) => {
      if (error) {
        item.reject(error);
      } else if (token) {
        item.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await axios.post<RefreshTokenResponse>(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        { refresh_token: refreshToken }
      );

      const newAccessToken = response.data.data.access_token;
      localStorage.setItem("access_token", newAccessToken);

      if (response.data.data.refresh_token) {
        localStorage.setItem("refresh_token", response.data.data.refresh_token);
      }

      return newAccessToken;
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
      throw error;
    }
  }

  async handleTokenRefresh(): Promise<string> {
    if (this.isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;

    try {
      const newToken = await this.refreshToken();
      this.processQueue(null, newToken);
      return newToken;
    } catch (error) {
      const err =
        error instanceof Error ? error : new Error("Token refresh failed");
      this.processQueue(err, null);
      throw err;
    } finally {
      this.isRefreshing = false;
    }
  }
}

// ========================================
// API CLIENT SETUP
// ========================================
const tokenManager = new TokenManager();

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await tokenManager.handleTokenRefresh();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ========================================
// PUBLIC CLIENT
// ========================================
const apiPublicClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiClient, apiPublicClient };
