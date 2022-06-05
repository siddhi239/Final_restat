<<<<<<< HEAD
import React from 'react'
=======
import React, { Component, useState, useEffect } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { cilMagnifyingGlass } from '@coreui/icons';
>>>>>>> d45a403718506d2a1d81a7f61a39d8b83a4dbe83

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
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  return (
    <>
     <div>{ tableExample }</div>

     
const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

const Dashboard = () => {
  const [user, setUser] = useState([])
  const [pub_sum, setPubsum] = useState([])
  const [cite, setCite] = useState([])
  const [resr, setResr] = useState([])
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [s, setS] = useState("")




  
  


  const fetchData = () => {
    const params = {
      q: s
    };

    const url = `https://serpapi.com/search.json?engine=google_scholar&q=${params.q}&hl=en&api_key=f27584dfd4f6b31ffcf33b293880c7b88ff0404c27db802c2ad64fe38fed5f1e`;

    // const urlfinal=()=>{
    //   finurl=url;
    // }
    fetch(url)
      .then(response => {
        // console.log(res.data.organic_results[0])
        return response.json();

      }).then(data => {
        // var x = 0;
        // let val = data.organic_results
        // var a = val.length

        setUser(data.organic_results);
    

        // console.log(arr)
        // var x=0;
        // let sum = data.organic_results[x].publication_info
        // incrementCount(x);
        // let reso = data.organic_results[0].resources[0]
        // console.log(sum)
        // console.log(val)

        // setResr(reso)

        // setUser(newResource)
      })
      .catch(err => {
         console.log(err)
      })
      // .finally(() => {
      //   setLoading(false);
      // });
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
              <h2 className="mb-3">Library</h2>
              <div>
                <div className="form-outline">
                  <input type="search" id="search" className="form-control" placeholder="Search Article or Name here..." onChange={(e) => {setS(e.target.value)}} aria-label="Search" data-search>

                  </input>
                  <button className="search-button" type="submit" id="submit" name="search-go" onClick={fetchData}
                  >
                                              
                    {/* <CIcon icon={cilMagnifyingGlass} customClassName="nav-icon" style={{ height: '25px', widht: '25px' }} /> */}
                  Go!
                  </button>
                  <h2>{s}</h2>
                </div>
              </div>


              <div className='usercards' data-user-cards-container></div>

              <template datausertemplate>
                <div className='card'>
                  <div className='header' data-header></div>
                  <div className='body' data-body></div>
                </div>
              </template>

              {/* <h2>Title:</h2>{user.title} <br/>
                            <b> Snippet:</b>{user.snippet} <br/>
                            <b>Resource Title:</b> {resr.title}   <br/>  
                            <b>Resource Link: </b>{resr.link}<br/>  */}

              {/* <div className="clearfix">
                                <div className="row">
                                  {
                                  
                                  user.map(u => (
                                    <div className="col-md-4 animated fadeIn" key={u.organic_results.position.value}>
                                      <div className="card">
                                        <div className="card-body">
                                          <div className="avatar">
                                            <img
                                              src={data.picture.large}
                                              className="card-img-top"
                                              alt=""
                                            />
                                          </div>
                                          <h5 className="card-title">
                                            {u.title +
                                              " " +
                                              u.snippet}
                                          </h5>
                                          <p className="card-text">
                                            {data.resr.title +
                                              ", " +
                                              data.resr.link}
                                            <br /> 
                                            <span className="phone">{data.phone}</span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div> */}
              {/* <div>
                                {user.map(u =>(
                                  <li key={u.id}>
                                    {u.id}
                                  </li>
                                ))}
                                </div> */}
              <div>
                {user.map((item, index) => <div key={index}>
                  <p>{item.title}</p>
                  <p>{item.resources[0].title}</p>
                </div>)}
             
              </div>
            </div>
          }

          <AppFooter />
        </div>
      </div>

    </>
  )
}

export default Dashboard
