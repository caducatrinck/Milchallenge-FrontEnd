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
import { useEstilos } from './Style/useEstilos';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useQuery } from 'react-query';

const registerSchema = Yup.object({
  email: Yup.string()
    .email('E-Mail inválido')
    .required('Digite o E-mail'),
  password: Yup.string()
    .required('Digite a senha')
    .min(6, 'A Senha deve ter no mínimo 6 digitos'),
  anotherPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Senhas não conferem')
    .required('Confirme a Senha'),
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
  })
);

export function CadastroCard() {
  let history = useHistory();
  const classes = useStyles();
  const estilo = useEstilos();

  const { data, refetch } = useQuery(
    'login',
    async () => {
      const response = await fetch(
        'http://mil-challenge.herokuapp.com/login/cadastro',
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
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  if (data && data.usuarioCriado) {
    history.push('/login');
  }

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      anotherPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: () => {
      refetch();
    },
  });

  return (
    <Card className={estilo.cardStyle}>
      <CardContent>
        <div className={estilo.centerLogo}>
          <img
            src="/medsenior.png"
            alt="logo"
            className={classes.logo}
          />
        </div>

        <Typography
          align="center"
          variant="h6"
          className={estilo.heading}>
          Novo Registro
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            className={clsx(classes.padding, classes.textField)}
            variant="filled">
            <InputLabel
              className={clsx(classes.padding, classes.inputSquare)}
              htmlFor="email">
              Email
            </InputLabel>
            <FilledInput
              className={classes.textField}
              id="email"
              name="email"
              onChange={formik.handleChange}
              error={
                formik.touched.email && Boolean(formik.errors.email)
              }
              type="email"
            />
          </FormControl>
          {formik.errors.email ? (
            <div className={estilo.erro}>{formik.errors.email}</div>
          ) : null}
          <FormControl
            className={clsx(classes.padding, classes.textField)}
            variant="filled">
            <InputLabel
              className={classes.padding}
              htmlFor="password">
              Senha
            </InputLabel>
            <FilledInput
              className={classes.textField}
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              error={
                formik.touched.password &&
                Boolean(formik.errors.password)
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {passwordVisible ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {formik.errors.password ? (
            <div className={estilo.erro}>
              {formik.errors.password}
            </div>
          ) : null}

          <div>
            <FormControl
              className={clsx(classes.padding, classes.textField)}
              variant="filled">
              <InputLabel
                className={classes.padding}
                htmlFor="filled-adornment-confirm-password">
                Confirmar Senha
              </InputLabel>
              <FilledInput
                className={classes.textField}
                id="anotherPassword"
                type={passwordVisible ? 'text' : 'password'}
                value={formik.values.anotherPassword}
                name="anotherPassword"
                onChange={formik.handleChange}
                error={
                  formik.touched.anotherPassword &&
                  Boolean(formik.errors.anotherPassword)
                }
              />
            </FormControl>
            {formik.errors.anotherPassword ? (
              <div className={estilo.erro}>
                {formik.errors.anotherPassword}
              </div>
            ) : null}
          </div>

          <div className={estilo.centerButton}>
            <Button
              className={classes.enterButton}
              type="submit"
              variant="contained">
              REGISTRAR-SE
            </Button>
            {data && data.mensagem ? (
              <div className={estilo.erro}>{data.mensagem}</div>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
