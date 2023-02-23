import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";
import { json } from "react-router-dom";
import { UsersData } from "../FakeData";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: UsersData },
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },

    deleteUser: (state, action) => {
      state.value = state.value.filter(
        (user) => user.id !== action?.payload?.id
      );
    },

    updateUsername: (state, action) => {
      let temp = [...state.value];
      let f = state.value.splice(action.payload, 1);
      const newTemp = temp.filter((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }
      });
      alert(newTemp.length);
      if (newTemp.length === 0) {
        return;
      }
      state.value = [];
      state.value = newTemp;
    },
  },
});

export const { addUser, deleteUser, updateUsername } = userSlice.actions;
export default userSlice.reducer;
