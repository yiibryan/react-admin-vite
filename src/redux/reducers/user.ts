import { firstValueFrom } from 'rxjs';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getSearchQuota } from '@/api';

import { RootState } from '@/redux/store.ts';

// Define a type for the slice state
interface UserState {
  currentUser: any;
  fetchingSearchQuota: boolean;
  searchQuota:
    | {
        used: number;
        total: number;
      }
    | undefined;
}

// Define the initial state using that type
const initialState: UserState = {
  currentUser: undefined,
  fetchingSearchQuota: false,
  searchQuota: undefined,
};

// define fetch search quota thunk
export const fetchSearchQuota = createAsyncThunk<{
  used: number;
  total: number;
}>(
  'User/fetchSearchQuota',
  async (_, { rejectWithValue }) => {
    try {
      const data = await firstValueFrom(getSearchQuota());
      return data;
    } catch {
      return rejectWithValue([]);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return !state.user.fetchingSearchQuota;
    },
  }
);

export const userSlice = createSlice({
  name: 'User',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<{ user: any }>) {
      state.currentUser = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchQuota.pending, (state) => {
      state.fetchingSearchQuota = true;
    });
    builder.addCase(fetchSearchQuota.fulfilled, (state, action) => {
      state.fetchingSearchQuota = false;
      state.searchQuota = action.payload;
    });
    builder.addCase(fetchSearchQuota.rejected, (state) => {
      state.fetchingSearchQuota = false;
    });
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
