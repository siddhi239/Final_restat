import React, { Component, useState, useEffect } from 'react'
import {AppFooter, AppHeader } from 'src/components/index'
import { AppSidebarAdmin } from 'src/components/index'
import Table from 'react-bootstrap/Table'
import { DataGrid } from '@mui/x-data-grid';
import { useUserAuth } from 'src/context/UserAuthContext';





const AdminDashboard = () => {

  const [users, setUsers] = useState([]);

  const { user } = useUserAuth();
  
//   useEffect(() => {
//     const getUsers = async () => {
//         const data = await getDocs(usersCollectionRef)
//         setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//     }

//     getUsers();
// }, []);


  return (
      <div>
        <AppSidebarAdmin />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <h2>Admin Page</h2>
                    
                    
                    
                    <AppFooter />
                </div>  
      </div>
   
  );
}

export default AdminDashboard
