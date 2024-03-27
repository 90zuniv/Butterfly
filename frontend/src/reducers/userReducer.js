// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios'; // 필요에 따라 경로 조정

// const initialState = {
//   user: {
//     id: null,
//     email: '',
//     level: '',
//   },
//   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

// // 로그인 요청 AsyncThunk
// export const login = createAsyncThunk(
//   'auth/login',
//   async (loginData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`http://localhost:8000/auth/login`, loginData);
//       // 성공 시 반환된 사용자 정보를 사용
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = { id: null, email: '', level: '' };
//       state.status = 'idle';
//       state.error = null;
//       // 로그아웃 시 필요한 처리, 예를 들어 localStorage 클리어 등
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload; // 전체 사용자 정보를 저장
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userInfo: {
          id: null,
          email: '',
          level: '',
        }, // 사용자 정보를 저장할 상태 추가
  },
  reducers: {
    // setLoggedIn: (state, action) => {
      // state.isLoggedIn = action.payload;
    // },
    setUserInfo: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload; // 사용자 정보 업데이트      
    },
    logout: (state) => { // 로그아웃 처리를 위한 reducer 추가
      state.isLoggedIn = false;
      state.userInfo = {
        id: null,
        email: '',
        level: '',
      }
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export const { setLoggedIn } = userSlice.actions;
export const { logout } = userSlice.actions;

export default userSlice.reducer;
