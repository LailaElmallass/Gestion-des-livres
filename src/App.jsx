import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './features/store';
import BooksList from './components/BooksList';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.css'
import AddEditForm from './components/AddEditForm';

function App() {
  return (
    <Provider store = {store}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<BooksList/>}/>
            <Route path='/AddEditForm' element={<AddEditForm/>}/>
            <Route path='/AddEditForm/:id' element={<AddEditForm/>}/>
          </Routes>
        </Router>
    </Provider>
  )
}

export default App

