import React, { Component, useState, useEffect } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { cilMagnifyingGlass } from '@coreui/icons';

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import './dashboard.css'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const [user, setUser] = useState([])
  const [pub_sum, setPubsum] = useState([])
  const [cite, setCite] = useState([])
  const [resr, setResr] = useState([])
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [s, setS] = useState("")

  const fetchData = () => {
  
    const url = `https://serpapi.com/search.json?engine=google_scholar&q=${s}&hl=en&num=20&api_key=452c8d62a3109b7126306267dc125e951050339de3b68057816fdd0893fbd2f9`;

    fetch(url)
      .then(response => {
        return response.json();

      }).then(data => {
         setUser(data.organic_results);
         console.log(data.organic_results);
        // setCite(data.organic_results.inline_links.cited_by);
        //setResr(data.organic_results.resources[0]);
      })
      .catch(err => {
         console.log(err)
      })
  }


  const fetchData2 = () => {
    const url2 = `https://serpapi.com/search.json?engine=google_scholar&q=${s}&hl=en&start=20&api_key=452c8d62a3109b7126306267dc125e951050339de3b68057816fdd0893fbd2f9`;
    
    fetch(url2)
    
      .then(response => {
        return response.json();

      }).then(data => {
         setUser(data.organic_results);
        setCite(data.organic_results.inline_links.cited_by);
        // console.log(data.organic_results.resources[0]);
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

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          {
            // <link rel="stylesheet" href="mysearch.css">
            <div className="p-4 box">
              <h2 className="mb-3" style={{padding:'10px'}}><b>Dashboard</b></h2>
              <div style={{padding:'10px'}}>
                <div className="form-outline" id="same-line">
                  <input type="search" id="search" className="form-control" placeholder="Search Article or Name here..." onChange={(e) => {setS(e.target.value)}} aria-label="Search" />
                  <button className="search-button" type="submit" id="submit" name="search-go" onClick={fetchData} >                      
                    <CIcon icon={cilMagnifyingGlass} customClassName="nav-icon" style={{ height: '25px', widht: '25px' }}/> 
                  </button>
                </div>
              </div>

              <div style={{padding:'10px'}} className="mainData">
              <h3 style={{padding:'10px'}}>{s}</h3>
                {user.map((item, index) =>
                    <div key={index}>
                    <p >
                    <hr/> 
                    <a href= {item.link}> <h5>{item.title}</h5></a>
                     <h6>{item.publication_info.summary}</h6>
                     <h7>{item.snippet}</h7><br/>
                     
                     {item.resources !== undefined ? <div>
                      {item.resources.map((d, index) => <div key={index}>
                          <p> 
                          &nbsp;<div style={{color:'blue'}}>[{d.file_format}] <a href= {d.link}>{d.title}</a></div>
                          </p>
                        </div>
                      )}
                    </div> : null}
                      
                    {item.inline_links.cited_by != undefined ? <div>
                      &nbsp;<b>Cited By: </b>{item.inline_links.cited_by.total}
                    </div> : null}

                     </p>
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
}

export default Dashboard
