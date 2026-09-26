import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return(
        <>
            Login Page
            <div>
                <Link to="/signup">Create Account{" "}</Link> 
                <span>if your are new</span>
            </div>
        </>
    )
}

export default LoginPage;
