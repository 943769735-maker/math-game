# 数学速算游戏 Math Game

一个完整的四则运算速算游戏Web应用，支持单人/多人模式、难度调整、排行榜和游戏历史。

## 功能特性

✅ **四则运算速算练习** - 支持 +、-、×、÷
✅ **难度系统** - 简单、中等、困难三个难度级别
✅ **关卡系统** - 10个关卡，难度递增
✅ **计分系统** - 根据正确性和反应时间计分
✅ **排行榜** - 全球排行榜，按总分排序
✅ **游戏历史** - 查看最近游戏记录
✅ **多人模式** - 支持多人游戏框架
✅ **计时系统** - 60秒计时挑战

## 项目结构

```
.
├── client/                 # React前端
│   ├── src/
│   │   ├── App.tsx        # 主应用组件
│   │   ├── main.tsx       # 入口文件
│   │   └── index.css      # 样式
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                 # Node.js后端
│   ├── src/
│   │   ├── index.ts       # Express服务器
│   │   ├── db.ts          # 数据库配置
│   │   └── gameEngine.ts  # 题目生成引擎
│   ├── package.json
│   └── tsconfig.json
└── package.json            # 根目录配置
```

## 快速开始

### 1. 安装依赖

```bash
npm run install-all
```

### 2. 启动开发服务器

在项目根目录运行：

```bash
npm run dev
```

这会同时启动：
- 后端服务器：http://localhost:5000
- 前端开发服务器：http://localhost:5173

### 3. 打开浏览器

访问 http://localhost:5173 开始游戏

## 构建

```bash
npm run build
```

生成的文件在 `client/dist` 和 `server/dist`

## 启动生产环境

```bash
npm start
```

## 游戏说明

### 登录
输入用户名开始游戏，系统会自动创建玩家账户

### 菜单
选择难度、等级、游戏模式后点击"开始游戏"

### 游戏
- 屏幕显示数学题目
- 输入答案并按Enter或点击提交
- 60秒内完成10道题
- 正确答案得分 = 难度系数 × 等级 × 剩余秒数
- 错误答案不得分但仍消耗时间

### 排行榜
实时查看全球排行，对比自己和其他玩家的成绩

## 数据库

使用SQLite存储：
- **players** - 玩家信息
- **game_records** - 每局游戏记录
- **leaderboard** - 排行榜缓存

数据库文件自动生成：`math_game.db`

## API文档

### 玩家管理
- `POST /api/players` - 创建或获取玩家
- `GET /api/players/:id` - 获取玩家信息

### 游戏
- `POST /api/questions` - 生成题目
- `POST /api/game-records` - 保存游戏记录
- `GET /api/game-records/:player_id` - 获取玩家历史

### 排行榜
- `GET /api/leaderboard` - 全球排行榜
- `GET /api/leaderboard/:difficulty` - 按难度排行

## 技术栈

- **前端**: React 18 + TypeScript + Vite
- **后端**: Node.js + Express + TypeScript
- **数据库**: SQLite 3
- **样式**: CSS3

## 浏览器支持

- Chrome/Edge (最新版)
- Firefox (最新版)
- Safari (最新版)
- 移动浏览器

## 开发建议

### 添加新难度
编辑 `server/src/gameEngine.ts` 中的 `difficultyConfig`

### 自定义计分规则
修改 `client/src/App.tsx` 中的 `submitAnswer` 函数

### 扩展多人模式
使用 WebSocket 在 `server/src/index.ts` 中添加实时通信

## 许可证

MIT
