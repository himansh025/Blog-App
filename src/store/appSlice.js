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
        triedLogin : (state) =>{
            state.loginTried = true
        },
        login : (state, actions)=>{
            state.isAuth = true
            state.userData = actions.payload.userData
            state.userPosts = actions.payload.userPosts
            state.userPost = {}
        },
        logout : (state)=>{
            state.isAuth = false
            state.userData = null
            state.userPosts = []
            state.userPost = {}
        },
        getPublicPosts : (state, actions) =>{
            state.allPosts = actions.payload.publicPosts
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
        }
    }
})

export const {getPublicPosts, login, logout, addUserPosts, deleteUserPost, setUserPost, updateUserPosts, triedLogin} = appSlice.actions

export default appSlice.reducer
