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
                    
                    
                    {/* <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Username</th>
                        </tr>
                      </thead>
                      <tbody>
                          {users.map((u) => {
                          <tr>
                          <td scope='row'>{index + 1}</td>
                          <td>{user.Name}</td>
                          <td>{user.Affiliation}</td>
                          <td>{user.Email}</td>
                        </tr>

                        })}
                        
                      </tbody>
                    </Table> */}


                    <AppFooter />
                </div>  
      </div>
   
  );
}

export default AdminDashboard
