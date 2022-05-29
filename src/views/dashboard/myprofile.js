import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from "react-bootstrap";
import DefaultLayout from 'src/layout/DefaultLayout';
import { useUserAuth } from "src/context/UserAuthContext";
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { toast } from 'react-toastify';
import app from 'src/firebase'
import { auth, createUserDocument } from 'src/firebase';

const initialState = {
    name: "",
    affiliation: "",
    email: "",
    aoi: "",
};

const Myprofile = () => {

    const [state, setState] = useState(initialState);

    const { name, affiliation, email, aoi } = state;

    const { user } = useUserAuth();
    const n = user.displayName;
    const e = user.email;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

   createUserDocument(user, {name}, {affiliation}, {email}, {aoi})

    // const handlesubmit = (e) => {
    //     e.preventDefault();
    //     if (!name || !affiliation || !email || !aoi) {
    //         alert("Please fill data in all fields")
    //         }else{
                
    //         alert("successful")
    //     }
    // };

    return (
        <>
            <div>
                <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <div className="p-4 box">
                        <h2 className="mb-3">My Profile details</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" />
                                <Form.Text className="text-muted">
                                    Full name as it appears on your articles
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formAffiliation">
                                <Form.Label>Affiliation</Form.Label>
                                <Form.Control type="text" />
                                <Form.Text className="text-muted">
                                    E.g., Professor of Physics, Princeton University
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formAreaofInterest">
                                <Form.Label>Area of Interest</Form.Label>
                                <Form.Control type="text" />
                                <Form.Text className="text-muted">
                                    E.g., general relativity, unified field theory
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Agree All terms & conditions" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={ createUserDocument }>
                                Submit
                            </Button>
                        </Form>
                    </div>
                    <AppFooter />
                </div>
            </div>
        </>
    );
}

export default Myprofile;