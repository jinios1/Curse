import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  username: string | null;
  role: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  username: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; username: string; role: string }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.username = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;