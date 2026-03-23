# 项目规则

## 技术栈
- 前端：HTML + CSS + JavaScript + Thymeleaf
- 后端：Spring Boot（Java）
- 数据库：MySQL（开发阶段可不启用）
- 构建工具：Maven
- 部署方式：本地运行（Spring Boot 内嵌 Tomcat）

---

## 目录结构
- src/main/java/com/mango/        # 后端代码（控制器、启动类）
- src/main/resources/templates/  # 前端页面（HTML模板）
- src/main/resources/static/     # 静态资源（CSS、JS、图片）
- src/main/resources/application.yaml  # 配置文件
- pom.xml                        # Maven依赖管理

---

## 代码规范

### 前端规范
- 页面结构使用语义化 HTML
- 样式统一放在 static/css 中
- JS 脚本统一放在 static/js 中
- 页面命名使用小写+下划线（如 index.html）
- 尽量减少 Thymeleaf 依赖，保持页面可独立展示

### 后端规范
- 使用 Spring Boot 标准结构
- Controller 负责页面跳转或简单请求处理
- 不在 Controller 中编写复杂业务逻辑
- 统一使用注解开发（@Controller、@GetMapping）

### 命名规范
- 类名：大驼峰（如 IndexController）
- 方法名：小驼峰（如 getIndex）
- 文件名：小写+下划线（如 index.html）

---

## API 规范（简化版）
- 当前项目以前端展示为主，不强制要求完整 API
- 若需要接口，统一返回 JSON 格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}