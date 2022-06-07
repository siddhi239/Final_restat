import React, { Component, useState, useEffect } from 'react'

import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import Table from 'react-bootstrap/Table'
import { DataGrid } from '@mui/x-data-grid';
import { useUserAuth } from 'src/context/UserAuthContext'
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs, setDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"


const Libraryapi = () => {

  const { user } = useUserAuth();
  const uid = user.uid
  const n = user.displayName
  // console.log(user.displayName);
  const usersCollectionRef = collection(firestore, "myprofile")
  const [users, setUsers] = useState([]);
  const [papers, setPapers] = useState([]);
  const [profile, setProfile] = useState([]);
  const [citedBy, setCitedBy] = useState([]);
  const [authid, setAuthid] = useState(" ");
  const [totalc, setTotalc] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [u, setU] = useState(" ");
  var totalPapers = 0;

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      // setU(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
    }

    getUsers();
  }, []);


  useEffect(() => {

    users.map(item => {
      if (user.uid === item.id) {
        setAuthid(item.AuthorID);
      }
      console.log(user.uid);
      console.log(authid);
    }
    )
  }, []);

  useEffect(() => {
    setLoading(true);
    if (authid !== " ") {
      Fetchpapers()
    }
  }, [authid])

  const Fetchpapers = () => {

    console.log(authid);

    const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${authid}&hl=en&api_key=452c8d62a3109b7126306267dc125e951050339de3b68057816fdd0893fbd2f9`;
    console.log(url);
    fetch(url)
      .then(response => {
        return response.json();

      }).then(data => {
        console.log(data);
        setPapers(data.articles);
        setProfile(data.author);
        setCitedBy(data.cited_by.graph)
        //  console.log(papers);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      });

  }



  const countOfPapers = async () => {

    await setDoc(doc(firestore, "Total Paper per User", uid),
      {
        Name: n,
        Count: totalPapers
      })
  }

  const graphData = async () => {

    await setDoc(doc(firestore, "Graph Data", uid),
      {
        2018: citedBy[0].citations,
        2019: citedBy[1].citations,
        2020: citedBy[2].citations,
        2021: citedBy[3].citations,
        2022: citedBy[4].citations,
      })
  }




  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />

        <div style={{ display: 'inline-block', padding: '20px' }}>
          <div>
            <img style={{ borderRadius: '50%', height: '40px', width: '40px' }} src={user.photoURL} referrerPolicy="no-referrer" />

            <div style={{ padding: '20px ' }}>
              <h4>{profile.name}</h4>
              <h6>{profile.affiliations}</h6>
              <h6>{profile.email}</h6><br />
            </div>

            <div style={{ float: 'right' }}>
              {
                citedBy.map((i, index) =>
                  <div key={index}>
                    <hr />
                    <p onClick={graphData}>Graph Data</p>
                    <table>
                      <tr>
                        <thead>Year</thead>
                        <thead>Citations</thead>
                      </tr>
                      <tr>
                        <td>{i.year}</td>
                        <td>{i.citations}</td>
                      </tr>
                    </table>
                  </div>
                )
              }
            </div>



          </div>


          {
            papers.map((item, index) =>
              <div key={index}>
                {console.log(totalPapers = totalPapers + 1)}
                <hr />
                <a href={item.link}> <h5>{item.title}</h5></a>
                <h6>Authors: {item.authors}</h6>
                <h6>Publication: {item.publication}</h6>
                {item.cited_by !== undefined ? <div>
                  <h6>Cited By: {item.cited_by.value}</h6>
                </div> : null}
                <h6>Year: {item.year}</h6>

              </div>
            )
          }
          <p onClick={countOfPapers}>All Papers</p>





        </div>

        <AppFooter />
      </div>
    </div>


  );
}

export default Libraryapi