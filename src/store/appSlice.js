import { createSlice } from "@reduxjs/toolkit";


const appSlice = createSlice({
    name : 'appSlice',
    initialState : {
        isAuth : false,
        userData : null,
        userPosts : [],
        userPost : null,
        loginTried : false,
        publicPosts : [],
        publicUserPost : null
    },

    reducers: {
        triedLogin : (state) =>{
            state.loginTried = true
        },
        login : (state, actions)=>{
            state.isAuth = true
            state.userData = actions.payload.userData
            state.userPosts = actions.payload.userPosts
        },
        logout : (state)=>{
            state.isAuth = false
            state.userData = null
            state.userPosts = []
            state.userPost = null
        },
        updateUserPosts : (state, actions) =>{
            state.userPosts = state.userPosts.map(userPost=>userPost.$id == actions.payload.$id ? actions.payload : userPost)
        },
        addUserPosts : (state, actions) =>{
            state.userPosts = [...state.userPosts, actions.payload]
        },
        deleteUserPost: (state, actions) =>{
            state.userPosts = state.userPosts.filter(userPost => userPost.$id != actions.payload)
        },
        setUserPost: (state, actions) =>{
            state.userPost = state.userPosts.filter(userPost => userPost.$id === actions.payload)[0]
        },
        setPublicPosts : (state, actions) =>{
            state.publicPosts = actions.payload.filter(publicPost=>publicPost.isPublic ==true)
        },
        updatePublicPosts : (state, actions)=>{
            if(actions.payload.isPublic)
                state.publicPosts = [...state.publicPosts, actions.payload]
            else
                state.publicPosts = state.publicPosts.filter(publicPost=>publicPost.$id != actions.payload.$id)
        },
        setPublicUserPost : (state, actions) =>{
            state.publicUserPost = state.publicPosts.filter(publicPost =>publicPost.$id==actions.payload)[0]
        }
    }
})

export const {getPublicPosts, login, logout, addUserPosts, deleteUserPost, setUserPost, updateUserPosts, triedLogin, setPublicPosts, setPublicUserPost, updatePublicPosts} = appSlice.actions

export default appSlice.reducer
