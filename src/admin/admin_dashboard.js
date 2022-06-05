import React from 'react'
import {AppFooter, AppHeader } from 'src/components/index'
import { AppSidebarAdmin } from 'src/components/index'
import Table from 'react-bootstrap/Table'



const AdminDashboard = () => {

  

  
  return (
      <div>
        <AppSidebarAdmin />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <h2>Admin Page</h2>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Username</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td colSpan={2}>Larry the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </Table>

                    <AppFooter />
                </div>  
      </div>
   
  );
}

export default AdminDashboard
