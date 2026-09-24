import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div className='vh-100 w-100 d-flex align-items-center justify-content-center'>
            <Link to="/signin-with-email" className='btn btn-sm btn-success rounded-0'>Continue With Firebase</Link>
        </div>
    )
}

export default HomePage