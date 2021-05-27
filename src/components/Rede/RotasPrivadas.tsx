import React from 'react';
import { useQuery } from 'react-query';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export const PrivateRoute: React.FC<RouteProps> = ({
  children,
  ...rest
}) => {
  const token = localStorage.getItem('token');
  const { data, error, isLoading } = useQuery(
    'authcheck',
    async () => {
      const response = await fetch(
        'https://login-catrinck.herokuapp.com/login/auth',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        status: response.status,
      };
    }
  );
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return <p>Loading</p>;
        }
        if (error) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }
        console.log(data);
        if (data && data.status === 401) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }
        return children;
      }}
    />
  );
};
