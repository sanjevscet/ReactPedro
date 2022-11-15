import React, { useState } from 'react';

import { login, logout } from '../feature/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

const Login = () => {
  const [newUserName, setNewuserName] = useState<string>('');

  const userName = useSelector((state: RootState) => state.user.value.username);

  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(login({ username: newUserName }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <h1>Thsis is Login Page</h1>
      <h2>Store Value: {userName}</h2>
      <h3>Store Value: {newUserName}</h3>
      <input
        type="text"
        value={newUserName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewuserName(e.target.value)
        }
      />
      <button onClick={handleLoginClick}>Submit Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Login;
