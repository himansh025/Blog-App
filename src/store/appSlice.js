import { createSlice } from "@reduxjs/toolkit";


const appSlice = createSlice({
    name : 'appSlice',
    initialState : {
        isAuth : false,
        userData : null,
        allPosts : [],
        userPosts : [],
        userPost : {},
        loginTried : false
    },

    reducers: {
        login : (state, actions)=>{
            state.isAuth = true
            state.userData = actions.payload.userData
            state.userPosts = actions.payload.userPosts
            state.loginTried = true
        },
        logout : (state)=>{
            state.isAuth = false
            state.userData = null
            state.userPosts = []
        },
        getPublicPosts : (state, actions) =>{
            state.allPosts = actions.payload.publicPosts
        },
        updateUserPosts : (state, actions) =>{
            state.userPosts = [...state.userPosts, actions.payload]
        },
        deleteUserPost: (state, actions) =>{
            state.userPosts = state.userPosts.filter(userPost => userPost.$id != actions.payload)
        },
        getUserPost: (state, actions) =>{
            state.userPost = state.userPosts.filter(userPost => userPost.$id === actions.payload)
        }
    }
})

export const {getPublicPosts, login, logout, updateUserPosts, deleteUserPost, getUserPost} = appSlice.actions

export default appSlice.reducer
