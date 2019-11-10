import React from 'react';
import { QuizType, RangeValue } from '../../utils/types';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { getTotalItems } from '../../utils/utils';
import { isFinite } from 'lodash';
import { useStyles } from './style';

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

  const totalItems = getTotalItems();

  const totalItemsLimiter = (val: number) => val > totalItems ? totalItems : val

  const makeNumberInputChangeHandler = (changeFn: (val: RangeValue) => void, current: RangeValue) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    isFinite(value) ? changeFn(totalItemsLimiter(value)) : changeFn(current);
  }

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
          onChange={makeNumberInputChangeHandler(onSetStartFrom, startFrom)}
          margin="normal"
        />
        <TextField
          id="upTo"
          label={`Up to (default - ${totalItems})`}
          placeholder={totalItems.toString()}
          className={classes.textField}
          value={upTo || ''}
          onChange={makeNumberInputChangeHandler(onSetUpTo, upTo)}
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