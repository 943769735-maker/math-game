#!/bin/bash

# 🚀 Railway 一键部署脚本
# 使用方法: bash auto-deploy.sh

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║              🚀 数学速算游戏 - Railway 自动部署脚本                   ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

# 检查是否已登录 Railway
if ! command -v railway &> /dev/null; then
    echo "📦 安装 Railway CLI..."
    npm install -g @railway/cli
fi

echo ""
echo "🔐 Railway 认证..."
echo "   请在浏览器中授权 (会自动打开)"
railway login

if [ $? -ne 0 ]; then
    echo "❌ 登录失败"
    exit 1
fi

echo ""
echo "🔗 关联项目..."
railway link

echo ""
echo "📤 推送并部署..."
railway up --detach

echo ""
echo "✅ 部署已提交！"
echo ""
echo "查看部署状态："
echo "  railway status"
echo ""
echo "查看实时日志："
echo "  railway logs"
echo ""
echo "获取你的 URL："
echo "  railway open"
echo ""
