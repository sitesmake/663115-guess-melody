import ResultView from '../views/result-view';

export default (gameState) => {
  const resultScreen = new ResultView(gameState);

  return resultScreen;
};
