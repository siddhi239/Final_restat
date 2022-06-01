import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from "react-bootstrap";
import DefaultLayout from 'src/layout/DefaultLayout';
import { useUserAuth } from "src/context/UserAuthContext";
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { toast } from 'react-toastify';
import app from 'src/firebase'
import { firestore } from 'src/firebase';
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore"



const Updateprofile = () => {
    const [users, setUsers] = useState([]);

    const [newAffiliation, setNewAffiliation] = useState("")
    const [newAOI, setNewAOI] = useState("")

    const { user } = useUserAuth();
    const uid = user.uid;
    const n = user.displayName;
    const e = user.email;
    const usersCollectionRef = collection(firestore, "myprofile")

    

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getUsers();
    }, []);

    const updateprofile = async (id, Name, Affiliation, Email, AOI) => {
        const userDoc = doc(firestore, "myprofile", id)
        await updateDoc(userDoc, {Name, Affiliation, Email, AOI})
        }
    

    return (
        <>
            <div>
                <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    {users.map((user) => {
                        if(user.UID === uid){
                            return (
                                <div className="p-4 box">
                                <h2 className="mb-3">Update Profile details</h2>
                                
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={ user.Name }/>
                                            <Form.Text className="text-muted">
                                                Full name as it appears on your articles
                                            </Form.Text>
                                        </Form.Group>
            
                                        <Form.Group className="mb-3" controlId="formAffiliation">
                                            <Form.Label>Affiliation</Form.Label>
                                            <Form.Control type="text" value={ user.Affiliation} 
                                        />
                                            <Form.Text className="text-muted">
                                                E.g., Professor of Physics, Princeton University
                                            </Form.Text>
                                        </Form.Group>
            
                                        <Form.Group className="mb-2" controlId="formEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" value={ user.Email} />
                                        </Form.Group>
            
                                        <Form.Group className="mb-3" controlId="formAreaofInterest">
                                            <Form.Label>Area of Interest</Form.Label>
                                            <Form.Control type="text" value={ user.AOI}
                                                // onChange={(event) => {
                                                //     setNewAOI(event.target.value)
                                                // }} 
                                                />
                                            <Form.Text className="text-muted">
                                                E.g., general relativity, unified field theory
                                            </Form.Text>
                                        </Form.Group>
                                        <Button variant="primary" type="submit" onClick={ updateprofile }>
                                            Update
                                        </Button>
                                    </Form>
                            </div>
                            ); 
                          }  
                    })}
                   
                    <AppFooter />
                </div>
            </div>
        </>
    );
                }

export default Updateprofile;