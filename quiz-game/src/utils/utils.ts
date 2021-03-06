import { QuestionItem, GetQuestionSettings, QuizElement } from "./types";
import * as list from '../data/kanji.json';
import { random, nth, shuffle } from 'lodash';

const SUGGESTIONS_TOTAL = 3;

const getRandomItem = (items: QuizElement[]) => nth(items, random(items.length - 1));

export const getQuestion = (settings: GetQuestionSettings): QuestionItem | null => {
  const kanjiRange = list.data.slice(settings.startFrom, settings.upTo);
  const relevantKanji = kanjiRange.filter(item => !settings.exclude.has(item.kanji));

  if (!relevantKanji.length) return null;

  const questionItem = settings.isRandom ? getRandomItem(relevantKanji) : relevantKanji[0];
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

export const msToMinutes = (ms: number) => {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return (+seconds === 60 ? (minutes+1) + ` minute${minutes === 1 ? '' : 's'} ` : minutes + ` minute${minutes === 1 ? '' : 's'} ` + seconds + ` second${+seconds === 1 ? '' : 's'} `);
}