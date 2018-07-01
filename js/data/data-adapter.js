const processQuestions = (answers, genre) => answers.map((answer) => {
  return {
    src: answer.src,
    correct: answer.genre === genre
  };
});

const processGenreLevel = (level) => {
  return {
    type: `genre`,
    title: level.question,
    questions: processQuestions(level.answers, level.genre)
  };
};

const processAnswers = (answers) => answers.map((answer) => {
  return {
    correct: answer.isCorrect,
    src: answer.image.url,
    artist: answer.title
  };
});


const processArtistLevel = (level) => {
  return {
    type: `artist`,
    questionSrc: level.src,
    answers: processAnswers(level.answers)
  };
};

const processLevel = (level) => {
  if (level.type === `artist`) {
    return processArtistLevel(level);
  }
  return processGenreLevel(level);
};

export default (data) => {
  return data.map((level) => processLevel(level));
};
