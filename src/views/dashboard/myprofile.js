import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from "react-bootstrap";
import DefaultLayout from 'src/layout/DefaultLayout';
import { useUserAuth } from "src/context/UserAuthContext";
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { toast } from 'react-toastify';
import app from 'src/firebase'
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs } from "firebase/firestore"
import { async } from '@firebase/util';



const Myprofile = () => {
    var count = 0;
    const [users, setUsers] = useState([]);

    const [newAffiliation, setNewAffiliation] = useState("")
    const [newAOI, setNewAOI] = useState("")

    const { user } = useUserAuth();
    const id = user.uid;
    const n = user.displayName;
    const e = user.email;
    const usersCollectionRef = collection(firestore, "myprofile")

    const createMyProfile = async () => {
        await addDoc(usersCollectionRef, { Name: n, Affiliation: " ", Email: e, AOI: " ", UID: id})
    }

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getUsers();
    }, []);

    return (
        <>
            <div>
                <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    {users.map((u) => {
                        if(u.UID === user.uid){
                            count = 1;
                            return(

                                    <div className="p-4 box">
                                       ,
                                    <h2 className="mb-3">My Profile details</h2>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" value={n} disabled />
                                            </Form.Group>
    
                                            <Form.Group className="mb-3" controlId="formAffiliation">
                                                <Form.Label>Affiliation</Form.Label>
                                                <Form.Control type="text" value={ u.Affiliation } disabled/>
                                            </Form.Group>
    
                                            <Form.Group className="mb-2" controlId="formEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" value={e} disabled />
                                            </Form.Group>
    
                                            <Form.Group className="mb-3" controlId="formAreaofInterest">
                                                <Form.Label>Area of Interest</Form.Label>
                                                <Form.Control type="text" value = { u.AOI } disabled />
                                            </Form.Group>
    
                                        </Form>
                                    </div>
                                );
                            }
                        }

                    )
                }
                
                {
                    (() => {
                        if(count === 0) {
                                createMyProfile()
                            }
                    })()  
            }

                        
                    
                        
                    
                    
                    <AppFooter />
                </div>
            </div>
        </>
    );
}

export default Myprofile;