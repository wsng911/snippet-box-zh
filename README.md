# Snippet Box

## 功能特性

- 创建、编辑、浏览和管理代码片段
- 支持多种编程语言语法高亮
- 标签分类与搜索过滤
- 支持 Markdown 文档
- 固定常用片段
- 复制代码/原始链接

## 快速部署

```bash
docker run -d \
  -p 5000:5000 \
  -v $(pwd)/data:/app/data \
  --name snippet-box-zh \
  wsng911/snippet-box-zh:latest
```

访问 `http://localhost:5000`
