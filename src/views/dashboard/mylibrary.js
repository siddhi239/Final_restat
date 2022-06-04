import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from "react-bootstrap";
import DefaultLayout from 'src/layout/DefaultLayout';
import { useUserAuth } from "src/context/UserAuthContext";
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import app from 'src/firebase'
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore"

import './mysearch.css';

const userCardTemplate = document.querySelector("[data-user-template]")

const Mylibrary= () =>{
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false);
    
    const params = {
        engine: "google_scholar",
        q: "IOT",
        hl: "en"
    };
    const url =`https://serpapi.com/search.json?engine=google_scholar&q=${params.q}&hl=${params.hl}&api_key=f27584dfd4f6b31ffcf33b293880c7b88ff0404c27db802c2ad64fe38fed5f1e`;
    const fetchData = () =>{
        fetch(url)
            .then(response => {
            // console.log(res.data.organic_results[0])
            return response.json();

            }).then((data) => {
            // const card = userCardTemplate.content.cloneNode(true).children[0]
            // console.log(card)
            //console.log(data)
            let val = data.organic_results[0].publication_info
            // console.log(val)
            setUser(val)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false);
              });
    }

    useEffect(() => {
        setLoading(true);
        fetchData()
    })

    // if (loading) {
    //     return <p>Data is loading...</p>;
    //   }

   

return(
    <>
    <div>
    <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    {
                        // <link rel="stylesheet" href="mysearch.css">
                        <div className="p-4 box">
                            <h2 className="mb-3">Library</h2>
                            <div>
                                <div className="form-outline">
                                <input type="search" id="search" className="form-control" placeholder="Search Article or Name here..." aria-label="Search" />
                                </div>
                            </div> 
                                                
                            <div className='usercards'></div>
                            <template data-user-template>
                            <div className='card'>
                                <div className='header'></div>
                                <div className='body'></div>
                            </div>
                            </template> 


                            {user.summary}               
                            
                        </div> 
                    }
                    
                    <AppFooter />
                </div>
            </div> 
    </>
)
};

export default Mylibrary;