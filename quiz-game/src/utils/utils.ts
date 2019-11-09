import { QuestionItem, GetQuestionSettings, QuizElement } from "./types";
import * as list from '../data/kanji.json';
import { random, nth, shuffle } from 'lodash';

const SUGGESTIONS_TOTAL = 3;

const getRandomItem = (items: QuizElement[]) => nth(items, random(items.length - 1));

export const getQuestion = (settings: GetQuestionSettings): QuestionItem | null => {
  const kanjiRange = list.data.slice(settings.startFrom, settings.upTo);
  const relevantKanji = kanjiRange.filter(item => !settings.exclude.has(item.kanji));

  if (!relevantKanji.length) return null;

  const questionItem = getRandomItem(relevantKanji);
  const suggestions = new Array(SUGGESTIONS_TOTAL).fill(null).reduce((group: QuizElement[]) => {
    const itemsPull = kanjiRange.filter(k => !group.map(k => k.kanji).includes(k.kanji));
    const suggestion = getRandomItem(itemsPull);
    if (suggestion) {
      group.push(suggestion);
    }
    return group;
  }, [ questionItem ]);

  if (!questionItem) return null;

  return {
    questionItem,
    suggestions: shuffle(suggestions),
  }
};

export const getTotalItems = () => list.data.length;