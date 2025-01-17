import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link to="/" className="nav-link">Books List</Link>
        </li>
        
        <li className="nav-item">
          <Link to="/AddEditForm" className="nav-link">Add new Book</Link>
        </li>
        
        <li className="nav-item">
          <Link to="#" className="nav-link">Disabled</Link>
        </li>
      </ul>    
    </div>
  );
}

export default Navbar;
