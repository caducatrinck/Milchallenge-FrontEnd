import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  createStyles,
  FormControl,
  Theme,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Card } from './Card';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      paddingTop: '80px',
      justifyContent: 'space-between',
    },
    heading: {
      color: '#219653',
      paddingBottom: 10,
    },
  })
);

export function CardHome() {
  let history = useHistory();
  const classes = useStyles();
  const token = localStorage.getItem('token');

  const { data, error, isLoading } = useQuery(
    'homepage',
    async () => {
      const response = await fetch(
        'https://login-catrinck.herokuapp.com/login/home',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.json();
    }
  );

  function ClickLogoff() {
    localStorage.removeItem('token');
    history.push('/login');
  }

  return (
    <Card>
      <FormControl className={classes.padding} variant="filled">
        <Typography variant="h6" className={classes.heading}>
          Bem Vindo!
        </Typography>

        <Typography className={classes.subHeading}>
          Agora você é um filiado!
        </Typography>

        <Typography className={classes.description} variant="caption">
          An vis noster integre. Ius alterum ornatus ad, et his quod
          luptatum. Pri ne magna aeque omnes, an eam urbanitas
          assentior comprehensam, iusto commodo maluisset ei mei!
          Harum argumentum an sed, vis ne nibh facete necessitatibus,
          verear epicuri moderatius et sit. Vel vitae tation et, omnes
          nostrum facilisi vis id. Cum semper sensibus cu, corpora
          quaerendum te duo. Affert fastidii ad ius, mei ancillae
          volutpat splendide at, etiam noluisse adipiscing an vel. Te
          euismod definiebas percipitur eam.
        </Typography>

        <div className={classes.centerFooter}>
          <Typography className={classes.ipShow}>
            ip: {data && data.ip}
          </Typography>

          <Button
            onClick={ClickLogoff}
            className={classes.loggoutButton}>
            LOGOUT
          </Button>
        </div>
      </FormControl>
    </Card>
  );
}
