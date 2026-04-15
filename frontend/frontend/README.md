# Frontend（独立部署示例）

这是一个最小可运行的前端示例，专门用于演示“前后端通过 API 连接”。

## 启动
在 `frontend/` 目录启动任意静态服务器即可，例如：

```powershell
cd frontend
python -m http.server 8080
```

然后访问 `http://localhost:8080`。

## API 地址
- 默认后端地址：`http://localhost:9099`
- 可在 `app.js` 中修改 `API_BASE`。

## 注意
- 使用了 Session 鉴权，请保持 `credentials: include`。
