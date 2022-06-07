import React, { Component, useState, useEffect } from 'react'

import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import Table from 'react-bootstrap/Table'
import { DataGrid } from '@mui/x-data-grid';
import { useUserAuth } from 'src/context/UserAuthContext'
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore"

const Libraryapi = () => {

  const { user } = useUserAuth();
    // console.log(user.displayName);
    const usersCollectionRef = collection(firestore, "myprofile")
    const [users, setUsers] = useState([]);
    const [papers, setPapers] = useState([]);
    const [profile, setProfile] = useState([]);
    const [authid, setAuthid] = useState(" ");
    const [loading, setLoading] = useState(false);
    // const [u, setU] = useState(" ");

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            // setU(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
        }

        getUsers();
    }, []);

  

    useEffect(()=>{
     
      users.map(item =>
        {
        if(user.uid === item.id){
            setAuthid(item.AuthorID);
        }
        console.log(user.uid);
    console.log(authid);
    
      
    }
    )
    },[]);

    useEffect(() => {
      setLoading(true);
      if(authid !== " "){
        Fetchpapers()
      }
  }, [authid])

    const Fetchpapers=()=>{

    console.log(authid);
      
    const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${authid}&hl=en&api_key=452c8d62a3109b7126306267dc125e951050339de3b68057816fdd0893fbd2f9`;
    console.log(url);
    fetch(url)
      .then(response => {
        return response.json();

      }).then(data => {
        console.log(data);
         setPapers(data.articles);
        //  setProfile(data.author)
        //  console.log(papers);
      })
      .catch(err => {
         console.log(err)
      })
      .finally(() => {
        setLoading(false);
      });
        
    }

    return (
      <div>
     <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <h2>Admin Page</h2>
                    
                    <button onClick={Fetchpapers}>Refresh</button>
                    {/* {users.map((item) =>{

                        if(user.uid === item.id){
                            return(
                                <div key={item.id}>
                                     <img style={{borderRadius: '50%', height: '40px'}} src={ item.photo } referrerPolicy="no-referrer"/>
                                 
                                    </div>
                            );
                            
                        }
                    }
                    )} */}

                        <h2>{profile.name}</h2>
                        <h4>{profile.afilliations}</h4>
                        <h4>{profile.email}</h4>
                      {
                      papers.map((item,index) =>
                      <div key={index}>
                        {/* <h5>{item.title}</h5> */}
                        <a href= {item.link}> <h5>{item.title}</h5></a>
                      </div>
                      )
                    }
                    
                    <AppFooter />
                </div>  
      </div>
   
  );
}

export default Libraryapi