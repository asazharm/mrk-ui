import React from 'react';
import { Navigate } from 'react-router-dom';
import { IUser } from '../../store/api/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const token = localStorage.getItem('token');

  // const { user } = useSelector((state: RootState) => state.userState);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
