import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
  Button,
  createStyles,
  FormControl,
  Theme,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useEstilos } from './Style/useEstilos';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: 160,
      paddingTop: 15,
      paddingBottom: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    subHeading: {
      color: '#616161',
      textTransform: 'none',
      paddingBottom: 10,
    },
    description: {
      lineHeight: 1.9,
      minHeight: '250px',
      maxHeight: '250px',
      color: '#616161',
    },
    ipShow: {
      textTransform: 'none',
      fontSize: 12,
      lineHeight: 1.9,
      color: '#e1e1e1',
    },
    padding: {
      paddingBottom: 11,
      paddingTop: 11,
      paddingLeft: 30,
      paddingRight: 30,
    },
    loggoutButton: {
      '&:hover': {
        background: 'none',
      },
      color: '#EB5757',
      fontSize: '15px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    centerFooter: {
      display: 'flex',
      alignItems: 'baseline',
      paddingTop: '110px',
      justifyContent: 'space-between',
    },
  })
);

export function CardHome() {
  let history = useHistory();
  const classes = useStyles();
  const estilo = useEstilos();

  function ClickLogoff() {
    localStorage.removeItem('token');
    history.push('/');
  }

  return (
    <Card className={estilo.cardStyle}>
      <CardContent>
        <FormControl className={classes.padding} variant="filled">
          <div className={estilo.centerLogo}>
            <img
              src="/medsenior.png"
              alt="logo"
              className={classes.logo}
            />
          </div>
          <Typography variant="h6" className={estilo.heading}>
            Bem Vindo!
          </Typography>

          <Typography className={classes.subHeading}>
            Agora você é um filiado!
          </Typography>

          <Typography
            className={classes.description}
            variant="caption">
            An vis noster integre. Ius alterum ornatus ad, et his quod
            luptatum. Pri ne magna aeque omnes, an eam urbanitas
            assentior comprehensam, iusto commodo maluisset ei mei!
            Harum argumentum an sed, vis ne nibh facete
            necessitatibus, verear epicuri moderatius et sit. Vel
            vitae tation et, omnes nostrum facilisi vis id. Cum semper
            sensibus cu, corpora quaerendum te duo. Affert fastidii ad
            ius, mei ancillae volutpat splendide at, etiam noluisse
            adipiscing an vel. Te euismod definiebas percipitur eam,
            an nam deleniti appetere voluptatibus. Affert fastidii ad
            ius.An vis noster integre.
          </Typography>

          <div className={classes.centerFooter}>
            <Typography className={classes.ipShow}>
              ip: 000.000.0.00
            </Typography>

            <Button
              onClick={ClickLogoff}
              className={classes.loggoutButton}>
              LOGOUT
            </Button>
          </div>
        </FormControl>
      </CardContent>
    </Card>
  );
}
