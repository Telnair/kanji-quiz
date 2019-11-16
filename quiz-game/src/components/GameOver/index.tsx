import React from 'react';
import { useStyles } from './style';
import { QuizType, IncorrectAnswer, QuizElement } from '../../utils/types';
import Button from '@material-ui/core/Button';
import { msToMinutes } from '../../utils/utils';

interface GameOverProps {
  incorrectAnswers: IncorrectAnswer[];
  quizType: QuizType;
  incorrectAnswersStats: React.ReactNode;
  onEndGame: () => void;
  totalQuizes: number;
  timeStarted: number | null;
}

export const GameOver: React.FC<GameOverProps> = ({ incorrectAnswers, quizType, incorrectAnswersStats, onEndGame, totalQuizes, timeStarted }) => {
  const classes = useStyles();

  const timeEnded = Date.now();
  let timeTotal = null;

  if (timeStarted) {
    timeTotal = msToMinutes(timeEnded - timeStarted);
  }

  return (
    <div className={classes.container}>
      <header>
        <h1 className={classes.title}>All {totalQuizes} quizes are done</h1>
        {timeTotal ? <p style={{ textAlign: 'center' }}>Total time: {timeTotal}</p> : null}
      </header>
      {incorrectAnswersStats}
      {incorrectAnswers.length ? (
        <div className={classes.incorrectAnswersContainer}>
          {incorrectAnswers.map(answer => (
            <div className={classes.incorrectAnswerItem} key={answer[0].kanji}>
              <IncorrectAnswerInfoBlock quizType={quizType} source={answer[0]}>quiz:</IncorrectAnswerInfoBlock>
              <IncorrectAnswerInfoBlock quizType={quizType} source={answer[1]} reversed>you:</IncorrectAnswerInfoBlock>
              <IncorrectAnswerInfoBlock quizType={quizType} source={answer[0]} reversed>correct:</IncorrectAnswerInfoBlock>
            </div>
          ))}
        </div>
      ) : null}
      <Button
        variant="contained"
        color="primary"
        onClick={onEndGame}>
          End quiz
      </Button>
    </div>
  );
}

interface IncorrectAnswerInfoBlockProps {
  quizType: QuizType;
  source: QuizElement;
  reversed?: boolean;
}

const IncorrectAnswerInfoBlock: React.FC<IncorrectAnswerInfoBlockProps> = ({ quizType, source, children, reversed }) => {
  const classes = useStyles();
  return (
    <div className={classes.incorrectAnswerItemTextBlock}>
      {children}
      <span className={classes.incorrectAnswerItemAccentText}>
        {reversed ? (quizType === QuizType.Kanji ? source.meaning : source.kanji) : (quizType === QuizType.Kanji ? source.kanji : source.meaning)}
      </span>
    </div>
  );
}