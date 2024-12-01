import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  email: '',
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      return { ...state, ...payload }
    },
    clearAuth: () => {
      return initialState
    },
  }
})

export const { setAuth, clearAuth } = AuthSlice.actions
export default AuthSlice.reducer
