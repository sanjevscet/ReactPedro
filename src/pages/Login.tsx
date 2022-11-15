import React, { useState } from 'react';

import { fetchUserById, login, logout } from '../feature/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

const Login = () => {
  const [newUserName, setNewuserName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const { username, users, loading } = useSelector(
    (state: RootState) => state.user
  );

  console.log({ username, users, loading });
  const dispatch = useDispatch<AppDispatch>();

  const handleLoginClick = () => {
    dispatch(login({ username: newUserName }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const fetchUser = () => {
    dispatch(fetchUserById(+userId));
  };

  return (
    <>
      <h1>Thsis is Login Page</h1>
      <h2>Store Value: {username}</h2>
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
      <br />
      <br />
      <br />
      <br />

      <input
        type="text"
        value={userId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserId(e.target.value)
        }
      />

      <button onClick={fetchUser}>Get user</button>
    </>
  );
};

export default Login;
