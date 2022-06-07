import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { useSelector, useDispatch } from 'react-redux'
import { Button } from "react-bootstrap";
import { CDropdown } from '@coreui/react'
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

import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { logOut, user } = useUserAuth();
  const photoURL = user.photoURL;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
         
        
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <CNavItem>
          <div className="p-4 box mt-3 text-center">
              <img style={{borderRadius: '50%', height: '40px'}} src={ photoURL } referrerPolicy="no-referrer" title= {user.displayName}
                  
              />
          </div>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        {/* <AppBreadcrumb /> */}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
