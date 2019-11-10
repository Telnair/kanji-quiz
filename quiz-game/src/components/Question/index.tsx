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
  },
  footerStats: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    alignItems: 'center',
  },
  incorrectAnswers: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    fontWeight: 700,
    color: '#f44336',
  },
  incorrectAnswersContainer: {
    display: 'flex',
    marginTop: theme.spacing(2),
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  incorrectAnswerItem: {
    flexBasis: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  incorrectAnswerItemTextBlock: {
    display: 'flex',
    fontSize: 18,
    whiteSpace: 'nowrap',
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
  incorrectAnswerItemAccentText: {
    fontWeight: 700,
    marginLeft: theme.spacing(0.5),
  }
}));

export const Question: React.FC<QuestionProps> = ({ quizType, startFrom, upTo, autoSuggestions }) => {
  const incorrectAnswers = useRef<Array<[ QuizElement, QuizElement ]>>([]);
  const [ showSuggestions, setShowSuggestions ] = useState(autoSuggestions);
  const usedIds = useRef<string[]>([]);
  const [ question, setQuestion ] = useState<QuestionItem | null>(getQuestion({ quizType, startFrom, upTo, exclude: new Set(usedIds.current) }));

  const classes = useStyles();

  const makeAnswerHandler = (item: QuizElement) => () => {
    const nextUsedIds = [ ...usedIds.current, questionItem.kanji ];
    usedIds.current = nextUsedIds;
    setQuestion(getQuestion({ quizType, startFrom, upTo, exclude: new Set(nextUsedIds) }));
    if (item.kanji !== questionItem.kanji) incorrectAnswers.current.push([ questionItem, item ]);
    if (!autoSuggestions) setShowSuggestions(false);
  }

  const incorrectAnswersText = <p className={classes.footerStats}>Incorrect answers: <span className={classes.incorrectAnswers}>{incorrectAnswers.current.length}</span></p>

  // @todo: game results
  if (!question) return (
    <div className={classes.container}>
      <header>
        <h1 className={classes.title}>All quizes are done</h1>
      </header>
      {incorrectAnswersText}
      {incorrectAnswers.current.length ? (
        <div className={classes.incorrectAnswersContainer}>
          {incorrectAnswers.current.map(answer => (
            <div className={classes.incorrectAnswerItem} key={answer[0].kanji}>
              <div className={classes.incorrectAnswerItemTextBlock}>
                Quiz:
                <span className={classes.incorrectAnswerItemAccentText}>{quizType === QuizType.Kanji ? answer[0].kanji : answer[0].meaning}</span>
              </div>
              <div className={classes.incorrectAnswerItemTextBlock}>
                You:
                <span className={classes.incorrectAnswerItemAccentText}>{quizType === QuizType.Kanji ? answer[1].meaning : answer[1].kanji}</span>
              </div>
              <div className={classes.incorrectAnswerItemTextBlock}>
                Correct:
                <span className={classes.incorrectAnswerItemAccentText}>{quizType === QuizType.Kanji ? answer[0].meaning : answer[0].kanji}</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );

  const { questionItem, suggestions } = question;

  return (
    <div className={classes.container}>
      <header>
        <h1 className={classes.title}>Quiz {usedIds.current.length + 1} from {upTo - startFrom}</h1>
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
      <footer>
        {incorrectAnswersText}
      </footer>
    </div>
  );
}