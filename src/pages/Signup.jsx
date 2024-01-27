import React from 'react'
import { Button, Input } from '../components'
import {useForm} from 'react-hook-form'
import authService from '../appwrite/auth'
import { login, logout } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm()
  const submit = async(data) =>{
    await authService.createAccount(data)
    if(authService.isLoggedIn){
      dispatch(login(data))
      navigate('/')
    }
    else{
      dispatch(logout())
    }

  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      
      <Input label='Name' {...register("name")}/>
      <Input label='Email' type='email' {...register('email')}/>
      <Input label='Password' type='password' {...register('password')}/>
      <Button>Sign Up</Button>
    </form>
  )
}

export default Signup