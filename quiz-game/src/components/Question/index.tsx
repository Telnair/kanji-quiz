import React, { useState, useRef } from 'react';
import { QuizType, QuestionItem, QuizElement } from '../../utils/types';
import { getQuestion } from '../../utils/utils';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface QuestionProps {
  quizType: QuizType;
  startFrom: number;
  upTo: number;
  autoSuggestions: boolean;
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionItem: {
    width: 200,
    height: 200,
    marginBottom: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: "#eaeaea",
    border: '4px solid #dadada',
    textAlign: 'center',
  },
  suggestionsContainer: {
    display: 'flex',
    flexBasis: '100%',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionsItem: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(0.5),
    background: "#eaeaea",
    border: '1px solid #dadada',
    cursor: 'pointer',
    width: 300,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: theme.spacing(5),
  }
}));

export const Question: React.FC<QuestionProps> = ({ quizType, startFrom, upTo, autoSuggestions }) => {
  const incorrectAnswers = useRef<Array<[ string, string ]>>([]);
  const [ showSuggestions, setShowSuggestions ] = useState(autoSuggestions);
  const usedIds = useRef<string[]>([]);
  const [ question, setQuestion ] = useState<QuestionItem | null>(getQuestion({ quizType, startFrom, upTo, exclude: new Set(usedIds.current) }));

  const classes = useStyles();

  const makeAnswerHandler = (item: QuizElement) => () => {
    const nextUsedIds = [ ...usedIds.current, questionItem.kanji ];
    usedIds.current = nextUsedIds;
    setQuestion(getQuestion({ quizType, startFrom, upTo, exclude: new Set(nextUsedIds) }));
    if (item.kanji !== questionItem.kanji) incorrectAnswers.current.push([ questionItem.kanji, item.kanji ]);
    if (!autoSuggestions) setShowSuggestions(false);
  }

  // @todo: game results
  if (!question) return (
    // <GameResults />
    null
  );

  const { questionItem, suggestions } = question;

  return (
    <div className={classes.container}>
      <header>
        <h1 className={classes.title}>Question {usedIds.current.length + 1} from {upTo - startFrom}</h1>
      </header>
      <div className={classes.questionItem} style={quizType === QuizType.Kanji ? { fontFamily: 'Kosugi', fontSize: 120 } : { fontFamily: 'Roboto', fontSize: 24 }}>
        {questionItem[quizType === QuizType.Kanji ? 'kanji' : 'meaning']}
      </div>
      {showSuggestions ? (
        <div className={classes.suggestionsContainer}>
          {suggestions.map(suggestion => (
            <div
              style={quizType === QuizType.Kanji ? { fontFamily: 'Roboto', fontSize: 19 } : { fontFamily: 'Kosugi', fontSize: 36 }}
              key={suggestion.kanji}
              className={classes.suggestionsItem}
              onClick={makeAnswerHandler(suggestion)}
            >
              {quizType === QuizType.Kanji ? suggestion.meaning : suggestion.kanji}
            </div>
          ))}
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={() => setShowSuggestions(true)}>Show suggestions</Button>
      )}
    </div>
  );
}