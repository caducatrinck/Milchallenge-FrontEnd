import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useEstilos = makeStyles((theme: Theme) =>
  createStyles({
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
      paddingTop: 10,
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
