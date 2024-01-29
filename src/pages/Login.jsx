import React from 'react'
import authService from '../appwrite/auth'
import { Button, Input } from '../components'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login, logout } from '../store/authSlice'
import { useNavigate } from 'react-router'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm() 
  const onSubmit = async(data) => {
    await authService.loginUser(data)
    if(authService.isLoggedIn()){
      dispatch(login(data))
      navigate("/")
    }
    else
      dispatch(logout())
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-fit'>
      <Input label={'Email'} type='email' {...register('email', {
        validate : {
          matchPattern : value => /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(value) || 'email is not valid'
        }
      })}/>
      <Input label={'Password'} type='password' {...register('password')}/>
      <Button className={'bg-black text-white hover:scale-110'}>Login</Button>
    </form>
  )
}

export default Login


