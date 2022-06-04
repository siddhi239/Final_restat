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




const Mylibrary = () => {
    var count = 0;
    const [users, setUsers] = useState([]);
    

    const [newAffiliation, setNewAffiliation] = useState("")
    const [newAOI, setNewAOI] = useState("")

    const { user } = useUserAuth();
    const id = user.uid;
    const n = user.displayName;
    const e = user.email;
    let navigate = useNavigate();
    //const docSnap = DocumentSnapshot<>
    const usersCollectionRef = collection(firestore, "myprofile")
    // const userDoc = doc(firestore, "myprofile", id);
    // const docSnap = getDoc(userDoc);
    

    // const checkDoc = async () => {
        
       
    //     //const docSnap = await getDoc(userDoc);

    // }

    const createMyProfile = async () => {
        

            await setDoc(doc(firestore, "myprofile", id), 
            {   Name: n, 
                Affiliation: " ", 
                Email: e, 
                AOI: " "
            })
            
        //  }
        }


    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
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
                            if(user.uid === u.id){
                                return(
                                    <div key={ u.id } className="p-4 box">
                                {/* <h2 className="mb-3"> { u.Name }</h2> */}

                                <h2 className="mb-3">My Profile details</h2>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={ u.Name } disabled />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formAffiliation">
                                            <Form.Label>Affiliation</Form.Label>
                                            <Form.Control type="text" value={ u.Affiliation } disabled/>
                                        </Form.Group>

                                        <Form.Group className="mb-2" controlId="formEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" value={ u.Email } disabled />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formAreaofInterest">
                                            <Form.Label>Area of Interest</Form.Label>
                                            <Form.Control type="text" value = { u.AOI } disabled />
                                        </Form.Group>

                                        <Button variant="primary" type="submit" onClick={() => navigate("/updateprofile")}>
                                            Update
                                        </Button>

                                    </Form>
                                </div>
                                );
                            }
                            else{
                                count = count + 1;
                            }
                            
                        })
                    }
                    {users.map((u) => {
                            if(count === users.length){
                                createMyProfile();
                                return(
                                    <div key={ u.id } className="p-4 box">
                                {/* <h2 className="mb-3"> { u.Name }</h2> */}

                                <h2 className="mb-3">My Profile details</h2>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={ u.Name } disabled />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formAffiliation">
                                            <Form.Label>Affiliation</Form.Label>
                                            <Form.Control type="text" value={ u.Affiliation } disabled/>
                                        </Form.Group>

                                        <Form.Group className="mb-2" controlId="formEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" value={ u.Email } disabled />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formAreaofInterest">
                                            <Form.Label>Area of Interest</Form.Label>
                                            <Form.Control type="text" value = { u.AOI } disabled />
                                        </Form.Group>

                                        <Button variant="primary" type="submit" onClick={() => navigate("/updateprofile")}>
                                            Update
                                        </Button>

                                    </Form>
                                </div>

                                );

                                }
                            
                        })
                    }
                    <AppFooter />
                </div>
            </div>
        </>
    );
}

export default Mylibrary;