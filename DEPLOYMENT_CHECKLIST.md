# 🚀 部署检清单

## ✅ 本地准备（已完成）

- [x] 项目构建成功
- [x] 前后端整合（前端静态文件由后端提供）
- [x] API 路由正确配置
- [x] 环境变量支持
- [x] Git 仓库初始化
- [x] 部署文件已准备

## 📋 部署前准备

### 1. 创建 GitHub 仓库

```bash
# 在 GitHub 网页创建新仓库：
# https://github.com/new
# 仓库名：math-game
# 描述：Math quiz game with leaderboard
# 不要初始化任何文件
```

### 2. 推送代码到 GitHub

```bash
# 当前已有本地git，执行：
git remote add origin https://github.com/YOUR_USERNAME/math-game.git
git branch -M main
git push -u origin main
```

## 🚀 Railway.app 部署（5分钟）

### 步骤

1. **访问 Railway**
   - 打开 https://railway.app
   - 用 GitHub 账号登录

2. **创建项目**
   - 点击 "Create a new Project"
   - 选择 "Deploy from GitHub repo"

3. **选择仓库**
   - 选择 `math-game` 仓库
   - Railway 会自动检测并部署

4. **等待部署**
   - 构建通常需要 3-5 分钟
   - 完成后会得到一个公开 URL

5. **分享 URL**
   - 格式：`https://math-game-[random].railway.app`
   - 发给任何人，他们就能玩！

### 环境变量

Railway 会自动配置 `PORT`，无需手动设置。

## ✨ 部署后

### 你会得到什么

- ✅ 一个公开的 URL，任何人都能访问
- ✅ 自动 HTTPS 加密
- ✅ 免费的自动部署（每次 git push 都会重新部署）
- ✅ 实时日志查看

### 更新游戏

只需推送到 GitHub，Railway 会自动重新部署：

```bash
# 修改代码后
git add .
git commit -m "Update: feature description"
git push origin main
```

## 🆘 常见问题

### Q: 数据会不会丢失？
**A:** 是的，SQLite 是内存数据库，应用重启后数据丢失。
- 简单方案：无需改动（演示/测试用）
- 完整方案：改用 PostgreSQL

### Q: 如何使用自定义域名？
**A:** Railway 支持自定义域名（需要付费计划或连接自己的域名）

### Q: 可以本地和云端同时运行吗？
**A:** 可以，但要使用不同的端口。

## 📱 测试部署

部署完成后，要测试：

1. 打开应用 URL
2. 输入用户名登录
3. 选择难度和等级
4. 完成一局游戏
5. 检查排行榜

## 🎉 成功标志

当你看到这些，说明部署成功了：

- ✅ 可以访问应用
- ✅ 可以输入用户名
- ✅ 可以进行游戏
- ✅ 排行榜可以显示
- ✅ 游戏历史可以查看

---

**准备好了？让我们开始部署吧！** 🚀
