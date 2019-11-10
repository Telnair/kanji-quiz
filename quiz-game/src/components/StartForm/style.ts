import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  group: {
    marginBottom: theme.spacing(3),
    flexBasis: '100%',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    marginTop: theme.spacing(5),
    width: 150,
    height: 40,
    justifySelf: 'center',
  },
  radioGroup: {
    marginTop: theme.spacing(1),
  },
  radioLabel: {
    display: 'flex',
    flexBasis: '100%',
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
  },
}));