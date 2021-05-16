import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from '@material-ui/core';
import { Rotas } from './components/Rede/Rotas';

function App() {
  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}>
        <Grid item>
          <Rotas />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
