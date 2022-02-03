import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudentService from '../Services/StudentService';
function AddStudent() {
  const id1 = useParams().id;
  console.log(useParams().id);
  const initialStudentState = {
    id: "",
    name: "",
    address: "",
    age: "",
    gender: ""
  };
  const [headingVariable, setHeadingVariable] = useState("Add Student");
  const [student, setStudent] = useState(initialStudentState);
  const updateData = async () => {
    StudentService.put(id1)
      .then(response => (setId(response.data.obj.id),
        setName(response.data.obj.name),
        setAddress(response.data.obj.address),
        setAge(response.data.obj.age),
        document.getElementById(`${response.data.obj.gender}`).checked = true)
      );
  }
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [id, setId] = useState('');
  useEffect(() => {
    if (id1 != null) {
      updateData();
      setHeadingVariable("Edit Student");
    }}, []);
  const saveStudent = (e) => {
    e.preventDefault();
    const student = { id, name, address, age, gender };
    StudentService.create(student)
      .then(response => { alert(response.data.message); },)
  }
  return <>
    <div className='container'>
      <h2 style={{ 'margin-top': '100px', 'text-align': 'center', 'margin-bottom': '-72px' }}>{headingVariable}</h2>
      <form style={{ margin: '100px' }}>
        <div>
          <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" name="name" value={name || ''} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="address" value={address || ''} onChange={(e) => setAddress(e.target.value)} ></textarea>
        </div>
        <div>
          <label htmlFor="exampleFormControlInput2" className="form-label">Age</label>
          <input type="number" className="form-control" id="exampleFormControlInput2" name="age" value={age || ''} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label htmlFor="exampleFormControlInput2" className="form-label">Gender : </label>
          <input className="form-check-input" type="radio" name="gender" id="Male" value={'Male'} onChange={(e) => setGender(e.target.value)} />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Male
          </label>
          <input className="form-check-input" type="radio" name="gender" id="Female" value={'Female'} onChange={(e) => setGender(e.target.value)} />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Female
          </label>
          <div >
            <button onClick={(e) => saveStudent(e)} className="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  </>;
}

export default AddStudent;
