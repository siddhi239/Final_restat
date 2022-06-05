import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";


const Logout = () => {

    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
        await logOut();
        //navigate("/");
        } catch (error) {
        console.log(error.message);
        }
     };

    return (
        <div>
        <h2><Link >Logout??</Link></h2>
        
        </div>
    
    );
}

export default Logout