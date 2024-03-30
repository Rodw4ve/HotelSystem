// Profile.js
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import CustomerProfile from './CustomerProfile';
import EmployeeProfile from './EmployeeProfile';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in.</p>;
  }

  return (
    <div>
      {user.username === 'Admin' ? <EmployeeProfile /> : <CustomerProfile />}
    </div>
  );
};

export default Profile;
