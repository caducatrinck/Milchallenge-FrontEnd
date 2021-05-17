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
    enterButton: {
      backgroundColor: '#006631',
      color: 'white',
      width: 200,
      height: 45,
      paddingTop: 10,
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
      // paddingTop: 10,
    },
  })
);

export function CadastroCard() {
  let history = useHistory();
  const classes = useStyles();

  const { data, refetch } = useQuery(
    'login',
    async () => {
      const response = await fetch(
        'https://mil-challenge.herokuapp.com/login/cadastro',
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
    <Card>
      <Typography
        align="center"
        variant="h6"
        className={classes.heading}>
        Novo Registro
      </Typography>
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
          label="Senha"
          error={formik.errors.password}
          touched={formik.touched.password}
          type="password"
        />
        <Input
          name="anotherPassword"
          onChange={formik.handleChange}
          label="Confirmar Senha"
          error={formik.errors.anotherPassword}
          touched={formik.touched.anotherPassword}
          type="password"
          disableVisibilityButton
        />

        <div className={classes.centerButton}>
          <Button
            className={classes.enterButton}
            type="submit"
            variant="contained">
            REGISTRAR-SE
          </Button>
          {data && data.mensagem ? (
            <div className={classes.erro}>{data.mensagem}</div>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
