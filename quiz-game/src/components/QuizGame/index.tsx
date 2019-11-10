import React, { useState } from 'react';
import { QuizType, RangeValue } from '../../utils/types';
import { Question } from '../Question';
import { StartForm } from '../StartForm';
import { Container } from '@material-ui/core';
import { getTotalItems } from '../../utils/utils';

export const QuizGame: React.FC = () => {
  const [ isGameStarted, setIsGameStarted ] = useState(false);
  const [ quizType, setQuizType ] = useState<QuizType>(QuizType.Kanji);
  const [ startFrom, setStartFrom ] = useState<RangeValue>(null);
  const [ upTo, setUpTo ] = useState<RangeValue>(null);
  const [ autoSuggestions, setAutoSuggestions ] = useState(true);

  const content = isGameStarted ? (
    <Question
      quizType={quizType}
      startFrom={startFrom || 0}
      upTo={upTo || getTotalItems()}
      autoSuggestions={autoSuggestions}
    />
  ) : (
    <StartForm
      quizType={quizType}
      onSetQuizType={setQuizType}
      startFrom={startFrom}
      onSetStartFrom={setStartFrom}
      upTo={upTo}
      onSetUpTo={setUpTo}
      autoSuggestions={autoSuggestions}
      onToggleAutoSuggestions={() => setAutoSuggestions(prev => !prev)}
      onStartGame={() => setIsGameStarted(true)}
    />
  );

  return (
    <Container maxWidth="sm">
      {content}
    </Container>
  );
}