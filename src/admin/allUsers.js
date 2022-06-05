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
                    {users.map((u) =>{
                        return(
                            <div key={ u.id }>
                                <h2>{u.Name}</h2>
                            </div>
                        );

                    })}
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Username</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td colSpan={2}>Larry the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </Table>

                    <AppFooter />
                </div>  
      </div>
   
  );
}

export default AllUsers