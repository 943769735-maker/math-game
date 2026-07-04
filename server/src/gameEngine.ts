export interface Question {
  num1: number;
  num2: number;
  operator: '+' | '-' | '*' | '/';
  answer: number;
}

export interface GameConfig {
  level: number;
  difficulty: 'easy' | 'medium' | 'hard';
  gameMode: 'solo' | 'multiplayer';
}

const difficultyConfig = {
  easy: { maxNum: 10, operatorsRatio: [0.5, 0.3, 0.15, 0.05] },
  medium: { maxNum: 50, operatorsRatio: [0.25, 0.25, 0.25, 0.25] },
  hard: { maxNum: 100, operatorsRatio: [0.2, 0.2, 0.3, 0.3] },
};

export function generateQuestion(config: GameConfig): Question {
  const diffConfig = difficultyConfig[config.difficulty];
  const maxNum = diffConfig.maxNum * (1 + (config.level - 1) * 0.5);

  const num1 = Math.floor(Math.random() * maxNum) + 1;
  const num2 = Math.floor(Math.random() * Math.max(1, maxNum / 2)) + 1;

  // 选择操作符
  const rand = Math.random();
  let operator: '+' | '-' | '*' | '/' = '+';
  let cumulative = 0;

  for (let i = 0; i < 4; i++) {
    cumulative += diffConfig.operatorsRatio[i];
    if (rand <= cumulative) {
      operator = ['+', '-', '*', '/'][i] as any;
      break;
    }
  }

  // 计算答案
  let answer = 0;
  switch (operator) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    case '/':
      answer = Math.floor(num1 / num2);
      break;
  }

  return { num1, num2, operator, answer };
}

export function generateQuestions(config: GameConfig, count: number = 10): Question[] {
  return Array.from({ length: count }, () => generateQuestion(config));
}
