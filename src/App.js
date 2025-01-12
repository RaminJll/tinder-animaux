import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrivateRoute from './Components/PrivateRoute';
import EntityPage from './Components/entityPage';

//route pour les users
import UserPage from './Components/users/Userpage';
import Login from './Components/users/Login';
import Register from './Components/users/Register';
import UserHome from './Components/users/home';

//route pour les organizations
import OrganizationPage from './Components/organizations/OrganizationPage';
import OrganizationRegister from './Components/organizations/Register';
import OrganizationLogin from './Components/organizations/Login';
import OrganizationHome from './Components/organizations/home';
import OrganizationAddAnimal from './Components/organizations/addAnimal';



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<EntityPage />} />

        {/* Route concernant les utilisateurs */} 
        <Route path="/userPage" element={<UserPage />} />
        <Route path="/userRegister" element={<Register />} />
        <Route path="/userLogin" element={<Login />} />

        {/* Route concernant les organisations */}
        <Route path="/organizationPage" element={<OrganizationPage />} />
        <Route path="/organizationRegister" element={<OrganizationRegister />} />
        <Route path="/organizationLogin" element={<OrganizationLogin />} />
        
        {/* Route protégé */}
        <Route path="/organizationHome" element={<PrivateRoute component={OrganizationHome} />} />
        <Route path="/organizationAddAnimal" element={<PrivateRoute component={OrganizationAddAnimal} />} />
        <Route path="/userHome" element={<PrivateRoute component={UserHome} />} />
      </Routes>
    </Router>
  );
}

export default App;
