import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  favoritedCars: JSON.parse(localStorage.getItem("favoritedCars")) || [],
  profileCompletion: 0, // <-- added
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setFavoritedCars: (state, action) => {
      state.favoritedCars = action.payload;
      localStorage.setItem("favoritedCars", JSON.stringify(action.payload));
    },
    setProfilecompletion: (state, action) => {
      state.profileCompletion = action.payload;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.jwt;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.jwt);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setFavoritedCars,
  setProfilecompletion,
} = authSlice.actions;

export default authSlice.reducer;
