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
import CIcon from '@coreui/icons-react'
import './mysearch.css';
import { cilMagnifyingGlass } from '@coreui/icons';

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

const Mylibrary= () =>{
    const [user, setUser] = useState([])
    const [pub_sum, setPubsum] = useState([])
    const [cite, setCite] = useState([])
    const [resr, setResr] = useState([])
    const [loading, setLoading] = useState(false);
    
    const params = {
        engine: "google_scholar",
        q: "IOT",
        hl: "en"
    };
    const url =`https://serpapi.com/search.json?engine=google_scholar&q=${params.q}&hl=${params.hl}&api_key=f27584dfd4f6b31ffcf33b293880c7b88ff0404c27db802c2ad64fe38fed5f1e`;
    
    let u = []

    // searchInput.addEventListener('input' , e => {
    //     const value = e.target.value.toLowerCase()
    //     user.forEach(user =>{
            
    //         const isVisible = user.title.includes(value) || user.snippet.includes(value)
    //         user.element.classList.toggle("hide", !isVisible)
    //         // console.log(users)
    //     })
    // })
    const fetchData = () =>{
        fetch(url)
            .then(response => {
            // console.log(res.data.organic_results[0])
            return response.json();

            }).then(data => {
            
            // data = data.organic_results[0]
            var userData = data;
            var newData = userData.organic_results[0]
            // var newResource = userData.organic_results[0].resources[0]
            // console.log(newData)
            const arr = Array.from(newData);
            u = arr.map(u => {
                
                const card = userCardTemplate.content.cloneNode(true).children[0]  
                const header = card.querySelector("[data-header]")
                const body = card.querySelector("[data-body]")
                header.textContent = u.title
                body.textContent= u.snippet
                userCardContainer.append(card)
                // console.log(user)
                return { title: u.title, snippet: u.snippet, element: card }
            })

            //console.log(data)
            
            let sum = data.organic_results[0]
            let reso = data.organic_results[0].resources[0]
            
            // console.log(val)
            setUser(sum)
            setResr(reso)

            // setUser(newResource)
            })
            .catch(err => {
                console.log(err)
            })
            // http://localhost:3000/
    }

    useEffect(() => {
        //setLoading(true);
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
                                <input type="search" id="search" className="form-control" placeholder="Search Article or Name here..." aria-label="Search" data-search>
                               
                                </input>
                                <button className="search-button" type="submit" id="submit" name="search-go" style={{padding: '0',border: 'none',background: 'none'}}>
                                <CIcon icon={cilMagnifyingGlass} customClassName="nav-icon" style={{height:'25px', widht: '25px'}}/>
                                </button>
                                
                                </div>
                                
                            </div> 
                                                
                            <div className='usercards' data-user-cards-container></div>
                            <div className='card'>
                                <div className='header' data-header>abc</div>
                                <div className='body' data-body>body</div>
                            </div> <div className='card'>
                                <div className='header' data-header>xyz</div>
                                <div className='body' data-body>body</div>
                            </div>
                            <template datausertemplate>
                            <div className='card'>
                                <div className='header' data-header></div>
                                <div className='body' data-body></div>
                            </div>
                            </template> 

                            <h2>Title:</h2>{user.title} <br/>
                            <b> Snippet:</b>{user.snippet} <br/>
                            <b>Resource Title:</b> {resr.title}   <br/>  
                            <b>Resource Link: </b>{resr.link}<br/>


                        </div> 
                    }
                    
                    <AppFooter />
                </div>
            </div> 
    </>
)
};

export default Mylibrary;