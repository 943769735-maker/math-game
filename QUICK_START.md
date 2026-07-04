# ⚡ 快速开始部署

## 5分钟完成部署

### 1️⃣ 创建 GitHub 仓库
https://github.com/new
- 仓库名：`math-game`
- 选择 Public

### 2️⃣ 推送代码
```bash
git remote add origin https://github.com/YOUR_USERNAME/math-game.git
git branch -M main
git push -u origin main
```

### 3️⃣ 部署到 Railway.app
1. 打开 https://railway.app
2. 用 GitHub 账号登录
3. 点击 "Create Project" 
4. 选择 "Deploy from GitHub"
5. 选择 `math-game`
6. 等待 3-5 分钟...
7. ✅ 完成！获得公开 URL

### 📍 你的游戏 URL
```
https://math-game-[random].railway.app
```

## 分享给朋友
复制上面的 URL 分享，任何人都能玩！

## 更新游戏
```bash
# 修改代码
git add .
git commit -m "Update feature"
git push origin main
# 自动重新部署 ✅
```

---
📖 详见 CLOUD_DEPLOYMENT.md
