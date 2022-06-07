import React, { Component, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { DataGrid } from '@mui/x-data-grid';
import { useUserAuth } from 'src/context/UserAuthContext';
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { firestore } from 'src/firebase';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";
import { addDoc, collection, getDocs, setDoc, doc, deleteDoc} from "firebase/firestore"
import './settings.css'
import { async } from '@firebase/util';


const Settings = () => {

 
  let navigate = useNavigate();

  const { user } = useUserAuth();
  const e = user.email;
  const id = user.uid;
  
  const delUser = async () => {
    await deleteDoc(doc(firestore, "myprofile", id));
    deleteUser(user).then(() => {
      alert('Successfully deleted user');
      navigate("/");
    }).catch((error) => {
      console.log('Error deleting user:', error);
    });
    
  }

  // const delDoc = (uid) => {
  //   firestore.collection("myprofile").doc(uid).delete()
  //   .then(() => {
  //     console.log("doc deleted succesfully")
  //   }).catch((error) => {
  //     console.log('Error deleting user:', error);
  //   });

  // }

  
  

  return (
      <div>
        <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <div style={{padding:'25px'}}>
                    <h2> Settings</h2><br/>
                    <div style={{padding:'10px'}}>
                    <h6>You are currently signed in as: <b style={{color:'blue'}}><i>{e}</i></b></h6>
                    <br/><br/>
                    <b><i>Language </i>  </b>
                    <br/><br/> 
                    Current Language: <b style={{color:'blue'}}>English</b>
                    <br/><br/><br/>
                    <b><i>Account Settings</i></b>
                    <br/><br/>
                    <button className="setbutton" type="submit" id="submit" name="next" onClick={() => navigate("/logout")}>Sign Out</button><br/><br/>
                    <button className="setbutton" type="submit" id="submit" name="next" onClick={ delUser }>Delete Restat Account</button>

                    </div>
                    </div>
                    <AppFooter />
                </div>  
      </div>
   
  );
}




export default Settings;