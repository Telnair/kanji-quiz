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
  const [ trackTime, setTrackTime ] = useState(true);
  const [ randomOrder, setRandomOrder ] = useState(true);

  const defaultStartFrom = 0;
  const defaultUpTo = getTotalItems()

  const content = isGameStarted ? (
    <Question
      quizType={quizType}
      startFrom={startFrom || defaultStartFrom}
      upTo={upTo || defaultUpTo}
      autoSuggestions={autoSuggestions}
      onEndGame={() => setIsGameStarted(false)}
      trackTime={trackTime}
      isRandom={randomOrder}
    />
  ) : (
    <StartForm
      quizType={quizType}
      onSetQuizType={setQuizType}
      startFrom={startFrom}
      onSetStartFrom={setStartFrom}
      onToggleTrackTime={() => setTrackTime(prev => !prev)}
      trackTime={trackTime}
      upTo={upTo}
      onSetUpTo={setUpTo}
      autoSuggestions={autoSuggestions}
      onToggleAutoSuggestions={() => setAutoSuggestions(prev => !prev)}
      onStartGame={() => setIsGameStarted(true)}
      randomOrder={randomOrder}
      onToggleRandomOrder={() => setRandomOrder(prev => !prev)}
    />
  );

  return (
    <Container maxWidth="sm">
      {content}
    </Container>
  );
}