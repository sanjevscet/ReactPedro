import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';

import axios from 'axios';

interface InitialState {
  username: string;
  users?: IUser[];
  loading?: boolean;
}

const initialState: InitialState = {
  username: 'Sanjeev',
  loading: false,
  users: [],
};

interface IUser {
  id: number;
  name: string;
}

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  // Declare the type your function argument here:
  async (userId: number) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    // Inferred return type: Promise<MyData>
    return [data] as IUser[];
  }
);

// const initialState = { value: { username: 'Sanjeev' } };

const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: {
      reducer(
        state: InitialState,
        acion: PayloadAction<InitialState, string, { name?: string }>
      ) {
        state.username = acion.meta?.name
          ? acion.meta?.name
          : acion.payload.username;
      },
      prepare(payload: InitialState, name?: string) {
        const ucName = payload.username.toUpperCase();
        return { payload, meta: { name: ucName } };
      },
    },

    logout: (state: InitialState) => {
      state.username = initialState.username;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
      state.users = [];
    });

    builder.addCase(fetchUserById.fulfilled, (state, payload) => {
      state.loading = false;
      state.users = payload.payload;
    });
  },
});

export const { login, logout } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
