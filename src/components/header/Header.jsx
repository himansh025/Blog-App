import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { logout } from '../../store/appSlice'


function Header() {
    const isAuth = useSelector(state=> state.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () =>{
        authService.logoutUser().then(()=>{
            dispatch(logout())
            navigate('/')
        })
    }

    const navItems = [
        {
            name : 'Home',
            to: '/',
            visible : !isAuth,
        },
        {
            name : 'Create Post',
            to: '/create',
            visible : isAuth,
        },
        {
            name : 'Login',
            to: '/login',
            visible : !isAuth,
        },
        {
            name : 'Signup',
            to: '/signup',
            visible : !isAuth,
        },
        {
            name : 'My Posts',
            to: 'posts/',
            visible : isAuth,
        },
        {
            name : 'Logout',
            visible : isAuth,
            to: '/'
        },
    ]

  return (
    <nav className='mt-3 p-4 rounded-2xl flex justify-between items-center shadow-2xl'>
            <div className='text-black hover:text-gray-600 text-2xl'>
                <Link to='/'>Logo</Link>
            </div>
        <ul className='flex justify-center gap-5 items-center'>
            {
                navItems
                .map(item=>(
                    item.visible && 
                    <li className='text-black hover:text-gray-600' key={item.name}>
                        {
                            item.name === 'Logout' ? 
                            <Link to={item.to} onClick={logoutHandler}>{item.name}</Link> :
                            <Link to={item.to}>{item.name}</Link>
                        }
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default Header