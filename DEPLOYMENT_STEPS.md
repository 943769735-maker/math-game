# 🚀 部署步骤指南

## 阶段 1: 代码推送到 GitHub（3分钟）

### 方式 A: 自动脚本（推荐）

```bash
# 在项目根目录执行
bash deploy.sh

# 按提示输入你的 GitHub 用户名
# 脚本会自动完成所有步骤
```

### 方式 B: 手动推送

```bash
# 1. 添加 remote（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/math-game.git

# 2. 切换到 main 分支
git branch -M main

# 3. 推送代码
git push -u origin main
```

---

## 阶段 2: 部署到 Railway.app（5分钟）

### 步骤 1: 创建 GitHub 仓库

1. 打开 https://github.com/new
2. 填写信息：
   - **Repository name**: `math-game`
   - **Description**: `数学速算游戏 - Math quiz game`
   - **Public**: ✓ 勾选
3. 点击 "Create repository"

⚠️ **重要**: 仓库必须是 Public，Railway 才能访问

### 步骤 2: 登录 Railway.app

1. 打开 https://railway.app
2. 点击右上角 "Login" 或 "Dashboard"
3. 选择 "Login with GitHub"
4. 授权 Railway 访问你的 GitHub

### 步骤 3: 创建项目

1. 在 Railway Dashboard，点击 "Create a new Project"
2. 选择 "Deploy from GitHub repo"
3. 搜索并选择 `math-game` 仓库
4. Railway 自动检测配置

### 步骤 4: 等待部署

- 🔄 构建中... (1-3 分钟)
- 📦 安装依赖... (1-2 分钟)
- 🚀 部署中... 

**总耗时**: 3-5 分钟

### 步骤 5: 获取 URL

部署完成后，你会在 Railway Dashboard 看到：

```
Deployment successful!
Domain: https://math-game-[random-id].railway.app
```

**就是这个 URL！** 分享给任何人都能玩！

---

## 验证部署成功 ✅

打开你的 URL，检查：

- [ ] 能打开首页
- [ ] 能输入用户名
- [ ] 能选择难度和等级
- [ ] 能进行游戏
- [ ] 排行榜显示正常
- [ ] 可以查看游戏历史

如果都成功了，恭喜！🎉

---

## 🐛 故障排除

### 问题 1: "Deploy from GitHub" 选项看不到

**解决**: 
1. 确保已用 GitHub 账号登录 Railway
2. 点击 "Authorize" 授权 Railway
3. 重新加载页面

### 问题 2: 找不到 "math-game" 仓库

**解决**:
1. 确保已在 GitHub 上创建 `math-game` 仓库
2. 确保仓库是 **Public**（不是 Private）
3. 确保代码已推送到仓库

```bash
# 查看远程仓库状态
git remote -v

# 再次推送
git push origin main
```

### 问题 3: 部署失败，显示红色错误

**解决**:
1. 点击 "Deployments" 查看完整日志
2. 查看是否有构建错误
3. 尝试手动重启部署：Dashboard → Redeploy

### 问题 4: 部署成功但网站无法访问

**解决**:
1. 等待 1-2 分钟（可能还在启动）
2. 刷新浏览器（Ctrl+Shift+Delete 清缓存）
3. 检查 Railway Dashboard 中的日志

### 问题 5: 看到 "502 Bad Gateway"

**解决**:
1. 在 Railway Dashboard 点击 "Redeploy"
2. 等待几分钟重新启动
3. 检查后端日志是否有错误

---

## 📊 部署后的使用

### 查看日志

Railway Dashboard → Logs

实时查看应用运行状态、错误、请求等

### 查看监控

Railway Dashboard → Monitoring

- CPU 使用率
- 内存使用情况
- 请求响应时间
- 错误率

### 重启应用

Railway Dashboard → Redeploy

遇到问题时可以手动重启

### 查看成本

Railway Dashboard → Usage

显示当前免费额度使用情况（通常足够用）

---

## 🔄 更新游戏（最简单的部分！）

部署完成后，更新游戏只需 3 步：

```bash
# 1. 修改代码
vim client/src/App.tsx

# 2. 提交到 GitHub
git add .
git commit -m "Feature: description of changes"
git push origin main

# 3. 完成！
# Railway 自动检测更新并重新部署 ✅
# 3-5 分钟后你的更新就上线了
```

**不需要任何额外操作！**

---

## 💾 升级数据存储（可选）

当前使用 SQLite（内存存储），应用重启后数据丢失。

要永久保存数据，升级到 PostgreSQL：

### 1. 添加 PostgreSQL

Railway Dashboard → Add Service → PostgreSQL

### 2. 修改代码

编辑 `server/src/db.ts`，改用 PostgreSQL 驱动

### 3. 推送更新

```bash
git add .
git commit -m "feat: Add PostgreSQL support"
git push origin main
```

### 4. 自动部署

Railway 检测到新依赖，自动重新构建和部署 ✅

---

## 🎉 完成！

你现在有了一个：

✅ 完整的游戏应用  
✅ 全球可访问的 URL  
✅ 24/7 在线服务  
✅ 自动部署系统  
✅ 实时监控  

**分享你的 URL，邀请朋友一起玩吧！** 🎮

---

## 📞 还有问题？

- 📖 详见 `RAILWAY_DEPLOYMENT.md`
- 🆘 查看 Railway 文档: https://docs.railway.app
- 💬 Railway 社区: https://discord.gg/railway

祝你的游戏大成功！🚀
