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
  const [aoi, setAoi] = useState([]);
  const aoiarr = [];

  const { id } = useParams();

  const { user } = useUserAuth();

  const usersCollectionRef = collection(firestore, "myprofile")

  //const docRef = doc(firestore, "myprofile", id);

  
  useEffect(() => {
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef)
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

      //   {users.map((u)=>{
      //     if(u.id === id){
      //     setAoi(u.AOI)
      //     }
      //     console.log(aoi)
      //   })
      // }

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
                        setAoi(u.AOI);
                        <div key={u.id}>
                          <img style={{borderRadius: '50%', height: '40px'}} src={ u.photo } referrerPolicy="no-referrer"/>
                          <h2>{u.Name}</h2>
                          <h2>{u.Email}</h2>
                          <h2>{u.Affiliation}</h2>
                          <h2>{u.CitiedBy}</h2>
                        </div>
                      }
                      
                    })

                    }
                    {aoi.map((a,index) => {
                     <div key={index}>
                        <h2>{a.title}</h2>
                     </div>
                    })}
                    
                    </div>
                    
                    <AppFooter />
                </div>  
      </div>
   
  );
}

export default ViewUser
