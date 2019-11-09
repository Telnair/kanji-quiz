import React from 'react';
import { QuizType, RangeValue } from '../../utils/types';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { getTotalItems } from '../../utils/utils';
import { isFinite } from 'lodash';

interface StartFormProps {
  quizType: QuizType;
  onSetQuizType: (type: QuizType) => void;
  startFrom: RangeValue;
  onSetStartFrom: (val: RangeValue) => void;
  upTo: RangeValue;
  onSetUpTo: (val: RangeValue) => void;
  autoSuggestions: boolean;
  onToggleAutoSuggestions: () => void;
  onStartGame: () => void;
}

const useStyles = makeStyles(theme => ({
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

export const StartForm: React.FC<StartFormProps> = ({
  quizType,
  onSetQuizType,
  startFrom,
  onSetStartFrom,
  upTo,
  onSetUpTo,
  autoSuggestions,
  onToggleAutoSuggestions,
  onStartGame,
}) => {
  const classes = useStyles();

  const isRangeValid = startFrom && upTo ? Boolean(startFrom < upTo) : (startFrom ? startFrom < getTotalItems() : true);

  return (
    <div className={classes.container}>
      <FormGroup row className={classes.group}>
        <FormLabel component="legend" className={classes.radioLabel}>Quiz type</FormLabel>
        <RadioGroup
          row
          className={classes.radioGroup}
          aria-label="quiz type"
          name="quiz type"
          value={quizType}
          onChange={(e) => onSetQuizType(e.target.value as QuizType)}
        >
          <FormControlLabel value={QuizType.Kanji} control={<Radio color="primary" />} label="Kanji" />
          <FormControlLabel value={QuizType.Meanings} control={<Radio color="primary" />} label="Meaning" />
        </RadioGroup>
      </FormGroup>
      <FormGroup row className={classes.group}>
        <TextField
          id="startFrom"
          label="Start from (default - 0)"
          className={classes.textField}
          value={startFrom || ''}
          placeholder="0"
          onChange={(e) => isFinite(+e.target.value) ? onSetStartFrom(+e.target.value) : onSetStartFrom(startFrom)}
          margin="normal"
        />
        <TextField
          id="upTo"
          label={`Up to (default - ${getTotalItems().toString()})`}
          placeholder={getTotalItems().toString()}
          className={classes.textField}
          value={upTo || ''}
          onChange={(e) => isFinite(+e.target.value) ? onSetUpTo(+e.target.value) : onSetUpTo(upTo)}
          margin="normal"
        />
      </FormGroup>
      <FormGroup row className={classes.group}>
        <FormControlLabel
          control={
            <Switch
              checked={autoSuggestions}
              onChange={onToggleAutoSuggestions}
              value={!autoSuggestions}
              color="primary"
            />
          }
          label="Auto Suggestions"
        />
      </FormGroup>
      <Button
        disabled={!isRangeValid}
        variant="contained"
        color="primary"
        onClick={onStartGame}
        className={classes.button}
      >
        Start
      </Button>
    </div>
  );
}