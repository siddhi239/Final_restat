import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserAuthContextProvider } from './context/UserAuthContext'
import ProtectedRoute from './context/ProtectedRoute'
import ProtectedRoutesAdmin from './context/ProtectedRoutesAdmin'
import './scss/style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
//const Login = React.lazy(() => import('./views/pages/register/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Logout = React.lazy(() => import('./views/pages/logout'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Myprofile = React.lazy(() => import('./views/dashboard/myprofile'))
const Mylibrary = React.lazy(() => import('./views/dashboard/mylibrary'))
const Newfile = React.lazy(() => import('./views/dashboard/newfile'))
const Updateprofile = React.lazy(() => import('./views/dashboard/updateprofile'))
const AdminDashboard = React.lazy(() => import('./admin/admin_dashboard'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <UserAuthContextProvider>
            <Routes>
            <Route exact path="*" name="Login Page" element={<Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route path="/home" name="Home" element={<ProtectedRoute> <DefaultLayout /> </ProtectedRoute>} />
              <Route path="/myprofile" name="My Profile" element={<ProtectedRoute> <Myprofile /> </ProtectedRoute>} />
              <Route path="/updateprofile" name="Update Profile" element={<ProtectedRoute> <Updateprofile /> </ProtectedRoute>} />
              <Route path="/mylibrary" name="My Library" element={<ProtectedRoute> <Mylibrary /> </ProtectedRoute>} />
              <Route exact path="/admin_dashboard" name="Admin Page" element={<AdminDashboard />} />
            </Routes>
          </UserAuthContextProvider>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
