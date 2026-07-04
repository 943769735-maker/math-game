# 部署指南

## 选项 1：Railway.app（推荐，最简单）

### 1. 创建 GitHub 仓库

```bash
# 如果还没有推送到 GitHub，执行：
git remote add origin https://github.com/YOUR_USERNAME/math-game.git
git branch -M main
git push -u origin main
```

### 2. 部署到 Railway

1. 访问 https://railway.app
2. 使用 GitHub 账号登录
3. 点击 "Create a new Project"
4. 选择 "Deploy from GitHub repo"
5. 选择 `math-game` 仓库
6. Railway 会自动检测并部署

### 3. 配置环境

Railway 会自动配置所需的一切，您的应用会在以下地址可用：
```
https://math-game-[random-id].railway.app
```

---

## 选项 2：Render.com

1. 访问 https://render.com
2. 点击 "New +" → "Web Service"
3. 连接你的 GitHub 仓库
4. 配置：
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

---

## 选项 3：Vercel（前端）+ Railway（后端）

### 前端部署到 Vercel

```bash
npm install -g vercel
cd client
vercel
```

### 后端部署到 Railway

跟选项 1 相同，但只部署 `server` 文件夹

---

## 本地测试生产构建

```bash
npm run build
npm start
```

然后访问 http://localhost:5000

---

## 常见问题

**Q: 数据会持久化吗？**
A: 不会。SQLite 是内存数据库，应用重启后数据丢失。
   解决方案：改用 PostgreSQL 或 MongoDB

**Q: 如何添加 PostgreSQL？**

在 Railway 中：
1. 创建 PostgreSQL addon
2. 获取连接字符串
3. 修改 `server/src/db.ts` 使用 PostgreSQL

**Q: 如何使用自定义域名？**

在 Railway Dashboard 中：
- 点击 Settings
- 添加自定义域名
- 配置 DNS 记录

---

## 下一步

1. 创建数据库持久化（PostgreSQL）
2. 添加用户认证
3. 实现真正的多人游戏（WebSocket）
4. 部署到你自己的服务器
