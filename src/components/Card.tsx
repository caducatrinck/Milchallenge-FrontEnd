import {
  Card as MUICard,
  CardContent,
  createStyles,
  FormControl,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardStyle: {
      maxWidth: 360,
      minWidth: 360,
      maxHeight: 640,
      minHeight: 640,
      boxShadow: '12px 11px 25px -3px rgba(191,191,191,0.53)',
    },
    logo: {
      width: 160,
      paddingTop: 40,
      paddingBottom: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerLogo: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

export const Card: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <MUICard className={classes.cardStyle}>
      <CardContent>
        <div className={classes.centerLogo}>
          <img
            src="/medsenior.png"
            alt="logo"
            className={classes.logo}
          />
        </div>
        {children}
      </CardContent>
    </MUICard>
  );
};
