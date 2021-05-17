import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  createStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { Input } from './Input';
import { Card } from './Card';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('E-Mail inválido')
    .required('Digite o E-mail'),
  password: Yup.string().min(
    6,
    'A Senha deve ter no mínimo 6 digitos'
  ),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    enterButton: {
      backgroundColor: '#006631',
      color: 'white',
      width: 200,
      height: 45,
      paddingTop: 10,
    },
    registerButton: {
      '&:hover': {
        background: 'none',
      },
      color: '#219653',
      fontWeight: 'normal',
      textTransform: 'none',
      fontSize: 12,
    },
    alignRegister: {
      display: 'flex',
      alignItems: 'baseline',
      color: '#9b9b9b',
    },
    heading: {
      color: '#219653',
      paddingBottom: 10,
    },
    centerButton: {
      paddingTop: '50px',
      paddingBottom: '100px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
    erro: {
      fontSize: 12,
      color: 'red',
      paddingTop: 10,
    },
    sucess: {
      fontSize: 12,
      color: 'green',
      paddingTop: 10,
    },
  })
);

export function LoginCard() {
  let history = useHistory();
  const classes = useStyles();

  const { data, refetch } = useQuery(
    'login',
    async () => {
      const response = await fetch(
        'https://mil-challenge.herokuapp.com/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formik.values.email,
            senha: formik.values.password,
          }),
        }
      );
      const credentials = await response.json();

      if (credentials.token) {
        localStorage.setItem('token', credentials.token);
        history.push('/home');
      }
      return credentials;
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  function onClickRegister() {
    history.push('/cadastro');
  }
  function onSubmit() {
    refetch();
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <Typography
          align="center"
          variant="h6"
          className={classes.heading}>
          Entrar
        </Typography>
        <Input
          name="email"
          onChange={formik.handleChange}
          label="Email"
          error={formik.errors.email}
          touched={formik.touched.email}
          type="email"
        />
        <Input
          name="password"
          onChange={formik.handleChange}
          label="Password"
          error={formik.errors.password}
          touched={formik.touched.password}
          type="password"
        />

        <div className={classes.alignRegister}>
          <Typography align="center" variant="caption">
            Não possui conta ainda?
          </Typography>

          <Button
            onClick={onClickRegister}
            className={classes.registerButton}>
            Registre-se Aqui
          </Button>
        </div>

        <div className={classes.centerButton}>
          <Button
            className={classes.enterButton}
            type="submit"
            variant="contained">
            Entrar
          </Button>
          {data && data.mensagem ? (
            <div
              className={data.sucess ? classes.sucess : classes.erro}>
              {data.mensagem}
            </div>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
