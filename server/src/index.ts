import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase, get, all, run } from './db';
import { generateQuestions } from './gameEngine';
import type { GameConfig } from './gameEngine';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// 提供前端静态文件
const clientBuildPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientBuildPath));

// 初始化数据库
await initializeDatabase();

// 创建或获取玩家
app.post('/api/players', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    const existing = get('SELECT * FROM players WHERE username = ?', [username]);
    if (existing) {
      return res.json(existing);
    }

    run('INSERT INTO players (username) VALUES (?)', [username]);
    const player = get('SELECT * FROM players WHERE username = ?', [username]);
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// 获取玩家信息
app.get('/api/players/:id', async (req, res) => {
  try {
    const player = get('SELECT * FROM players WHERE id = ?', [req.params.id]);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// 生成问题
app.post('/api/questions', (req, res) => {
  try {
    const config: GameConfig = req.body;
    const count = req.body.count || 10;
    const questions = generateQuestions(config, count);
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// 保存游戏记录
app.post('/api/game-records', async (req, res) => {
  try {
    const {
      player_id,
      level,
      difficulty,
      score,
      time_spent,
      total_questions,
      correct_count,
      game_mode,
    } = req.body;

    const result = run(
      `INSERT INTO game_records
       (player_id, level, difficulty, score, time_spent, total_questions, correct_count, game_mode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [player_id, level, difficulty, score, time_spent, total_questions, correct_count, game_mode]
    );

    // 更新排行榜
    updateLeaderboard(player_id);

    const record = get('SELECT * FROM game_records WHERE id = ?', [result as any]);
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// 获取玩家的游戏历史
app.get('/api/game-records/:player_id', async (req, res) => {
  try {
    const records = all(
      `SELECT * FROM game_records WHERE player_id = ? ORDER BY created_at DESC LIMIT 20`,
      [req.params.player_id]
    );
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// 获取全球排行榜
app.get('/api/leaderboard', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const leaderboard = all(
      `SELECT * FROM leaderboard ORDER BY total_score DESC LIMIT ?`,
      [limit]
    );
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// 获取难度排行榜
app.get('/api/leaderboard/:difficulty', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const leaderboard = all(
      `SELECT l.* FROM leaderboard l
       JOIN (
         SELECT player_id, COUNT(*) as cnt
         FROM game_records
         WHERE difficulty = ?
         GROUP BY player_id
       ) g ON l.player_id = g.player_id
       ORDER BY l.total_score DESC
       LIMIT ?`,
      [req.params.difficulty, limit]
    );
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

function updateLeaderboard(playerId: number) {
  try {
    const stats = get(
      `SELECT
        COUNT(*) as game_count,
        SUM(score) as total_score,
        AVG(CAST(correct_count AS FLOAT) / total_questions * 100) as avg_accuracy
       FROM game_records WHERE player_id = ?`,
      [playerId]
    );

    const player = get('SELECT username FROM players WHERE id = ?', [playerId]);

    run(
      `INSERT OR REPLACE INTO leaderboard
       (player_id, username, total_score, game_count, avg_accuracy)
       VALUES (?, ?, ?, ?, ?)`,
      [
        playerId,
        player?.username || 'Unknown',
        stats?.total_score || 0,
        stats?.game_count || 0,
        stats?.avg_accuracy || 0,
      ]
    );
  } catch (error) {
    console.error('Error updating leaderboard:', error);
  }
}

// 所有其他路由返回前端首页（支持React Router）
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

const PORT = parseInt(process.env.PORT || '5000');
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
