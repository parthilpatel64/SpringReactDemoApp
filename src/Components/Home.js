import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AddStudent from './AddStudent';
import StudentService from '../Services/StudentService';

function Home() {

  const [data, setData] = useState([]);
  const [object, setObject] = useState([]);
  const [parseData, setParseData] = useState([]);

  const context = useContext(NoteContext)
  useEffect(() => {
    viewData();
  }, [])

  const viewData = async () => {
    StudentService.getAll()
      .then(response => setData(response.data.list));
  }

  const deleteData = async (id) => {
    StudentService.remove(id)
      .then(response => {
        alert(response.data.message);
      })
  }
  
  return (
    <>
      <div className='container-my-3'>
        <h1 style={{ margin: '100px' }}>This is Home page and Name is {context.state.name} and age is {context.state.age}</h1>
      </div>
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
      <h2><Link to="/addStudent">Add Student</Link></h2>
      <table style={{ border: '2px solid black' }}>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Address</th>
          <th>gender</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {data.map(item => {
          return <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.gender}</td>
            <td><Link to={`/editStudent/${item.id}`}>edit</Link></td>
            <td><Link to="/deleteStudent" onClick={() => { deleteData(item.id) }}>delete</Link></td>
          </tr>
        })}
      </table>
    </>
  )
}

export default Home
