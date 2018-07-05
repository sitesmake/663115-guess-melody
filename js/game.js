import {declension} from './utils';

export const answerPoints = ([success, time]) => {
  if (!success) {
    return -2;
  }
  if (time > 30) {
    return 1;
  }
  return 2;
};

export const totalPoints = (answers) => {
  return answers.reduce((sum, answer) => sum + answerPoints(answer), 0);
};

export const resultsText = (results, currentPlayerResult) => {
  if (currentPlayerResult.timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии!`;
  }
  if (currentPlayerResult.wrongAnswers >= 3) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }
  results.push(currentPlayerResult);
  results.sort((a, b) => b.totalPoints - a.totalPoints);
  const playerPosition = results.findIndex((el) => el === currentPlayerResult) + 1;
  const totalPlayers = results.length;
  const bestPercents = Math.round((totalPlayers - playerPosition) / totalPlayers * 100);
  let message = `Вы заняли ${playerPosition} место из ${totalPlayers} игрок${declension(totalPlayers, `а`, `ов`, `ов`)}.`;
  if (bestPercents > 0) {
    message += ` Это лучше, чем у ${bestPercents}% игрок${declension(bestPercents, `а`, `ов`, `ов`)}`;
  }
  return message;
};
