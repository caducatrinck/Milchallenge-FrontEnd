import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
  Button,
  createStyles,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Theme,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';
import { Input } from './Input';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('E-Mail inválido')
    .required('Digite o E-mail'),
  password: Yup.string()
    .required('Digite a senha')
    .min(6, 'A Senha deve ter no mínimo 6 digitos'),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: 160,
      paddingTop: 40,
      paddingBottom: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    padding: {
      paddingBottom: 11,
      paddingTop: 11,
    },

    textField: {
      width: '100%',
      color: 'black',
      borderRadius: '0px',
      '&&&:before': {
        borderBottom: 'none',
      },
      '&&:after': {
        borderBottom: 'none',
      },
    },
    inputSquare: {
      borderRadius: '0',
    },
    textColor: {
      color: 'black',
    },
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
    cardStyle: {
      maxWidth: 360,
      minWidth: 360,
      maxHeight: 640,
      minHeight: 640,

      boxShadow: '12px 11px 25px -3px rgba(191,191,191,0.53)',
    },
    heading: {
      color: '#219653',
      paddingBottom: 10,
    },
    centerLogo: {
      display: 'flex',
      justifyContent: 'center',
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
      //paddingTop: 10,
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

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  function ClickRegister() {
    history.push('/cadastro');
  }
  function ClickEnter() {
    refetch();
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      ClickEnter();
    },
  });

  return (
    <Card className={classes.cardStyle}>
      <CardContent>
        <div className={classes.centerLogo}>
          <img
            src="/medsenior.png"
            alt="logo"
            className={classes.logo}
          />
        </div>

        <form onSubmit={formik.handleSubmit}>
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
              onClick={ClickRegister}
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
              <div className={classes.erro}>{data.mensagem}</div>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
