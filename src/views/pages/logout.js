import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";


const Logout = () => {

    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
        await logOut(user);
        navigate("/");
        } catch (error) {
        console.log(error.message);
        }
     };

    return (

       { handleLogout }

    );
}

export default Logout