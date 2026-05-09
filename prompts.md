# snippet-box-zh Prompts

> 项目：pawelmalak/snippet-box 汉化版（snippet-box-zh）
> 技术栈：Node.js + TypeScript 后端，React + TypeScript 前端，SQLite + Sequelize，Bootstrap 5

---

## 功能迭代

**1. 添加代码片段收藏夹功能**
在 snippet-box-zh 中为代码片段添加"收藏夹"分组功能。用户可以创建多个收藏夹，将片段归入不同收藏夹，并在侧边栏按收藏夹筛选。需要修改数据库模型、后端 API 和前端 Snippets 容器。

**2. 实现片段导入/导出功能**
为 snippet-box-zh 添加批量导入导出功能：支持将所有片段导出为 JSON 文件，也支持从 JSON 文件批量导入片段。在前端 Snippets 页面添加导入/导出按钮，后端新增 `/api/snippets/export` 和 `/api/snippets/import` 接口。

**3. 添加片段访问次数统计**
在 snippet-box-zh 中记录每个代码片段的查看次数。每次访问 `/snippet/:id` 页面时自动 +1，在 SnippetCard 和 SnippetDetails 中显示访问次数，并在 Snippets 列表页支持按访问次数排序。

**4. 支持片段版本历史**
为 snippet-box-zh 实现代码片段的版本历史功能。每次更新片段时保存旧版本，用户可在详情页查看历史版本列表并恢复到任意版本。需要新增 `snippet_versions` 数据表和对应 API。

**5. 添加暗色/亮色主题切换**
在 snippet-box-zh 的导航栏添加主题切换按钮，支持暗色和亮色两种主题。使用 localStorage 持久化用户偏好，切换时动态修改 Bootstrap 主题类名。

---

## Bug 修复

**6. 修复搜索结果不实时更新的问题**
在 snippet-box-zh 中，当用户在搜索框输入内容后删除所有字符，片段列表不会自动恢复显示全部片段。修复 SearchBar 组件，使其在输入为空时自动触发重置，无需手动按 Esc 键。

**7. 修复标签筛选与搜索同时使用时的冲突**
在 snippet-box-zh 的 Snippets 页面，当用户先按标签筛选再使用搜索功能时，两个过滤条件会相互覆盖而非叠加。修复 SnippetsContext 中的状态管理逻辑，使标签筛选和搜索可以同时生效。

**8. 修复固定（Pin）片段后页面不刷新的问题**
在 snippet-box-zh 中，点击 SnippetPin 组件切换片段固定状态后，首页的固定片段区域不会立即更新，需要手动刷新页面。修复 SnippetsContext 中 `toggleSnippetPin` 方法，使其在操作成功后重新获取片段列表。

**9. 修复片段详情页返回按钮路径错误**
在 snippet-box-zh 中，从首页进入片段详情页后，点击"返回"按钮有时会跳转到错误的路径（如 `/snippets` 而非 `/`）。检查 Snippet 容器中 `location.state` 的处理逻辑，确保返回路径正确。

**10. 修复长代码片段在卡片中溢出显示的问题**
在 snippet-box-zh 的 SnippetCard 组件中，当代码片段标题或描述文字过长时，会撑破卡片布局。加个适当的 CSS 截断样式（text-overflow: ellipsis），确保卡片在各种内容长度下保持一致的高度和布局。

---

## 重构

**11. 将 API 请求抽取为独立的 service 层**
在 snippet-box-zh 的前端代码中，所有 axios 请求都直接写在 SnippetsContext 中，导致 Context 文件过于臃肿。把所有 API 调用抽取到 `client/src/services/snippetService.ts` 文件中，Context 只负责状态管理。

**12. 将 SnippetDetails 中的操作按钮提取为独立组件**
在 snippet-box-zh 的 SnippetDetails 组件中，删除、编辑、复制链接、复制代码四个按钮的逻辑混在一起。把这些操作提取为独立的 `SnippetActions` 组件，接收 snippet id 和 code 作为 props。

**13. 统一错误处理机制**
在 snippet-box-zh 的后端代码中，各个路由的错误处理方式不一致。请创建统一的错误处理中间件 `src/middleware/errorHandler.ts`，并在所有路由中使用 `next(error)` 传递错误，统一返回格式为 `{ error: string, status: number }`。

**14. 将硬编码的 API 路径提取为常量**
在 snippet-box-zh 前端的 SnippetsContext 中，API 路径（如 `/api/snippets`）以字符串形式硬编码在各个方法中。请创建 `client/src/constants/api.ts` 文件，集中管理所有 API 路径常量。

---

## 测试

**15. 为 SnippetForm 组件编写单元测试**
使用 React Testing Library 为 snippet-box-zh 的 SnippetForm 组件编写单元测试，覆盖以下场景：表单初始状态渲染、输入标题和语言后提交、编辑模式下表单预填充、提交时调用正确的 Context 方法。

**16. 为后端片段 CRUD 接口编写集成测试**
使用 Jest + supertest 为 snippet-box-zh 的后端 API 编写集成测试，覆盖：GET /api/snippets（获取列表）、POST /api/snippets（创建）、PUT /api/snippets/:id（更新）、DELETE /api/snippets/:id（删除），使用内存 SQLite 数据库隔离测试环境。

**17. 为 searchParser 工具函数编写单元测试**
为 snippet-box-zh 中 `client/src/utils/searchParser.ts` 的搜索解析函数编写完整的单元测试，覆盖：普通关键词搜索、`lang:` 过滤器、`tags:` 过滤器、多条件组合搜索、空字符串输入等边界情况。

---

## 代码理解

**18. 解释 SnippetsContext 的状态管理架构**
请详细解释 snippet-box-zh 中 `client/src/store/SnippetsContext.tsx` 的工作原理：它管理哪些状态、各个方法的职责是什么、组件如何通过 Context 消费数据，以及为什么选择 Context API 而非 Redux。

**19. 解释数据库迁移（umzug）的工作流程**
在 snippet-box-zh 的后端中使用了 umzug 进行数据库迁移管理。解释 `src/migrations/` 目录下迁移文件的执行顺序、如何新增一个迁移文件、以及 umzug 与 Sequelize 的协作方式。

---

## DevOps

**20. 编写 GitHub Actions 多架构镜像构建流水线**
为 snippet-box-zh 编写 `.github/workflows/docker-build.yml`，实现：推送 `main` 分支时自动触发、使用 `docker/setup-qemu-action` 和 `docker/setup-buildx-action` 支持多架构（linux/amd64, linux/arm64, linux/arm/v7）、构建并推送镜像到 Docker Hub，镜像标签使用 `latest` 和 Git commit SHA。
