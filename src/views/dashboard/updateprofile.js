import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from "react-bootstrap";
import DefaultLayout from 'src/layout/DefaultLayout';
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "src/context/UserAuthContext";
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { toast, ToastContainer } from 'react-toastify';
import app from 'src/firebase'
import { firestore } from 'src/firebase';
import { addDoc, collection, doc, getDocs, updateDoc, runTransaction, setDoc } from "firebase/firestore"



const Updateprofile = () => {
    const [users, setUsers] = useState([

    ]);

    const [newAffiliation, setNewAffiliation] = useState("")
    const [newAOI, setNewAOI] = useState("")

    const { user } = useUserAuth();
    const uid = user.uid;
    const n = user.displayName;
    const e = user.email;
    const usersCollectionRef = collection(firestore, "myprofile")
    let navigate = useNavigate();
    //const usersCollectionRef = doc(firestore, "myprofile", newAffiliation, newAOI);
    

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getUsers();
    }, []);

    const updateprofile = async () => { 
        navigate("/myprofile");
        await setDoc(doc(firestore, "myprofile", uid), {
            Name: n, 
            Affiliation: newAffiliation, 
            Email: e, 
            AOI: newAOI
          });
          
          toast.success('Profile Updated Sucessfully')
        }


    return (
        <>
            <div>
                <ToastContainer />
                <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    {users.map((u) => {
                        if(user.uid === u.id){
                            return (
                                <div key={u.id} className="p-4 box">
                                <h2 className="mb-3">Update Profile details</h2>
                                
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" defaultValue={ u.Name } disabled/>
                                            <Form.Text className="text-muted">
                                                Full name as it appears on your articles
                                            </Form.Text>
                                        </Form.Group>
            
                                        <Form.Group className="mb-3" controlId="formAffiliation">
                                            <Form.Label>Affiliation</Form.Label>
                                            <Form.Control type="text" 
                                             onChange={(e) => {
                                                setNewAffiliation(e.target.value)
                                            }} 
                                        />
                                            <Form.Text className="text-muted">
                                                E.g., Professor of Physics, Princeton University
                                            </Form.Text>
                                        </Form.Group>
            
                                        <Form.Group className="mb-2" controlId="formEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" defaultValue={ u.Email} />
                                        </Form.Group>
            
                                        <Form.Group className="mb-3" controlId="formAreaofInterest">
                                            <Form.Label>Area of Interest</Form.Label>
                                            <Form.Control type="text" 
                                                onChange={(e) => {
                                                    setNewAOI(e.target.value)
                                                }} 
                                                
                                                />
                                            <Form.Text className="text-muted">
                                                E.g., general relativity, unified field theory
                                            </Form.Text>
                                        </Form.Group>
                                        <Button variant="success" type="submit" onClick={ updateprofile }>
                                            Save
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