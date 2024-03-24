// src/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null, // 사용자 정보를 저장할 상태 추가
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      state.user = action.payload.user; // 사용자 정보 업데이트
    },
    logout: (state) => { // 로그아웃 처리를 위한 reducer 추가
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;
export const { logout } = authSlice.actions;

export default authSlice.reducer;
