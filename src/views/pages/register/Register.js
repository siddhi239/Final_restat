import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "src/context/UserAuthContext";
import { CreateUserDoc } from "../../../context/createUserDoc"
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs } from "firebase/firestore"
import './register.css'
import CIcon from '@coreui/icons-react'
import { cilNewspaper } from '@coreui/icons'

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();
  
  //const usersCollectionRef = collection(firestore, "myprofile/")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);

      // const id = signUp.uid;
      // const n = signUp.displayName;
      // const e = signUp.email;
      // await addDoc(usersCollectionRef, { Name: n, Affiliation: " ", Email: e, AOI: " ", UID: id})

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
    
  };
  
  return (
    <>
      <div className="p-4 box">
      <div style={{display:'inline-flex'}}>
        
      <CIcon style={{textAlign: 'left', padding:'2px',height: '50px', width: '50px'}} icon={cilNewspaper} customClassName="nav-icon" />
      &nbsp;&nbsp;
        <h2 className="mb-3">Restat Register</h2>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
    
  );
};

export default Signup; 