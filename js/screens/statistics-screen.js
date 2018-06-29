import StatisticsView from '../views/statistics-view';
import Application from '../application';

export default class StatisticsScreen {
  constructor(model) {
    this.model = model;
  }

  get element() {
    this.model.generateStatistics();

    const statisticsView = new StatisticsView(this.model.gameState);

    statisticsView.onRestartClick = () => Application.showWelcome();

    return statisticsView.element;
  }

}
