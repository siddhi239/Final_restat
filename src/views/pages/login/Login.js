import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "src/context/UserAuthContext";
import { getAuth } from "firebase/auth";
import './login.css';
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs, doc } from "firebase/firestore"
import CIcon from '@coreui/icons-react'
import { cilNewspaper } from '@coreui/icons'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn, sendPasswordResetEmail } = useUserAuth();
  let navigate = useNavigate();
  const usersCollectionRef = collection(firestore, "myprofile")
  //const docRef = collection(firestore, 'myprofile', doc(user.uid));
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if(email === "admin@gmail.com" && password === "admin123"){
        await logIn(email, password);
        navigate("/admin_dashboard")
      }else
      {
        await logIn(email, password);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();      
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <>
      <div className="p-4 box" width="50%">
        <div style={{display:'inline-flex'}}>
        &nbsp;&nbsp; 
      <CIcon style={{textAlign: 'left', padding:'2px',height: '50px', width: '50px'}} icon={cilNewspaper} customClassName="nav-icon" />
      &nbsp;&nbsp; &nbsp;&nbsp;
        <h2 className="mb-3"> Restat Login &nbsp;&nbsp; &nbsp;&nbsp;</h2>
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
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don&apos;t have an account? <Link to="/register">Sign up</Link>
      </div>
    </>
  );
};

export default Login;