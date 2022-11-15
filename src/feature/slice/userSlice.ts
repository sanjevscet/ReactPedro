import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IValue {
  username: string;
}

interface InitialState {
  value: IValue;
}

const initialState: InitialState = {
  value: {
    username: 'Sanjeev',
  },
};

// const initialState = { value: { username: 'Sanjeev' } };

const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: {
      reducer(
        state: InitialState,
        acion: PayloadAction<IValue, string, { name?: string }>
      ) {
        state.value.username = acion.meta?.name
          ? acion.meta?.name
          : acion.payload.username;
      },
      prepare(payload: IValue, name?: string) {
        const ucName = payload.username.toUpperCase();
        return { payload, meta: { name: ucName } };
      },
    },

    logout: (state: InitialState) => {
      state.value = initialState.value;
    },
  },
});

export const { login, logout } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
