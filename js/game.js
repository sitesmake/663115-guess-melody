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
  const result = answers.reduce((sum, answer) => sum + answerPoints(answer), 0);
  return result;
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
  const bestPercents = (totalPlayers - playerPosition) / totalPlayers * 100;
  let message = `Вы заняли ${playerPosition} место из ${totalPlayers} игроков.`;
  if (bestPercents > 0) {
    message += ` Это лучше, чем у ${bestPercents}% игроков`;
  }
  return message;
};

export const timer = (time) => {
  return Object.freeze({
    time,
    tick() {
      if (time > 1) {
        return timer(time - 1);
      }
      return `Время вышло!`;
    }
  });
};
