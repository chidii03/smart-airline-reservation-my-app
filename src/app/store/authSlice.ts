import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '@/app/lib/api';
import { User, LoginData, RegisterData } from '@/app/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Types for API responses
interface AuthResponse {
  user: User;
  token: string;
}

// Async thunks
export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginData,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiClient.login(credentials);
    return {
      user: {
        id: response.data.userId,
        email: credentials.email,
        firstName: '', // Placeholder, update if API provides
        lastName: '', // Placeholder, update if API provides
      },
      token: response.data.token,
    } as AuthResponse;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || 'Login failed');
  }
});

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterData,
  { rejectValue: string }
>('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await apiClient.register(userData);
    return {
      user: {
        id: response.data.userId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
      token: response.data.token,
    } as AuthResponse;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || 'Registration failed');
  }
});

export const logoutUser = createAsyncThunk<
  null,
  void,
  { rejectValue: string }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await apiClient.logout();
    return null;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || 'Logout failed');
  }
});

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/currentUser', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.getCurrentUser();
    return response.data as User;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message || 'Failed to fetch user');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      // Current user
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || 'Failed to fetch user';
      });
  },
});

export const { clearError, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;