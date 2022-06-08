import React, { Component, useState, useEffect } from 'react'
import {AppFooter, AppHeader, AppHeaderAdmin } from 'src/components/index'
import { AppSidebarAdmin } from 'src/components/index'
import Table from 'react-bootstrap/Table'
import { useUserAuth } from "src/context/UserAuthContext";
import { firestore } from 'src/firebase';
import { getAuth, deleteUser } from "firebase/auth";
import CIcon from '@coreui/icons-react'
import { addDoc, collection, doc, getDocs, updateDoc, runTransaction, setDoc, deleteDoc } from "firebase/firestore"
import { cilPen, cilInfo, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {

  let navigate = useNavigate()
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

    // const delUser = async (id) => {
    //   await deleteDoc(doc(firestore, "myprofile", id));
    //   // deleteUser(id).then(() => {
    //   //   alert('Successfully deleted user');
    //   //   navigate("/");
    //   // }).catch((error) => {
    //   //   console.log('Error deleting user:', error);
    //   // });
      
    // }

  return (
      <div>
        <AppSidebarAdmin />
                <div className="wrapper d-flex flex-column min-vh-100 ">
                    <AppHeaderAdmin />
                    <h2>All Users</h2>
                    <Table  >
                    <thead >
                        <tr>
                          <th><center>Sr. No</center></th>
                          <th><center>Name</center></th>
                          <th><center>Email</center></th>
                          <th><center>Affiliation</center></th>
                          <th><center>Citied By</center></th>
                          <th><center>Action</center></th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u,index) => (
                         
                         <tr key={ index }>
                          <td scope='row'><center>{index + 1}</center></td>
                          <td>
                          <center>
                              <img style={{borderRadius: '50%', height: '40px'}} src={ u.photo } referrerPolicy="no-referrer"/>
                              &nbsp;&nbsp; &nbsp;&nbsp; 
                              {u.Name}
                            </center></td>
                          <td><center>{u.Email}</center></td>
                          <td><center>{u.Affiliation}</center></td>
                          <td><center>{u.CitiedBy}</center></td>
                          <td>
                            <center>
                              <button style={{background: 'none', border:'none', height:'40px',width:'40px'}} variant="success" type="submit" onClick={() => navigate(`/viewUser/${u.id}`)} ><CIcon icon={cilInfo} /></button>&nbsp;&nbsp; 
                              {/* <button  type="submit" onClick={ delUser(u.id) }><CIcon icon={cilTrash} /></button> */}
                            </center>
                          </td>

                        </tr>

                        ))

                        }
                        
                      </tbody>
                    </Table>
                    
                    
                    <AppFooter />
                </div>  
                
      </div>
   
  );
}

export default AllUsers