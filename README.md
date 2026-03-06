# iziyu CMS

基于 Go + TypeScript/React 的前后端分离博客/CMS 系统。

## 项目结构

```
├── backend/          # Go 后端 (Gin + GORM + JWT)
│   ├── main.go       # 入口文件
│   ├── config/       # 配置
│   ├── models/       # 数据模型 (GORM)
│   ├── controllers/  # 控制器
│   ├── middleware/    # 中间件 (JWT 认证, CORS)
│   └── routes/       # 路由定义
├── frontend/         # TypeScript/React 前端 (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── api/       # API 请求封装
│   │   ├── components/ # 通用组件
│   │   ├── hooks/     # 自定义 Hooks
│   │   ├── pages/     # 页面组件
│   │   └── types/     # TypeScript 类型定义
│   └── index.html
```

## 技术栈

### 后端
- **Go 1.22+** + **Gin** (HTTP 框架)
- **GORM** (ORM，支持 MySQL / SQLite)
- **JWT** (JSON Web Token 认证)
- **bcrypt** (密码加密)

### 前端
- **React 19** + **TypeScript**
- **Vite** (构建工具)
- **Tailwind CSS v4** (样式)
- **React Router v7** (路由)
- **Axios** (HTTP 请求)

## 功能特性

- 文章列表（分页、搜索、分类筛选）
- 文章详情（浏览计数）
- 用户注册 / 登录（JWT 认证）
- 发表文章（需登录）
- 评论系统（需登录）
- 点赞功能（需登录）
- 响应式设计，移动端适配

## 快速开始

### 环境要求

- Go 1.22+
- Node.js 18+
- MySQL 5.7+（可选，默认使用 SQLite）

### 启动后端

```bash
cd backend

# 使用默认 SQLite 数据库
go run main.go

# 或指定 MySQL
DB_DRIVER=mysql DB_HOST=127.0.0.1 DB_PORT=3306 DB_NAME=cms DB_USER=root DB_PASS=secret go run main.go
```

后端默认运行在 `http://localhost:8080`

### 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端默认运行在 `http://localhost:5173`，已配置代理将 `/api` 请求转发到后端。

### 生产部署

```bash
# 构建前端
cd frontend
npm run build
# 产物在 frontend/dist/

# 编译后端
cd backend
go build -o cms-server main.go
```

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `DB_DRIVER` | `sqlite` | 数据库驱动 (`sqlite` / `mysql`) |
| `DB_HOST` | `127.0.0.1` | MySQL 主机 |
| `DB_PORT` | `3306` | MySQL 端口 |
| `DB_NAME` | `cms` | 数据库名 |
| `DB_USER` | `root` | 数据库用户 |
| `DB_PASS` | (空) | 数据库密码 |
| `DB_PATH` | `./cms.db` | SQLite 文件路径 |
| `JWT_SECRET` | (内置) | JWT 签名密钥 |
| `SERVER_PORT` | `8080` | 后端端口 |
| `FRONTEND_URL` | `http://localhost:5173` | 前端地址 (CORS) |

## API 接口

### 公开接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/register` | 用户注册 |
| POST | `/api/auth/login` | 用户登录 |
| GET | `/api/articles` | 文章列表 |
| GET | `/api/articles/:id` | 文章详情 |
| GET | `/api/categories` | 分类列表 |
| GET | `/api/articles/:id/comments` | 文章评论 |

### 需认证接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/auth/me` | 当前用户信息 |
| POST | `/api/articles` | 创建文章 |
| PUT | `/api/articles/:id` | 更新文章 |
| DELETE | `/api/articles/:id` | 删除文章 |
| POST | `/api/articles/:id/comments` | 发表评论 |
| POST | `/api/articles/:id/vote` | 点赞/取消点赞 |

## 数据库表

| 表名 | 说明 |
|------|------|
| `user_info` | 用户信息 |
| `cms_category` | 文章分类 |
| `cms_article` | 文章 |
| `cms_comment` | 评论 |
| `cms_vote` | 点赞 |
| `cms_view` | 浏览记录 |

数据库表会在后端启动时自动创建/迁移 (GORM AutoMigrate)。
