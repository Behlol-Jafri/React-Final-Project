import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await fetch('http://localhost:1214/user');
  return await response.json();
});

export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
  const response = await fetch('http://localhost:1214/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const result = await response.json();
  console.log("Login response:", result);
  if (result.user) {
    localStorage.setItem("Token", result?.token);
    localStorage.setItem("User", JSON.stringify(result.user))
  } else {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
  }
  return result;
});

export const logout = createAsyncThunk("logoutUser", async () => {
  localStorage.removeItem("Token");
  localStorage.removeItem("User")
  return null;
})

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    currentUser: localStorage.getItem("User")
      ? JSON.parse(localStorage.getItem("User"))
      : null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.currentUser = null;
      })

  },
});

export default loginSlice.reducer;