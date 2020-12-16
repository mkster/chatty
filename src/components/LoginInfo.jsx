
import React, { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

export default function LoginInfo(props){
    const user = useMemo(()=> auth().currentUser, []);
    function logout() {
        auth().signOut();
    }
    
    return (
        <>
            {user ? 
                <>
                    Logged in as: <strong>{user.email}</strong> 
                    {" "}<Button variant="outline-primary" size="sm" onClick={logout}>Logout</Button>
                </>
            : 
                <><br/>Not logged in <Link to="/signup">signup</Link></>
            }
        </>
    )
}
