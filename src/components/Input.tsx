import {
  FilledInput,
  FormControl,
  InputLabel,
  makeStyles,
  Theme,
  createStyles,
  FilledInputProps,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    erro: {
      fontSize: 12,
      color: 'red',
      //paddingTop: 10,
    },
  })
);

interface Props {
  error?: string;
  touched?: boolean;
  onChange: FilledInputProps['onChange'];
  name: string;
  label: string;
  type: FilledInputProps['type'];
  disableVisibilityButton?: boolean;
}

export const Input: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const inputType =
    props.type === 'password'
      ? passwordVisible
        ? 'text'
        : 'password'
      : props.type;
  const shouldRenderVisibilityButton =
    !props.disableVisibilityButton && props.type === 'password';
  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl
        className={clsx(classes.padding, classes.textField)}
        variant="filled">
        <InputLabel
          className={clsx(classes.padding, classes.inputSquare)}
          htmlFor={props.name}>
          {props.label}
        </InputLabel>
        <FilledInput
          className={classes.textField}
          id={props.name}
          name={props.name}
          onChange={props.onChange}
          error={props.touched && Boolean(props.error)}
          type={inputType}
          endAdornment={
            shouldRenderVisibilityButton && (
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
            )
          }
        />
      </FormControl>
      {props.error ? (
        <div className={classes.erro}>{props.error}</div>
      ) : null}
    </>
  );
};
