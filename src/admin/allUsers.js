import React, { Component, useState, useEffect } from 'react'
import {AppFooter, AppHeader } from 'src/components/index'
import { AppSidebarAdmin } from 'src/components/index'
import Table from 'react-bootstrap/Table'
import { useUserAuth } from "src/context/UserAuthContext";
import { firestore } from 'src/firebase';
import { addDoc, collection, doc, getDocs, updateDoc, runTransaction, setDoc } from "firebase/firestore"

const AllUsers = () => {

    const { user } = useUserAuth();
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(firestore, "myprofile")

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getUsers();
    }, []);

  return (
      <div>
        <AppSidebarAdmin />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <h2>Admin Page</h2>
                    
                    
                    <Table striped bordered hover>
                      <thead  variant="dark">
                        <tr>
                          <th>Sr. No</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Affiliation</th>
                          <th>Area of Interest</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                          {users.map((u, index) => (
                          <tr key={index}>
                          <td scope='row'>{index + 1}</td>
                          <td>{u.Name}</td>
                          <td>{u.Email}</td>
                          <td>{u.Affiliation}</td>
                          <td>{u.AOI}</td>
                          
                        </tr>

                        ))}
                        
                      </tbody>
                    </Table>


                    <AppFooter />
                </div>  
      </div>
   
  );
}

export default AllUsers