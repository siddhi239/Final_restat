import React, { Component, useState, useEffect } from 'react'
import {AppFooter, AppHeader } from 'src/components/index'
import { AppSidebar } from 'src/components/index'
import Table from 'react-bootstrap/Table'
import { DataGrid } from '@mui/x-data-grid';
import { useUserAuth } from 'src/context/UserAuthContext';





const FetchData = () => {

  const [users, setUsers] = useState([]);

  const { user } = useUserAuth();
  const n = user.displayName;
   const q = "Nikhita Mangaonkar"

  const fetchData = () =>{
    const url = `https://serpapi.com/search.json?engine=google_scholar_profiles&mauthors=${q}&hl=en&api_key=452c8d62a3109b7126306267dc125e951050339de3b68057816fdd0893fbd2f9`;
    fetch(url)
        .then(response => {
        // console.log(res.data.organic_results[0])
        return response.json();
            
        }).then((data) => {
            console.log(data.profiles[0].name);
           
        })
        .catch(err => {
            console.log(err)
        })
        // .finally(() => {
        //     setLoading(false);
        //   });
}
  



  return (
      <div>
        <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <h2>DF Page</h2>
                    <button onClick={ fetchData }>Fetch data</button>

                    <AppFooter />
                </div>  
      </div>
   
  );
}

export default FetchData
