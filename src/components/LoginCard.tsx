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
    })
);

export function LoginCard() {
    let history = useHistory();
    const classes = useStyles();
    const estilo = useEstilos();

    const { data, refetch } = useQuery(
        'login',
        async () => {
            const response = await fetch('http://mil-challenge.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formik.values.email,
                    senha: formik.values.password,
                }),
            });
            const credentials = await response.json();
            if (credentials.token) {
                localStorage.setItem('token', credentials.token);
                history.push("/home")
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
        <Card className={estilo.cardStyle}>
            <CardContent>
                <div className={estilo.centerLogo}>
                    <img
                        src="/medsenior.png"
                        alt="logo"
                        className={classes.logo}
                    />
                </div>

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

                    <div className={classes.alignRegister}>
                        <Typography align="center" variant="caption">
                            Não possui conta ainda?
            </Typography>

                        <Button
                            onClick={ClickRegister}
                            className={clsx(classes.registerButton)}>
                            Registre-se Aqui
            </Button>
                    </div>

                    <div className={estilo.centerButton}>
                        <Button
                            className={classes.enterButton}
                            type="submit"
                            variant="contained">
                            Entrar
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
