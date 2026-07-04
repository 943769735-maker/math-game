# 🚀 云平台部署完整指南

> 让任何人都能访问你的数学速算游戏！

## 💡 三步快速部署

### 第一步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库：
   - **Repository name**: `math-game`
   - **Description**: `Math quiz game with leaderboard`
   - **Public**: ✓ 选中
   - **Add .gitignore**: Node
3. 不勾选"Initialize this repository with a README"

### 第二步：推送代码

```bash
# 在你的项目目录执行
git remote add origin https://github.com/YOUR_USERNAME/math-game.git
git branch -M main
git push -u origin main
```

### 第三步：部署到 Railway（最简单 ⭐）

#### 方式1: 通过网页（推荐）

1. 访问 https://railway.app
2. 用 GitHub 账号登录（授权）
3. 点击 **"Create a new Project"**
4. 选择 **"Deploy from GitHub repo"**
5. 选择 `math-game` 仓库
6. Railway 自动配置并部署 ✅

完成！你会得到一个公开 URL：
```
https://math-game-[random].railway.app
```

#### 方式2: 使用 Railway CLI

```bash
# 1. 安装 Railway CLI
npm install -g @railway/cli

# 2. 登录
railway login

# 3. 关联项目
railway link

# 4. 部署
railway up
```

---

## 📱 实时同步更新

之后每次更新，只需：

```bash
# 修改代码
vim client/src/App.tsx  # 举例

# 推送到 GitHub
git add .
git commit -m "Fix: improve game UI"
git push origin main
```

**Railway 会自动重新部署！** 🔄

---

## 🔗 分享游戏

部署完成后，你会得到一个 URL，比如：
```
https://math-game-xyz123.railway.app
```

分享给任何人，他们可以直接玩！

---

## 🎯 验证部署成功

打开你的 Railway 应用 URL，检查：

- ✅ 能输入用户名登录
- ✅ 能选择难度和等级
- ✅ 能进行游戏
- ✅ 排行榜显示正常
- ✅ 游戏历史可以保存

---

## 💾 数据持久化（可选升级）

当前使用 SQLite（内存），应用重启数据会丢失。

**升级到 PostgreSQL**（推荐）：

1. **在 Railway 中添加 PostgreSQL**
   - Dashboard → Add
   - Select PostgreSQL
   
2. **获取连接字符串**
   - PostgreSQL 插件 → Connect
   - 复制 POSTGRES_URL

3. **修改代码**
   - 改用 `pg` 库（而不是 sql.js）
   - 连接到 PostgreSQL

这样数据会永久保存！

---

## 🚨 遇到问题？

### Q: 部署失败
**A**: 检查 Railway Dashboard 中的构建日志

### Q: 白屏 / 404
**A**: 确保前端静态文件已包含，检查：
```bash
ls -la client/dist/
```

### Q: API 无法连接
**A**: 检查 API URL 是否正确（应该是相对路径 `/api`）

### Q: 数据重启后丢失
**A**: 使用 PostgreSQL 替代 SQLite

---

## 📊 部署后的监控

在 Railway Dashboard 中可以：

- 📈 查看日志
- 📊 监控 CPU/内存
- 🔄 手动重启
- 🌍 查看统计信息
- 💰 查看成本（免费套餐足够用）

---

## 🎉 完成！

现在你有了一个：

✅ 全功能的数学游戏  
✅ 公开可访问的 URL  
✅ 实时自动部署  
✅ 全球排行榜  
✅ 游戏历史记录  

分享给朋友，看谁分数最高！🏆

---

## 高级配置

### 自定义域名

如果你有自己的域名（比如 `game.example.com`）：

1. Railway Dashboard → Settings
2. Add Custom Domain
3. 配置 DNS 记录指向 Railway

### 环境变量

如需添加敏感信息（比如API密钥）：

1. Railway Dashboard → Variables
2. 添加环境变量
3. 应用自动重启

### WebHooks

当代码更新时自动部署：

1. GitHub Repo Settings → Webhooks
2. Payload URL: `https://railway.app/...`（Railway 提供）

---

**现在就去部署吧！祝你的游戏玩得开心！** 🚀
