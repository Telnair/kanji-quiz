import React from 'react';
import { useStyles } from './style';
import { QuizType, IncorrectAnswer, QuizElement } from '../../utils/types';
import Button from '@material-ui/core/Button';

interface GameOverProps {
  incorrectAnswers: IncorrectAnswer[];
  quizType: QuizType;
  incorrectAnswersStats: React.ReactNode;
  onEndGame: () => void;
  totalQuizes: number;
}

export const GameOver: React.FC<GameOverProps> = ({ incorrectAnswers, quizType, incorrectAnswersStats, onEndGame, totalQuizes }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <header>
        <h1 className={classes.title}>All {totalQuizes} quizes are done</h1>
      </header>
      {incorrectAnswersStats}
      {incorrectAnswers.length ? (
        <div className={classes.incorrectAnswersContainer}>
          {incorrectAnswers.map(answer => (
            <div className={classes.incorrectAnswerItem} key={answer[0].kanji}>
              <IncorrectAnswerInfoBlock quizType={quizType} source={answer[0]}>Quiz:</IncorrectAnswerInfoBlock>
              <IncorrectAnswerInfoBlock quizType={quizType} source={answer[1]} reversed>You:</IncorrectAnswerInfoBlock>
              <IncorrectAnswerInfoBlock quizType={quizType} source={answer[0]} reversed>Correct:</IncorrectAnswerInfoBlock>
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
        {quizType === QuizType.Kanji && !reversed ? source.kanji : source.meaning}
      </span>
    </div>
  );
}