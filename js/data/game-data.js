export const initialState = {
  currentLevelIndex: 0,
  wrongAnswers: 0,
  timeLeft: 300,
  answers: [],
  totalPoints: 0,
  otherPlayersResults: [
    {totalPoints: 10, wrongAnswers: 1, timeLeft: 215},
    {totalPoints: 5, wrongAnswers: 0, timeLeft: 190},
    {totalPoints: 15, wrongAnswers: 2, timeLeft: 225}
  ]
};

export const levels = [
  {
    type: `artist`,
    questionSrc: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    answers: [
      {
        correct: true,
        src: `http://placehold.it/134x134`,
        artist: `Пелагея`
      },
      {
        src: `http://placehold.it/134x134`,
        artist: `The Prodigy`
      },
      {
        src: `http://placehold.it/134x134`,
        artist: `Lorde`
      }
    ]
  },
  {
    type: `genre`,
    title: `Выберите инди-рок треки`,
    questions: [
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        correct: true
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        correct: false
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        correct: true
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
        correct: false
      }
    ]
  },
  {
    type: `artist`,
    questionSrc: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    answers: [
      {
        correct: true,
        src: `http://placehold.it/134x134`,
        artist: `Пелагея-2`
      },
      {
        src: `http://placehold.it/134x134`,
        artist: `Lorde-2`
      },
      {
        src: `http://placehold.it/134x134`,
        artist: `The Prodigy-2`
      }
    ]
  },
  {
    type: `genre`,
    title: `Выберите инди-рок треки`,
    questions: [
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
        correct: true
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        correct: false
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        correct: true
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
        correct: false
      }
    ]
  }
];
