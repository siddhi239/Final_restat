import React from 'react'
import { CFooter } from '@coreui/react'
import './footerstyle.css'

const AppFooter = () => {
  return (
    <CFooter style={{padding:'20px', textAlign:'center', paddingLeft:'240px'}}>
      <div className='main' >
        <span className="ms-1">
          <i>About Us:<br/>
          <u>ReStat</u> is Research Library Search platform for Researchers where we can view published papers and journals </i></span>
          
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
