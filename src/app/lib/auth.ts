import { jwtDecode } from 'jwt-decode';
import { User } from '@/app/types/user';

export interface AuthToken {
  token: string;
  expiresAt: number;
}

export interface LoginResponse {
  token: string;
  userId: string;
  user: User;
  expiresIn: number;
}

// JWT payload type
interface JWTPayload {
  sub: string;
  exp: number;
  iat: number;
  [key: string]: unknown;
}

class AuthService {
  private readonly TOKEN_KEY = 'auth-token';
  private readonly USER_KEY = 'user-data';

  setAuthData(response: LoginResponse): void {
    const expiresAt = Date.now() + response.expiresIn * 1000;
    const authToken: AuthToken = {
      token: response.token,
      expiresAt,
    };
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(authToken));
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    try {
      const userStr = localStorage.getItem(this.USER_KEY);
      const user = userStr ? JSON.parse(userStr) : null;
      if (!user) return null;

      // Ensure required fields are present
      return {
        ...user,
        status: user.status || 'active',
        emailVerified: user.emailVerified ?? false,
        phoneVerified: user.phoneVerified ?? false,
      };
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      const tokenStr = localStorage.getItem(this.TOKEN_KEY);
      if (!tokenStr) return null;

      const authToken: AuthToken = JSON.parse(tokenStr);
      if (Date.now() >= authToken.expiresAt) {
        this.clearAuthData();
        return null;
      }

      return authToken.token;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: JWTPayload = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  async refreshToken(): Promise<string | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      if (!this.isTokenExpired(token)) {
        return token;
      }
      return null;
    } catch {
      return null;
    }
  }

  getTokenExpiration(): Date | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: JWTPayload = jwtDecode(token);
      return new Date(decoded.exp * 1000);
    } catch {
      return null;
    }
  }

  getTimeUntilExpiration(): number {
    const expiration = this.getTokenExpiration();
    if (!expiration) return 0;
    const now = new Date();
    const diff = expiration.getTime() - now.getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60)));
  }

  isValidToken(token: string): boolean {
    try {
      const decoded: JWTPayload = jwtDecode(token);
      return !!decoded.exp && !!decoded.iat && !!decoded.sub;
    } catch {
      return false;
    }
  }

  getUserPermissions(): string[] {
    const user = this.getCurrentUser();
    if (!user) return [];
    const basePermissions = ['view_flights', 'book_flights', 'view_bookings'];
    if (user.role === 'admin') {
      return [...basePermissions, 'manage_flights', 'manage_users', 'view_reports'];
    }
    if (user.role === 'agent') {
      return [...basePermissions, 'manage_bookings'];
    }
    return basePermissions;
  }

  hasPermission(permission: string): boolean {
    const permissions = this.getUserPermissions();
    return permissions.includes(permission);
  }
}

export const authService = new AuthService();