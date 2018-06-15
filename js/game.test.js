import {assert} from 'chai';
import {answerPoints, totalPoints, resultsText, timer} from './game.js';

describe(`Функция подсчёта набранных баллов игрока`, () => {
  it(`Начисляет за правильный ответ 1 балл`, () => {
    assert.equal(1, answerPoints([true, 31]));
  });

  it(`Начисляет за быстрый ответ 2 балла`, () => {
    assert.equal(2, answerPoints([true, 30]));
  });

  it(`Снимает 2 балла за неверный ответ`, () => {
    assert.equal(-2, answerPoints([false, 30]));
  });
});

describe(`Функция подсчёта набранных баллов игрока`, () => {
  it(`Если игрок ответил меньше, чем на 10 вопросов, то игра считается не пройденной и функция должна вернуть -1`, () => {
    const incompletedAnswers = [[true, 15], [false, 45]];
    assert.equal(-1, totalPoints(incompletedAnswers));
  });

  it(`Если игрок ответил на все вопросы правильно и не быстро, и ни разу не ошибся, то функция должна вернуть 10 баллов;`, () => {
    const completedAnswers = [
      [true, 31], [true, 31], [true, 31], [true, 31], [true, 31],
      [true, 31], [true, 31], [true, 31], [true, 31], [true, 31]
    ];
    assert.equal(10, totalPoints(completedAnswers));
  });

  it(`Если игрок ответил на все вопросы правильно и быстро, и ни разу не ошибся, то функция должна вернуть 20 баллов;`, () => {
    const completedAnswers = [
      [true, 30], [true, 30], [true, 30], [true, 30], [true, 30],
      [true, 30], [true, 30], [true, 30], [true, 30], [true, 30]
    ];
    assert.equal(20, totalPoints(completedAnswers));
  });

  it(`Если игрок ответил на половину вопросов правильно и быстро, а на другую половину правильно и не быстро, и ни разу не ошибся, то функция должна вернуть 15 баллов;`, () => {
    const completedAnswers = [
      [true, 31], [true, 31], [true, 31], [true, 31], [true, 31],
      [true, 30], [true, 30], [true, 30], [true, 30], [true, 30]
    ];
    assert.equal(15, totalPoints(completedAnswers));
  });
});

describe(`Функция вывода результата игрока`, () => {
  it(`Если игрок проиграл и у него закончилось время - то выводится соответствующее сообщение`, () => {
    const timeOutResults = {points: 12, notes: 2, time: 0};
    assert.equal(`Время вышло! Вы не успели отгадать все мелодии!`,
        resultsText([], timeOutResults));
  });

  it(`Если игрок проиграл и у него закончились попытки - то выводится соответствующее сообщение`, () => {
    const livesOutResults = {points: 12, notes: 0, time: 99};
    assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
        resultsText([], livesOutResults));
  });

  it(`Если игрок смог пройти игру лучше всех, то его результат — выигрыш лучше всех`, () => {
    const otherPlayersResults = [
      {points: 10, notes: 1, time: 15},
      {points: 5, notes: 1, time: 15},
      {points: 15, notes: 1, time: 15}
    ];
    const playerResults = {points: 100, notes: 1, time: 15};
    assert.equal(`Вы заняли 1 место из 4 игроков. Это лучше, чем у 75% игроков`,
        resultsText(otherPlayersResults, playerResults));
  });

  it(`Если игрок смог пройти игру хуже всех, то его результат — выигрыш хуже всех`, () => {
    const otherPlayersResults = [
      {points: 10, notes: 1, time: 15},
      {points: 5, notes: 1, time: 15},
      {points: 15, notes: 1, time: 15}
    ];
    const playerResults = {points: 4, notes: 1, time: 15};
    assert.equal(`Вы заняли 4 место из 4 игроков.`, resultsText(otherPlayersResults, playerResults));
  });
});

describe(`Функция создания таймера`, () => {
  it(`Создает новый таймер с указанным временем`, () => {
    assert.equal(20, timer(20).time);
  });

  it(`При обновлении таймера (вызов метода tick), время уменьшается на единицу`, () => {
    assert.equal(18, timer(20).tick().tick().time);
  });

  it(`Сообщает когда время вышло`, () => {
    assert.equal(`Время вышло!`, timer(2).tick().tick());
  });
});
