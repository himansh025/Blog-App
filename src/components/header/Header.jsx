import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Header() {
    const isAuth = useSelector(state=> state.isAuth)
    const navItems = [
        {
            name : 'Home',
            to: '/',
            visible : true,
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
            to: '/user/posts/',
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
                        <Link to={item.to}>{item.name}</Link>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default Header