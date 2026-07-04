import React, { useState, useCallback, useEffect } from 'react';

interface Question {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
}

interface GameState {
  playerId: number | null;
  username: string;
  currentLevel: number;
  difficulty: 'easy' | 'medium' | 'hard';
  gameMode: 'solo' | 'multiplayer';
  gameActive: boolean;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  correctCount: number;
  userAnswer: string;
  timeLeft: number;
  totalTime: number;
}

// 使用相对路径，支持任何部署环境
const API_URL = '';

export function App() {
  const [gameState, setGameState] = useState<GameState>({
    playerId: null,
    username: '',
    currentLevel: 1,
    difficulty: 'easy',
    gameMode: 'solo',
    gameActive: false,
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    correctCount: 0,
    userAnswer: '',
    timeLeft: 60,
    totalTime: 0,
  });

  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [gameHistory, setGameHistory] = useState<any[]>([]);

  // 登录/创建玩家
  const handleLogin = async (username: string) => {
    try {
      const response = await fetch(`${API_URL}/api/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const player = await response.json();
      setGameState((prev) => ({
        ...prev,
        playerId: player.id,
        username: player.username,
      }));
      await fetchGameHistory(player.id);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // 获取游戏历史
  const fetchGameHistory = async (playerId: number) => {
    try {
      const response = await fetch(`${API_URL}/api/game-records/${playerId}`);
      const history = await response.json();
      setGameHistory(history);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  // 获取排行榜
  const fetchLeaderboard = async (difficulty?: string) => {
    try {
      const url = difficulty
        ? `${API_URL}/api/leaderboard/${difficulty}`
        : `${API_URL}/api/leaderboard`;
      const response = await fetch(url);
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  };

  // 开始游戏
  const startGame = async () => {
    try {
      const response = await fetch(`${API_URL}/api/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: gameState.currentLevel,
          difficulty: gameState.difficulty,
          gameMode: gameState.gameMode,
          count: 10,
        }),
      });
      const { questions } = await response.json();

      setGameState((prev) => ({
        ...prev,
        gameActive: true,
        questions,
        currentQuestionIndex: 0,
        score: 0,
        correctCount: 0,
        userAnswer: '',
        timeLeft: 60,
        totalTime: 0,
      }));
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  // 提交答案
  const submitAnswer = useCallback(() => {
    if (!gameState.userAnswer.trim()) return;

    const current = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = parseInt(gameState.userAnswer) === current.answer;
    const points = isCorrect ? (gameState.currentLevel * gameState.timeLeft) : 0;

    setGameState((prev) => ({
      ...prev,
      score: prev.score + points,
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      userAnswer: '',
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  }, [gameState]);

  // 计时器
  useEffect(() => {
    if (!gameState.gameActive || gameState.timeLeft <= 0) return;

    const timer = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        timeLeft: prev.timeLeft - 1,
        totalTime: prev.totalTime + 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.gameActive]);

  // 检查游戏是否结束
  useEffect(() => {
    if (
      gameState.gameActive &&
      (gameState.timeLeft <= 0 ||
        gameState.currentQuestionIndex >= gameState.questions.length)
    ) {
      endGame();
    }
  }, [gameState.timeLeft, gameState.currentQuestionIndex, gameState.gameActive]);

  // 结束游戏
  const endGame = async () => {
    if (!gameState.playerId || !gameState.gameActive) return;

    try {
      await fetch(`${API_URL}/api/game-records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: gameState.playerId,
          level: gameState.currentLevel,
          difficulty: gameState.difficulty,
          score: gameState.score,
          time_spent: gameState.totalTime,
          total_questions: gameState.questions.length,
          correct_count: gameState.correctCount,
          game_mode: gameState.gameMode,
        }),
      });

      setGameState((prev) => ({ ...prev, gameActive: false }));
      await fetchGameHistory(gameState.playerId);
      await fetchLeaderboard();
    } catch (error) {
      console.error('Failed to end game:', error);
    }
  };

  if (!gameState.playerId) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (!gameState.gameActive) {
    return (
      <MenuScreen
        gameState={gameState}
        setGameState={setGameState}
        onStartGame={startGame}
        leaderboard={leaderboard}
        gameHistory={gameHistory}
        onShowLeaderboard={() => {
          fetchLeaderboard();
          setShowLeaderboard(true);
        }}
        showLeaderboard={showLeaderboard}
      />
    );
  }

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const progress = ((gameState.currentQuestionIndex + 1) / gameState.questions.length) * 100;

  return (
    <div className="game-screen">
      <div className="game-header">
        <h1>数学速算</h1>
        <div className="stats">
          <div>分数: {gameState.score}</div>
          <div>时间: {gameState.timeLeft}s</div>
          <div>正确: {gameState.correctCount}/{gameState.questions.length}</div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      {currentQuestion && (
        <div className="question-container">
          <div className="question">
            <span className="num">{currentQuestion.num1}</span>
            <span className="operator">{currentQuestion.operator}</span>
            <span className="num">{currentQuestion.num2}</span>
            <span className="equals">=</span>
            <span className="question-mark">?</span>
          </div>

          <input
            type="number"
            value={gameState.userAnswer}
            onChange={(e) =>
              setGameState((prev) => ({ ...prev, userAnswer: e.target.value }))
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') submitAnswer();
            }}
            autoFocus
            className="answer-input"
            placeholder="输入答案"
          />

          <button onClick={submitAnswer} className="submit-btn">
            提交
          </button>
        </div>
      )}
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-box">
        <h1>数学速算游戏</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="输入用户名"
            className="login-input"
            autoFocus
          />
          <button type="submit" className="login-btn">
            开始游戏
          </button>
        </form>
      </div>
    </div>
  );
}

function MenuScreen({
  gameState,
  setGameState,
  onStartGame,
  leaderboard,
  gameHistory,
  onShowLeaderboard,
  showLeaderboard,
}: any) {
  return (
    <div className="menu-screen">
      <div className="container">
        <h1>数学速算游戏</h1>
        <p>欢迎, {gameState.username}!</p>

        <div className="settings">
          <div className="setting-group">
            <label>难度:</label>
            <select
              value={gameState.difficulty}
              onChange={(e) =>
                setGameState((prev: any) => ({
                  ...prev,
                  difficulty: e.target.value,
                }))
              }
            >
              <option value="easy">简单 (1-10)</option>
              <option value="medium">中等 (1-50)</option>
              <option value="hard">困难 (1-100)</option>
            </select>
          </div>

          <div className="setting-group">
            <label>等级:</label>
            <select
              value={gameState.currentLevel}
              onChange={(e) =>
                setGameState((prev: any) => ({
                  ...prev,
                  currentLevel: parseInt(e.target.value),
                }))
              }
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
                <option key={level} value={level}>
                  等级 {level}
                </option>
              ))}
            </select>
          </div>

          <div className="setting-group">
            <label>游戏模式:</label>
            <select
              value={gameState.gameMode}
              onChange={(e) =>
                setGameState((prev: any) => ({
                  ...prev,
                  gameMode: e.target.value,
                }))
              }
            >
              <option value="solo">单人</option>
              <option value="multiplayer">多人</option>
            </select>
          </div>
        </div>

        <button onClick={onStartGame} className="start-btn">
          开始游戏
        </button>

        <div className="history-section">
          <h2>最近游戏</h2>
          {gameHistory.length > 0 ? (
            <div className="history-list">
              {gameHistory.slice(0, 5).map((record: any, idx: number) => (
                <div key={idx} className="history-item">
                  <span>等级 {record.level} - {record.difficulty}</span>
                  <span className="score">{record.score} 分</span>
                  <span className="accuracy">
                    {((record.correct_count / record.total_questions) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-history">还没有游戏记录</p>
          )}
        </div>

        <button onClick={onShowLeaderboard} className="leaderboard-btn">
          查看排行榜
        </button>

        {showLeaderboard && (
          <div className="leaderboard-modal">
            <div className="leaderboard-content">
              <h2>全球排行榜</h2>
              <button
                onClick={() => setShowLeaderboard(false)}
                className="close-btn"
              >
                ×
              </button>
              {leaderboard.length > 0 ? (
                <div className="leaderboard-list">
                  {leaderboard.map((player: any, idx: number) => (
                    <div key={idx} className="leaderboard-item">
                      <span className="rank">#{idx + 1}</span>
                      <span className="name">{player.username}</span>
                      <span className="score">{player.total_score}</span>
                      <span className="games">{player.game_count}局</span>
                      <span className="accuracy">
                        {player.avg_accuracy.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>暂无排行数据</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
