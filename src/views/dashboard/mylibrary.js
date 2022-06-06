import React, { Component, useState, useEffect } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router";
import { cilMagnifyingGlass } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { useUserAuth } from "F:/restat_sem3_proj_final/Final_restat/src/context/UserAuthContext";
import './mysearch.css'


const Mylibrary= () =>{
    const [user, setUser] = useState([])
    const [pub_sum, setPubsum] = useState([])
    const [cite, setCite] = useState([])
    const [resr, setResr] = useState([])
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [s, setS] = useState("")
    // const { usr } = useUserAuth();
    // const photoURL = usr.photoURL;
    const fetchData = () => {
    
      const url = `https://serpapi.com/search.json?engine=google_scholar&q=${s}&hl=en&num=20&api_key=f27584dfd4f6b31ffcf33b293880c7b88ff0404c27db802c2ad64fe38fed5f1e`;
  
      const page=()=>{
        const url2 = `https://serpapi.com/search.json?engine=google_scholar&q=${s}&hl=en&start=20&api_key=f27584dfd4f6b31ffcf33b293880c7b88ff0404c27db802c2ad64fe38fed5f1e`;
      }
      fetch(url)
        .then(response => {
          return response.json();
  
        }).then(data => {
           setUser(data.organic_results);
          // setCite(data.organic_results.inline_links.cited_by);
          setResr(data.organic_results.resources[0]);
        })
        .catch(err => {
           console.log(err)
        })
    }
  
  
    const fetchData2 = () => {
      const url2 = `https://serpapi.com/search.json?engine=google_scholar&q=${s}&hl=en&start=20&api_key=f27584dfd4f6b31ffcf33b293880c7b88ff0404c27db802c2ad64fe38fed5f1e`;
      
      fetch(url2)
        .then(response => {
          return response.json();
  
        }).then(data => {
           setUser(data.organic_results);
          // setCite(data.organic_results.inline_links.cited_by);
          setResr(data.organic_results.resources[0]);
        })
        .catch(err => {
           console.log(err)
        })
    }
    // useEffect(() => {
    //   setLoading(true);
    //   fetchData()
    // })
  
   

return(
    <>
        <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          {
            // <link rel="stylesheet" href="mysearch.css">
            <div className="p-4 box" >
              <h2 className="mb-3" style={{padding:'10px'}}><b>Library</b></h2>
              <div style={{padding:'10px'}}>
             
   
          {/* <div className="p-4 box mt-3 text-center">
              <img style={{borderRadius: '50%', height: '40px'}} src={ photoURL } referrerPolicy="no-referrer" title= {user.displayName}
                  
              />
          </div> */}
          {/* <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleLogout}>
              Log out
            </Button>
          </div> */}
            {/* <CNavLink href="/login">Sign in/ Register</CNavLink> */}
           
                <div className="form-outline" id="same-line">
                  <input type="search" id="search" className="form-control" placeholder="Search Article or Name here..." onChange={(e) => {setS(e.target.value)}} aria-label="Search" />
                  <button className="search-button" type="submit" id="submit" name="search-go" onClick={fetchData}>                      
                    <CIcon icon={cilMagnifyingGlass} customClassName="nav-icon" style={{ height: '25px', widht: '25px' }}/> 
                  </button>
                  <h3>{s}</h3>
                </div>
              </div>
            <div>
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
                </div>
                  
                <button className="next-button" type="submit" id="submit" name="next" onClick={fetchData2}>Next...</button>
            </div>
          }

          <AppFooter />
        </div>
      </div>
    </>
)
};

export default Mylibrary;