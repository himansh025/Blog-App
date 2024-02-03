import { createSlice } from "@reduxjs/toolkit";


const appSlice = createSlice({
    name : 'appSlice',
    initialState : {
        isAuth : false,
        userData : null,
        allPosts : [],
        userPosts : []
    },

    reducers: {
        login : (state, actions)=>{
            state.isAuth = true
            state.userData = actions.payload.userData
            state.userPosts = [...state.userPosts, ...actions.payload.userPosts]
        },
        logout : (state)=>{
            state.isAuth = false
            state.userData = null
            state.userPosts = []
        },
        getPublicPosts : (state, actions) =>{
            state.allPosts = actions.payload.publicPosts
        }
    }
})

export const {getPublicPosts, login, logout} = appSlice.actions

export default appSlice.reducer
