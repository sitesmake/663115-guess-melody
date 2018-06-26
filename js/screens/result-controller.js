import ResultView from '../views/result-view';

export default (gameState) => {
  const resultController = new ResultView(gameState);

  return resultController;
};
