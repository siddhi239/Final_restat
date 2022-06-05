import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilMoodGood,
  cilBarcode,
  cilStar,
  cilPeople,
  cilSettings,
  cilAccountLogout,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _navAdmin = [
  {
    component: CNavItem,
    name: 'Admin Dashboard',
    to: '/admin_dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'All Users',
    to: '/allUsers',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
//   {
//     component: CNavItem,
//     name: 'Settings',
//     //to: ,
//     icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
//     badge: {
//       color: 'info',
//     },
//   },
  {
    component: CNavItem,
    name: 'Log Out',
    to: '/login',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
]
export default _navAdmin
