import React, { Component, useState, useEffect } from 'react'
import {AppFooter, AppHeader } from 'src/components/index'
import { AppSidebarAdmin, AppHeaderAdmin } from 'src/components/index'
import Table from 'react-bootstrap/Table'
import { DataGrid } from '@mui/x-data-grid';
import { useUserAuth } from 'src/context/UserAuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore"



const ViewUser = () => {

  const [users, setUsers] = useState([]);
  //const [aoi, setAoi] = useState([]);
  
  const { id } = useParams();

  const { user } = useUserAuth();

  const usersCollectionRef = collection(firestore, "myprofile")

  //const docRef = doc(firestore, "myprofile", id);

  
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
                    <AppHeaderAdmin />
                    <h2>Single User Page</h2>
                    <div>
                      {users.map((u) => {
                        if(u.id === id){
                          <div key={ u.id }>
                              <h2>{u.Name}</h2>
                          </div>
                        }
                      })}
                    </div>
                    
                    <AppFooter />
                </div>  
      </div>
   
  );
}

export default ViewUser
