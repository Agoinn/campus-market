# 校园集市

一个移动端 H5 校园二手交易项目，用来练习 Vue 3 技术栈，也可以作为求职作品集的第一个完整项目。

- 首页：搜索、分类筛选、下拉刷新、加载骨架、空状态
- 详情：收藏、联系卖家（占位）
- 发布：表单校验、分类与成色选择，发布后写入 localStorage
- 收藏：跨页面同步、刷新不丢
- 我的：发布 / 收藏统计、我发布的商品

## 技术栈

| 技术 | 用途 |
| --- | --- |
| Vue 3（`<script setup>` + TypeScript） | 页面与组件 |
| Vite 8 | 开发服务器与构建 |
| Vue Router 5 | 路由与懒加载 |
| Pinia 4 | 商品、收藏状态 |
| Vant 4 | 移动端组件库 |
| Axios | 接口层（已封装，当前用本地 mock） |
| localStorage | 收藏、发布的持久化 |

## 运行

```bash
npm install
npm run dev
```

打开终端里显示的地址（默认 `http://localhost:5173`）。

```bash
npm run build      # 类型检查 + 生产构建
npm run preview    # 预览构建结果
npm run typecheck  # 只跑类型检查
```

## 目录结构

```
src/
├─ api/            # http 实例 + 商品接口（当前为本地 mock）
├─ components/     # ItemCard 等可复用组件
├─ data/           # 12 件种子商品
├─ router/         # 路由表，页面全部懒加载
├─ stores/         # Pinia：items、favorites
├─ types/          # Item 类型与分类/成色常量
├─ utils/          # 价格、时间、分类映射
├─ views/          # Home / Detail / Publish / Favorites / Profile
├─ App.vue         # 页面壳 + 底部导航
├─ main.ts         # 注册 Pinia / Router / Vant
└─ style.css       # 设计变量与全局样式
```

## 数据怎么流动

```
api/items.ts (mock Promise)
        ↓
stores/items.ts (Pinia)
        ↓
HomeView / DetailView / ProfileView
        ↓
localStorage（发布与收藏）
```

- 首页首次进入调用 `itemsStore.load()`，模拟 450ms 网络延迟，所以能看到骨架屏。
- 发布时先写入 Pinia，再 `persist()` 到 localStorage；刷新后 `load()` 会把“我发布的”保留在列表最前面。
- 收藏只存商品 id，不复制商品对象，避免两份数据不同步。

### 换成真实后端

1. 复制 `.env.example` 为 `.env.local`，配置 `VITE_API_BASE_URL`。
2. 把 `src/api/items.ts` 里的模拟 Promise 换成：

```ts
import { http } from './http'

export async function fetchItems(): Promise<Item[]> {
  return (await http.get<Item[]>('/items')).data
}
```

3. 发布改为 `http.post('/items', input)`，成功后再写入 store。

## 设计说明

视觉取自校园跳蚤市场的纸质价签和公告栏：宋体标题、Bahnschrift 数字、橘红色价签；底色是偏冷的灰绿纸色，而不是常见的米色。整个页面只保留一个记忆点（价签），其余用细线、留白和方形边角保持安静。

## 面试怎么讲（3 分钟版）

1. **一句话**：一个校园二手交易 H5，解决毕业季闲置处理；我独立完成了从页面、状态到部署的完整流程。
2. **技术选择**：Vue 3 + Vant 适合快速做移动端；Pinia 负责跨页面状态；接口层单独封装，方便从 mock 切到真实后端；页面全部路由懒加载。
3. **一个具体问题**：发布后要立刻能在详情页看到商品。我的做法是先把商品写进 Pinia，再持久化到 localStorage，详情页只从 store 取数据；收藏则只存 id，避免商品对象出现两份。
4. **可改进**：Vant 目前是全量引入，包体偏大；下一步做按需引入、图片上传、分页和错误重试。

不要把它说成“企业级项目”。面试官更想听你做决定的过程、遇到的问题和验证方式。

## 接下来练手（按顺序）

1. **图片上传**：Vant `Uploader` + 本地预览（先不做后端）。
2. **下拉分页**：`van-list` 触底加载，mock 里造 50 条数据。
3. **搜索历史**：localStorage 保存最近 5 条，支持清空。
4. **登录 / 权限**：mock 一个用户，发布和“我的”页需要登录。
5. **错误态与重试**：接口失败时显示可重试的空状态。
6. **Vant 按需引入**：`unplugin-vue-components` + `@vant/auto-import-resolver`。
7. **单元测试**：用 Vitest 测 `stores` 的 add / toggle。
8. **部署**：Vercel 或 Netlify，见下。

## 部署

- 构建命令：`npm run build`
- 输出目录：`dist`
- 这是 history 路由的单页应用，**需要把所有路径重写到 `index.html`**：
  - Vercel：仓库里已带 `vercel.json`
  - Netlify：`public/_redirects` 已带 `/* /index.html 200`
  - GitHub Pages 部署在子路径时，需要同时设置 Vite 的 `base` 和 Router 的 `createWebHistory(base)`。

## 已知取舍

- Vant 使用全量引入，先保证代码好读；体积优化留作下一步。
- 数据存 localStorage，只适合演示，不是多端同步方案。
- “联系卖家”“设置”“关于”是占位交互，会在 toast 里说明。
