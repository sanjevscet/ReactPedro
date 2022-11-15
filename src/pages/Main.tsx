import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Main = () => {
  const userName = useSelector((state: RootState) => state.user.value.username);

  return <div>Home Page {userName}</div>;
};

export default Main;
