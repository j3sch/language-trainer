export function checkAnswerAndMark(answer: string, solution: string) {
  const answerWords = answer.split(/(\W+)/);
  const solutionWords = solution.split(/(\W+)/);

  const dp = Array.from({ length: answerWords.length + 1 }, () => Array(solutionWords.length + 1).fill(0));

  for (let i = 1; i <= answerWords.length; i++) {
    for (let j = 1; j <= solutionWords.length; j++) {
      if (answerWords[i - 1] === solutionWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = answerWords.length;
  let j = solutionWords.length;
  const markedAnswer = [];
  let correctWords = 0;

  while (i > 0 && j > 0) {
    if (answerWords[i - 1] === solutionWords[j - 1]) {
      markedAnswer.unshift(`<span style="color:green">${answerWords[i - 1]}</span>`);
      correctWords++;
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      markedAnswer.unshift(`<span style="color:red">${answerWords[i - 1]}</span>`);
      i--;
    } else {
      j--;
    }
  }

  while (i > 0) {
    markedAnswer.unshift(`<span style="color:red">${answerWords[i - 1]}</span>`);
    i--;
  }

  const percentage = parseFloat(((correctWords / answerWords.length) * 100).toFixed(1));

  return {
    markedAnswer: markedAnswer.join(''),
    percentage,
  };
}
