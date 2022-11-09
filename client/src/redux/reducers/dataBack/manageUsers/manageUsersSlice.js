import { createSlice } from "@reduxjs/toolkit";

export const manageUsersSlice = createSlice({
    name: 'manageUsers',

    initialState: {
        users: [],
        details: [],
        msg: ''
    },

    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload
        },

        getUserByName: (state, action) => {
            state.users = action.payload;
        },

        getUserById: (state, action) => {
            state.details = action.payload;
        },
        
        createUser: (state, action) => {
            state.msg = action.payload;
        },

        updateUser: (state, action) => {
            state.msg = action.payload;
        },

        deleteUser: (state, action) => {
            state.msg = action.payload;
        }
    }
});

// action creators are generated for each case reducer function
export const { getUsers, getUserByName, getUserById, createUser, updateUser, deleteUser } = manageUsersSlice.actions;

export default manageUsersSlice.reducer;