import React from 'react'
import {AppFooter, AppHeader } from 'src/components/index'
import { AppSidebarAdmin } from 'src/components/index'
import Table from 'react-bootstrap/Table'
import { DataGrid } from '@mui/x-data-grid';




const AdminDashboard = () => {

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'displayName', headerName: 'Name', width: 130 },
    { field: 'affiliation', headerName: 'Affiliation', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      width: 290,
    },
    {
      field: 'aoi',
      headerName: 'Area of Interest',
      //type: 'number',
      width: 190,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      //description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  ];
  
  

  
  return (
      <div>
        <AppSidebarAdmin />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <h2>Admin Page</h2>
                    {/* <Table striped bordered hover>
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
                    </Table> */}

                    <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                    />

                    <AppFooter />
                </div>  
      </div>
   
  );
}

export default AdminDashboard
