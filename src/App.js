import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
  
} from "react-router-dom";
import { useContext } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Contexts/noteState';
import AddStudent from './Components/AddStudent';
import NoteContext from './Contexts/noteContext';


function App(){
 
  
 
  
    return (
      <>
     
       <NoteState>
       <Router>
       
         
          <Navbar/> 
          
         <Routes>
           <Route exact path='/Home'  element={<Home/>}></Route>
           <Route exact path='/editStudent/:id' element={<AddStudent />}></Route>
           <Route exact path='/addStudent'  element={<AddStudent  />}></Route>
          
           <Route exact path='/deleteStudent' element={<Home/>}></Route>
         </Routes>
        
       </Router>
       
       </NoteState>
     
       </>
        
      
     
    )
  
}

export default App;

