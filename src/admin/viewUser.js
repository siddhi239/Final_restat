import React, { Component, useState, useEffect } from 'react'
import {AppFooter, AppHeader } from 'src/components/index'
import { AppSidebarAdmin, AppHeaderAdmin } from 'src/components/index'
import Table from 'react-bootstrap/Table'
import { DataGrid } from '@mui/x-data-grid';
import { useUserAuth } from 'src/context/UserAuthContext';
import CIcon from '@coreui/icons-react'
import { cilPen, cilInfo, cilTrash } from '@coreui/icons'
import { useParams, useNavigate } from 'react-router-dom';
import { firestore } from 'src/firebase';
import { getAuth, deleteUser } from "firebase/auth";
import { addDoc, collection, doc, getDocs, updateDoc, runTransaction, setDoc, deleteDoc } from "firebase/firestore"




const ViewUser = () => {

  const [users, setUsers] = useState([]);
 
  const { id } = useParams();
  let navigate = useNavigate()

  const usersCollectionRef = collection(firestore, "myprofile")

  useEffect(() => {
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef)
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers();
}, []);

const delUser = async () => {
    await deleteDoc(doc(firestore, "myprofile", id));
    navigate("/allUsers");
    
  }

  return (
      <div>
        <AppSidebarAdmin />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeaderAdmin />
                    <h2>Single User Page</h2>
                    <div>
                      {users.map((u) => {
                        if(u.id === id){
                          return(
                            <div style={{height: '100px', width: '10px', boxShadow: '4px', alignSelf:'center'}}>
                              <center></center><img style={{borderRadius: '50%', height: '140px'}} src={ u.photo } referrerPolicy="no-referrer" />
                              <h2>{u.Name}</h2>





                              <button  type="submit" onClick={ delUser }>Delete User<CIcon icon={cilTrash} /></button>
                            </div>
                            
                          );
                          
                        }
                      })}
                    </div>
                    
                    <AppFooter />
                </div>  
      </div>
   
  );
}

export default ViewUser
