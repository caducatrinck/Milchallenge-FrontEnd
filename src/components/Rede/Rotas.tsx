import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CadastroCard } from '../CadastroCard';
import { CardHome } from '../CardHome';
import { LoginCard } from '../LoginCard';
import { PrivateRoute } from './RotasPrivadas';

export function Rotas() {
  return (
    <Switch>
      <Route exact={true} path="/login">
        <LoginCard />
      </Route>
      <Route path="/cadastro">
        <CadastroCard />
      </Route>
      <PrivateRoute path="/home">
        <CardHome />
      </PrivateRoute>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}
