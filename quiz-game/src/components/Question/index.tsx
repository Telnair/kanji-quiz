import React, { useState, useRef } from 'react';
import { QuizType, QuestionItem, QuizElement, IncorrectAnswer } from '../../utils/types';
import { getQuestion } from '../../utils/utils';
import { useStyles } from './style';
import Button from '@material-ui/core/Button';
import { GameOver } from '../GameOver';

interface QuestionProps {
  quizType: QuizType;
  startFrom: number;
  upTo: number;
  autoSuggestions: boolean;
  onEndGame: () => void;
  trackTime: boolean;
  isRandom: boolean;
  timeStarted: number | null;
};

export const Question: React.FC<QuestionProps> = ({ quizType, startFrom, upTo, autoSuggestions, onEndGame, isRandom, timeStarted }) => {
  const incorrectAnswers = useRef<IncorrectAnswer[]>([]);
  const [ showSuggestions, setShowSuggestions ] = useState(autoSuggestions);
  const usedIds = useRef<string[]>([]);
  const [ question, setQuestion ] = useState<QuestionItem | null>(
    getQuestion({ quizType, startFrom, upTo, exclude: new Set(usedIds.current), isRandom })
  );

  const classes = useStyles({});

  const makeAnswerHandler = (item: QuizElement) => () => {
    const nextUsedIds = [ ...usedIds.current, questionItem.kanji ];

    usedIds.current = nextUsedIds;
    setQuestion(getQuestion({ quizType, startFrom, upTo, exclude: new Set(nextUsedIds), isRandom }));

    if (item.kanji !== questionItem.kanji) incorrectAnswers.current.push([ questionItem, item ]);
    if (!autoSuggestions) setShowSuggestions(false);
  }

  const incorrectAnswersStats = (
    <p className={classes.footerStats}>
      Incorrect answers:
      <span className={classes.incorrectAnswers}>{incorrectAnswers.current.length}</span>
    </p>
  );

  const totalQuizes = upTo - startFrom;

  if (!question) return (
    <GameOver
      incorrectAnswers={incorrectAnswers.current}
      quizType={quizType}
      onEndGame={onEndGame}
      incorrectAnswersStats={incorrectAnswersStats}
      totalQuizes={totalQuizes}
      timeStarted={timeStarted}
    />
  );

  const { questionItem, suggestions } = question;

  return (
    <div className={classes.container}>
      <header>
        <h1 className={classes.title}>Quiz {usedIds.current.length + 1} from {totalQuizes}</h1>
      </header>
      <div
        className={classes.questionItem}
        style={quizType === QuizType.Kanji
          ? { fontFamily: 'Kosugi', fontSize: 120 }
          : { fontFamily: 'Roboto', fontSize: 24 }
        }>
        {questionItem[quizType === QuizType.Kanji ? 'kanji' : 'meaning']}
      </div>
      {showSuggestions ? (
        <div className={classes.suggestionsContainer}>
          {suggestions.map(suggestion => (
            <div
              style={quizType === QuizType.Kanji
                ? { fontFamily: 'Roboto', fontSize: 19 }
                : { fontFamily: 'Kosugi', fontSize: 36 }
              }
              key={suggestion.kanji}
              className={classes.suggestionsItem}
              onClick={makeAnswerHandler(suggestion)}
            >
              {suggestion[quizType === QuizType.Kanji ? 'meaning' : 'kanji']}
            </div>
          ))}
        </div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSuggestions(true)}>
            Show suggestions
        </Button>
      )}
      {incorrectAnswersStats}
    </div>
  );
}