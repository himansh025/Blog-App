import React, { Children } from 'react'
import { useSelector } from 'react-redux'

function Protected({children, isAuth = true}) {
    let status = useSelector((state)=>state.status)
    if(status && status == isAuth)
      return children  
      
    return <h1>loading</h1>
        
}

export default Protected