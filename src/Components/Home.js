import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import $ from "jquery";
import AddStudent from './AddStudent';
import StudentService from '../Services/StudentService';

function Home() {

  const [data, setData] = useState([]);
  const [object, setObject] = useState([]);
  const [parseData, setParseData] = useState([]);

  useEffect(() => {
    $("#messagedivclass").hide();
    viewData();
  }, [])

  const viewData = async () => {
    StudentService.getAll()
      .then(response => setData(response.data.list));
  }

  const deleteData = async (id) => {
    StudentService.remove(id)
    .then(response => { $("#messagedivclass").show().delay(3000).fadeOut(); $("#messagedivclass").html(response.data.message).delay(3000).fadeOut();window.location.reload()},)
  }
  
  return (
    <>
      
      <style>
        {`
                table {
                      font-family: arial, sans-serif;
                      border-collapse: collapse;
                      width: 100%;
                }
                td, th {
                      border: 1px solid #dddddd;
                      text-align: left;
                      padding: 8px;
                }
                tr:nth-child(even) {
                     background-color: #dddddd;
                }
  
            `}
      </style>
      <div class="alert alert-success alert-dismissible fade show" role="alert" style={{ 'margin-top': '80px', 'text-align': 'center', 'margin-bottom': '-72px' }} id="messagedivclass">
    <button type="button" class="btn-close" data-bs-dismiss="alert" style={{ 'margin-top': '80px', 'text-align': 'center', 'margin-bottom': '-72px' }} aria-label="Close"></button>
		  </div>
      <h2 style={{marginTop :'92px'}}><button type="button" class="btn btn-primary" ><Link to="/addStudent" style={{color:"black"}}>Add Student</Link></button></h2>
      <table style={{ border: '2px solid black' }}>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Address</th>
          <th>Age</th>
          <th>gender</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {data.map(item => {
          return <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.age}</td>
            <td>{item.gender}</td>
            <td><button type="button" class="btn btn-primary"><Link to={`/editStudent/${item.id}`} style={{color:"black"}}>edit</Link></button></td>
            <td><button type="button" class="btn btn-danger"><Link to="/deleteStudent" onClick={() => { if(window.confirm('Delete the Student?')) {deleteData(item.id);} }} style={{color:"black"}}>delete</Link></button></td>
          </tr>
        })}
      </table>
      
    </>
  )
}

export default Home
