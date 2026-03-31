# API 使用说明

## 基本信息
- Base URL: `http://localhost:9099`
- 统一响应:

```json
{
  "success": true,
  "message": "ok",
  "data": {}
}
```

## 鉴权方式
- 使用 Session/Cookie。
- 前端请求必须携带：`credentials: 'include'`。

```js
fetch(url, {
  method: 'GET',
  credentials: 'include'
})
```

## 认证接口
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

## 管理端接口
- `GET /api/admin/dashboard`
- `GET /api/admin/students`
- `POST /api/admin/students`
- `DELETE /api/admin/students/{sId}`
- `GET /api/admin/classrooms`
- `POST /api/admin/classrooms`
- `PUT /api/admin/classrooms/{roomId}`
- `DELETE /api/admin/classrooms/{roomId}`
- `POST /api/admin/classrooms/available`
- `GET /api/admin/reservations/students`
- `GET /api/admin/reservations/classrooms`
- `GET /api/admin/blacklist`
- `POST /api/admin/blacklist`
- `DELETE /api/admin/blacklist/{sId}`

## 用户端接口
- `GET /api/user/dashboard`
- `GET /api/user/profile`
- `PUT /api/user/profile`
- `PUT /api/user/password`
- `GET /api/user/reservations`
- `POST /api/user/reservations/cancel`
- `GET /api/user/reservations/available`
- `POST /api/user/reservations/preview`
- `POST /api/user/reservations/submit`

## 常用请求示例

### 登录
`POST /api/auth/login`

```json
{
  "username": "admin",
  "password": "123456"
}
```

### 新增学生
`POST /api/admin/students`

```json
{
  "s_id": "20260001",
  "s_name": "Alice",
  "s_class": "1",
  "s_year": "2026",
  "s_major": "CS",
  "s_phone_number": "13800138000"
}
```

### 提交预约
`POST /api/user/reservations/submit`

```json
{
  "selectedCheckbox": ["T01-R101", "T02-R101"]
}
```

## 错误处理建议
- `400`：参数或业务错误
- `401`：未登录/无权限
- `409`：数据冲突
- `500`：服务异常

当 `success=false` 时，优先展示 `message`。
