import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">
          
          <i>About Us:</i><br/>
          <i>ReStat</i> is Research Library Search platform for Researchers where we can view published papers and journals </span>
          <br/>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
