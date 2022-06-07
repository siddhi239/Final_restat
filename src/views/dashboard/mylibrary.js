import React, { Component, useState, useEffect } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router";
import { cilMagnifyingGlass } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import { useUserAuth } from "../../context/UserAuthContext"
import './mysearch.css'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore"


const Mylibrary= () =>{
  
    //const [users, setUsers] = useState([])  
    const [user, setUser] = useState([])
    const [cite, setCite] = useState([])
    const [resr, setResr] = useState([])
    const [loading, setLoading] = useState(false);
    const [s, setS] = useState("")
    //const usersCollectionRef = collection(firestore, "myprofile")
    // const { usr } = useUserAuth();
    // const id = usr.uid
    // console.log(id)
    //const aID = " ";
  //   const {authuser} = useUserAuth();
  // const photoURL = authuser.photoURL;
  //   console.log(authuser.displayName);
    

  
    const fetchData = (  ) => {
    
      const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=HIjPgboAAAAJ&hl=en&api_key=452c8d62a3109b7126306267dc125e951050339de3b68057816fdd0893fbd2f9`;
  
      fetch(url)
        .then(response => {
          return response.json();
  
        }).then(data => {
           setUser(data.articles);
          // setCite(data.organic_results.inline_links.cited_by);
          //setResr(data.organic_results.resources[0]);
        })
        .catch(err => {
           console.log(err)
        })
    }
  
  
    const fetchData2 = (  ) => {
      const url2 = `https://serpapi.com/search.json?engine=google_scholar&q=${s}&hl=en&start=20&api_key=f27584dfd4f6b31ffcf33b293880c7b88ff0404c27db802c2ad64fe38fed5f1e`;
      
      fetch(url2)
        .then(response => {
          return response.json();
  
        }).then(data => {
           setUser(data.articles);

        })
        .catch(err => {
           console.log(err)
        })
    }

    useEffect(() => {
      //setLoading(true);
      fetchData()
    })
  
   

return(
    <>
        <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          {
            <div className="p-4 box" >
              <h2 className="mb-3" style={{padding:'10px'}}><b>Library</b></h2>
              {/* <div className="p-4 box mt-3 text-center">
              <img style={{borderRadius: '50%', height: '40px'}} src={ photoURL } referrerPolicy="no-referrer" title= {authuser.displayName}
                  
              />
          </div> */}


              {/* <CChart
                type="bar"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'GitHub Commits',
                      backgroundColor: '#f87979',
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    },
                  ],
                }}
                labels="months"
              /> */}
              <div style={{padding:'10px'}}>
          
           
                <div className="form-outline" id="same-line">
                  <input type="search" id="search" className="form-control" placeholder="Search Article or Name here..." onChange={(e) => {setS(e.target.value)}} aria-label="Search" />
                  <button className="search-button" type="submit" id="submit" name="search-go" onClick={fetchData}>                      
                    <CIcon icon={cilMagnifyingGlass} customClassName="nav-icon" style={{ height: '25px', widht: '25px' }}/> 
                  </button>
                  <h3>{s}</h3>
                </div>
              </div>

              <div style={{padding:'10px'}}>
                {user.map((item, index) =>

                    <div key={index}>
                    <div style={{padding:'10px'}}> 
                    <a href= {item.link}> <h5>{item.title}</h5></a>
                     <h6>{item.authors}</h6>
                     Year: {item.year}<br/>
                     {item.publication}<br/><br/>
                     </div>
                
                   </div>
                 
                )}
             
              </div>

            {/* <div>
              <div style={{padding:'10px'}}>
                {user.map((item, index) =>

                    <div key={index}>
                    <p style={{padding:'10px'}}> 
                    <a href= {item.link}> <h5>{item.title}</h5></a>
                     <h6>{item.publication_info.summary}</h6>
                     <h7>{item.snippet}</h7><br/><br/>
                     </p>
                
                   </div>
                 
                )}
             
              </div>
            </div>
              <div>
                {resr.map((item, index) => <div key={index}>
                    <p> 
                      {item.title}          
                     {item.link}
                     </p>
                   </div>
                 
                )}
             
              </div>
              <div>
              {cite.map((i,index)=> <div key={index}>
                    <p>{i.cites_id}</p>
                    </div>
                    )}
                </div> */}

                {/* <div>
                  {users.map((u) => {
                    if(usr.uid){
                      aID = u.AuthorID
                      (
                        <div>{aID}</div>
                      )
                      
                      //fetchData(aID)
                    }
                  })}
                </div> */}
                  
                <button className="next-button" type="submit" id="submit" name="next" onClick={fetchData2}>Next...</button>
                {/* <button className="next-button" type="submit" id="submit" name="next" onClick={() => navigate("/fetchapi")}>Next...</button> */}
            </div>
          }

          <AppFooter />
        </div>
      </div>
    </>
)
};

export default Mylibrary;