import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "src/context/UserAuthContext";
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs } from "firebase/firestore"

export function CreateUserDoc() {

    const usersCollectionRef = collection(firestore, "myprofile")

    const { user } = useUserAuth();
    const id = user.uid;
    const n = user.displayName;
    const e = user.email;
    addDoc(usersCollectionRef, { Name: n, Affiliation: " ", Email: e, AOI: " ", UID: id})

}

