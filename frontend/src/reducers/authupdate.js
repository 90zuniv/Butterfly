import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@utils/axiosInstance";

// 회원 회원정보 조회, 정보수정, 프로필수정

const initialState = {
  user :{
    Id: "",
    password: "",
    level: "",
    email: "",
  }
};

const token = `${localStorage.getItem("access-token")}`;
// const baseURL = `http://localhost:8000/member-service`;
const baseURL = `${process.env.BACKEND_URL}/user`;
// 회원정보 조회
export const authMember = createAsyncThunk(
  "memberUpdateSlice/getMember",
  async () => {
    const url = `${baseURL}/users`;
    const response = await axios({
      headers: { Authorization: `Bearer ${token}` },
      method: "GET",
      url: url,
    });
    return response.data;
  }
);


const authSlice = createSlice({
  name: "autgUpdate",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 회원정보 가져오기
    builder.addCase(authMember.pending, (state, action) => {
      state.loading = true;
      console.log("정보가져오는중", state.result);
    });
    builder.addCase(authMember.fulfilled, (state, action) => {
      state.memberId = action.payload.member.memberId;
      state.email = action.payload.member.email;
      // console.log(state);
      console.log("회원정보get성공", action.payload.member);
      state.loading = false;
    });
    builder.addCase(authMember.rejected, (state, action) => {
      console.log("회원정보get실패", action.error);
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
