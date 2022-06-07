import React, { Component, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { DataGrid } from '@mui/x-data-grid';
import { useUserAuth } from 'src/context/UserAuthContext';
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { firestore } from 'src/firebase';
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore"
import './settings.css'


const Settings = () => {

  const { user } = useUserAuth();
  const e = user.email;

  let navigate = useNavigate();
  

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
                    <button className="setbutton" type="submit" id="submit" name="next" onClick={() => navigate("/login")}>Delete Restat Account</button>

                    </div>
                    </div>
                    
                    
                    <AppFooter />
                </div>  
      </div>
   
  );
}




export default Settings;