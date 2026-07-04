# 🌐 Railway.app 云平台部署完全指南

> 三步部署，让全世界都能玩你的游戏！

## 📋 准备物品

- ✅ GitHub 账号（免费）
- ✅ Railway 账号（免费）  
- ✅ 这个项目（已准备好）

---

## 🚀 部署流程

### 第1步：创建 GitHub 仓库（2分钟）

1. 打开 https://github.com/new
2. 输入信息：
   - **Repository name**: `math-game`
   - **Description**: `数学速算游戏 - Math quiz game`
   - **Public**: ✓ 勾选
   - **.gitignore**: 选 Node
3. 点击 "Create repository"

### 第2步：推送代码到 GitHub（1分钟）

在你的项目目录（包含 `package.json` 的目录）执行：

```bash
git remote add origin https://github.com/YOUR_USERNAME/math-game.git
git branch -M main
git push -u origin main
```

**替换 `YOUR_USERNAME` 为你的 GitHub 用户名**

### 第3步：部署到 Railway（2分钟）

#### 网页方式（推荐）

1. 打开 https://railway.app
2. 点击右上角 **"Dashboard"** 或 **"Login"**
3. 用 GitHub 账号授权登录
4. 点击 **"Create a new Project"**
5. 选择 **"Deploy from GitHub repo"**
6. 搜索并选择 `math-game` 仓库
7. Railway 自动检测配置并开始部署
8. **等待 3-5 分钟...**

#### 部署完成后 ✅

你会在 Railway Dashboard 看到：
- 项目名称
- **公开 URL**: `https://math-game-[random-id].railway.app`
- 部署状态

---

## 🎮 开始玩！

### 你的游戏地址

复制这个 URL 并分享给朋友：
```
https://math-game-[你的ID].railway.app
```

### 测试游戏

1. 打开你的 URL
2. 输入任意用户名
3. 选择难度和等级
4. 开始游戏！

---

## 🔄 更新游戏（自动部署）

修改代码后，只需简单几步 Railway 就会自动重新部署：

```bash
# 修改你的代码
vim client/src/App.tsx  # 举例

# 提交到 GitHub
git add .
git commit -m "Feature: 新增功能说明"
git push origin main

# Railway 自动检测并重新部署 ✅
# 3-5分钟后你的更新就上线了
```

不需要任何额外操作！

---

## 📊 管理你的应用

### Railway Dashboard

访问 https://railway.app/dashboard

你可以：

- 📈 **查看日志** - 实时看应用运行情况
- 🔄 **重启应用** - 遇到问题时手动重启
- 📊 **监控资源** - CPU/内存/网络使用情况  
- 🌍 **查看统计** - 请求数、错误率等
- 💰 **查看成本** - 免费套餐足够支持你的游戏
- 🔐 **管理环境变量** - 如需添加敏感信息

---

## ⚙️ 配置选项

### 1. 自定义域名（高级）

如果你有自己的域名（比如 `math-game.com`）：

在 Railway Dashboard：
1. 选择你的项目
2. 点击 "Settings"
3. 选择 "Custom Domain"
4. 输入你的域名
5. 按照提示配置 DNS

### 2. 环境变量（如需要）

存储敏感信息（API密钥等）：

在 Railway Dashboard：
1. 选择你的项目  
2. 点击 "Variables"
3. 添加 `KEY=VALUE`
4. 应用自动重启生效

---

## 🔗 分享指南

### 分享给朋友

只需发送你的 URL：
```
"来玩我做的数学游戏吧！https://math-game-abc123.railway.app"
```

### 在社交媒体分享

```
🎮 我做了一个数学速算游戏！
⚡ 测试你的计算速度
🏆 查看全球排行榜

立即体验：https://math-game-abc123.railway.app
```

---

## 🐛 故障排除

### Q: 看到 "502 Bad Gateway"
**A**: 
- 等待 1-2 分钟（可能还在启动）
- 检查 Railway Dashboard 日志看是否有错误
- 如果问题持续，尝试手动重启

### Q: 看到 "Cannot GET /"  
**A**:
- 前端文件可能没有构建
- 检查 Railway 构建日志
- 确保推送了所有文件

### Q: API 返回错误
**A**:
- 查看 Railway Dashboard 中的实时日志
- 检查数据库连接是否正常
- 重启应用试试

### Q: 数据重启后消失
**A**: 这是正常的（SQLite 是内存数据库）。
要永久保存数据，升级到 PostgreSQL：
1. Railway Dashboard → Add → PostgreSQL
2. 修改 server/src/db.ts 使用 PostgreSQL
3. 推送代码，Railway 自动重新部署

---

## 📈 监控应用

### 查看用户活动

在 Railway 日志中可以看到：
- 用户登录
- 游戏开始/结束
- API 请求
- 任何错误信息

### 查看性能

Railway Dashboard → Monitoring：
- CPU 使用率
- 内存使用情况
- 请求响应时间
- 错误率

---

## 🎉 大功告成！

你现在有了一个：

✅ **完整的游戏应用**
- 四则运算速算
- 计分系统
- 全球排行榜
- 游戏历史

✅ **24/7 在线**
- 完全免费
- 自动部署更新
- 实时监控

✅ **全世界可访问**
- 一个简单的 URL
- 任何人都能玩
- 支持多个玩家

---

## 🚀 后续改进

想让游戏更强大？尝试这些升级：

1. **数据持久化** - 改用 PostgreSQL
2. **用户认证** - 添加注册/登录系统
3. **多人实时游戏** - 用 WebSocket 实现
4. **移动端优化** - 改进响应式设计
5. **排行榜过滤** - 按难度/等级排行
6. **新游戏模式** - 时间攻防、对决模式等
7. **社交功能** - 分享成绩、邀请朋友
8. **国际化** - 支持多种语言

---

## 📞 需要帮助？

- 🐛 **遇到 bug**: 检查 Railway 的构建日志
- ❓ **有疑问**: 查看 Railway 文档 https://docs.railway.app
- 💬 **需要支持**: Railway 社区 https://discord.gg/railway

---

## 📝 总结

| 步骤 | 时间 | 操作 |
|------|------|------|
| 创建 GitHub 仓库 | 2分钟 | 网页操作 |
| 推送代码 | 1分钟 | `git push` |
| Railway 部署 | 3-5分钟 | 网页点击 |
| **总计** | **~10分钟** | **完全自动化** |

---

**现在就部署吧！祝你的游戏成功！** 🎊

有任何问题，记得查看 Railway Dashboard 的实时日志。
