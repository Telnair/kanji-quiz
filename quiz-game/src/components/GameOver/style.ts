import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing(3),
  },
  title: {
    fontSize: 24,
    marginBottom: theme.spacing(5),
  },
  incorrectAnswersContainer: {
    display: 'flex',
    marginTop: theme.spacing(2),
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  incorrectAnswerItem: {
    flexBasis: '100%',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
    background: "#eaeaea",
    border: '1px solid #dadada',
    marginBottom: theme.spacing(1),
  },
  incorrectAnswerItemTextBlock: {
    display: 'flex',
    fontSize: 18,
    lineHeight: '28px',
    whiteSpace: 'nowrap',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  incorrectAnswerItemAccentText: {
    fontWeight: 700,
    marginLeft: theme.spacing(0.5),
  }
}));