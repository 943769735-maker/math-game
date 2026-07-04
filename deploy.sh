#!/bin/bash

# 🚀 数学速算游戏 - 自动部署脚本

set -e  # 任何命令失败都停止

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║         🚀 数学速算游戏 Railway.app 自动部署脚本                       ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

# 检查 Git
echo "📋 检查环境..."
if ! command -v git &> /dev/null; then
    echo "❌ Git 未安装，请先安装 Git"
    exit 1
fi

# 获取 GitHub 用户名
echo ""
echo "👤 输入你的 GitHub 用户名 (例如: octocat):"
read -p "用户名: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ 用户名不能为空"
    exit 1
fi

REPO_URL="https://github.com/$GITHUB_USERNAME/math-game.git"

echo ""
echo "✅ 将使用以下仓库地址："
echo "   $REPO_URL"
echo ""

# 检查是否已有 remote
if git remote | grep -q origin; then
    echo "⚠️  已存在 origin remote，移除..."
    git remote remove origin
fi

# 设置 git config
echo "⚙️  配置 Git..."
git config --global user.email "admin@math-game.com" 2>/dev/null || true
git config --global user.name "Math Game Admin" 2>/dev/null || true

# 添加 remote
echo "🔗 添加 remote..."
git remote add origin "$REPO_URL"

# 确保在 main 分支
echo "🌿 切换到 main 分支..."
git branch -M main

# 推送代码
echo ""
echo "⏳ 正在推送代码到 GitHub..."
echo "   (首次推送可能需要输入 GitHub 密码或 Personal Access Token)"
echo ""

if git push -u origin main; then
    echo ""
    echo "✅ 代码推送成功！"
else
    echo ""
    echo "❌ 推送失败。请检查："
    echo "   1. 用户名是否正确"
    echo "   2. 是否已在 GitHub 上创建 math-game 仓库"
    echo "   3. 是否有 GitHub 的写入权限"
    echo ""
    echo "📖 需要帮助？查看 RAILWAY_DEPLOYMENT.md"
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║                    ✅ 代码已成功推送到 GitHub！                        ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 下一步：部署到 Railway.app"
echo ""
echo "1️⃣  打开: https://railway.app"
echo "2️⃣  用 GitHub 账号登录"
echo "3️⃣  点击 'Create a new Project'"
echo "4️⃣  选择 'Deploy from GitHub repo'"
echo "5️⃣  选择 'math-game' 仓库"
echo "6️⃣  等待 3-5 分钟部署完成"
echo ""
echo "✨ 完成后你会获得一个公开 URL！"
echo ""
echo "📍 仓库地址: $REPO_URL"
echo ""
echo "📚 详细指南: 查看 RAILWAY_DEPLOYMENT.md"
echo ""
