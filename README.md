[![CI](https://github.com/aaa11221/studyroom-booking/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/aaa11221/studyroom-booking/actions/workflows/ci.yml)
[![CI](https://github.com/iloveyushi/studyroom-booking/actions/workflows/ci.yml/badge.svg)](https://github.com/iloveyushi/studyroom-booking/actions)
[![Backend Coverage](https://codecov.io/gh/iloveyushi/studyroom-booking/branch/develop/graph/badge.svg?flag=backend)](https://codecov.io/gh/iloveyushi/studyroom-booking)
[![Frontend Coverage](https://codecov.io/gh/aaa11221/studyroom-booking/branch/develop/graph/badge.svg?flag=frontend)](https://codecov.io/gh/aaa11221/studyroom-booking)
```markdown
# 自习室预约系统

![Codecov coverage](https://img.shields.io/badge/coverage-72%25-red)




## 目录
1. [项目简介](#项目简介)
2. [团队分工](#团队分工)
3. [技术栈](#技术栈)
4. [UI设计资源](#ui设计资源)
5. [系统核心功能](#系统核心功能)
6. [项目目录结构](#项目目录结构)
7. [本地部署安装步骤](#本地部署安装步骤)
8. [API 端点说明](#api-端点说明)
9. [自动化 CI/CD](#自动化-cicd)
10. [贡献指南](#贡献指南)
11. [参考文献](#参考文献)

## 项目简介
本项目是一款基于Web的自习室预约管理系统，面向高校学生与备考人群，提供座位查询、在线预约、时段选择、签到签退、违规记录等核心功能。用户可按需预约座位，系统自动管控使用时长与占用状态，避免占座、抢座等问题。

同时配备管理后台，支持座位管理、订单审核、数据统计与用户权限控制。系统旨在规范自习室使用秩序，提升空间利用率，为用户提供便捷、公平、高效的自习环境，实现自习室管理数字化与智能化。

## 团队分工
| 姓名 | 学号 | 分工 |
| ---- | ---- | ---- |
| 郭静怡 | 2320100710 | 前端页面开发、Figma UI原型设计、页面交互实现 |
| 付娆 | 2312190205 | SpringBoot后端开发、数据库设计、接口编写、容器部署 |

## 技术栈
### 前端
- Thymeleaf
- Bootstrap

### 后端
- SpringBoot
- MyBatis
- Maven

### 数据库
- MySQL 8.0

### 运维&开发工具
- Figma UI原型设计
- Docker、Docker Compose
- GitHub Actions CI流水线
- Jacoco + Codecov 测试覆盖率统计

## UI设计资源
1. 郭静怡设计稿：https://www.figma.com/design/RJbIMAiZ9FqZqpVX3TdCng/Untitled?node-id=12-36&p=f&t=MyWig4S9AJpbnrqW-0
2. 付娆设计稿：https://www.figma.com/design/neWgrC87xNczbIFWdsrpsk/studyroom%E7%94%A8%E6%88%B7%E7%AB%AF?node-id=0-1&t=DTshT7i1BuAcGnWJ-1

> 权限说明：Anyone with the link can view.

## 系统核心功能
### 学生端
1. 账号登录：系统预置学号登录，密码加密校验，密码错误超限锁定账号，黑名单账号禁止登录
2. 空闲教室查询：支持按教学楼、日期、时段筛选可用自习室
3. 自习室预约：选择教室与时段提交预约，自动校验预约冲突，防止重复预约
4. 我的预约：查看全部历史预约记录，未生效预约可自主取消
5. 个人设置：修改姓名、联系方式，支持修改登录密码

### 管理端
1. 控制台首页：展示学生总数、教室总数、累计预约数据统计卡片
2. 学生信息管理：学生信息查询、新增、删除，对违规学生执行拉黑
3. 教室信息管理：教室信息增删、配置教室开放/关闭可用时段
4. 预约管理：全平台预约记录查看，支持学生、教室、时间多条件检索，可撤销异常订单
5. 黑名单管理：查看拉黑学生列表，支持检索，可对满足条件学生解除拉黑

## 项目目录结构
```text
studyroom-booking/
├── docs/                          # 项目配套文档
│   ├── contributions/             # 各模块个人贡献说明文档
│   ├── design/                    # UI界面截图、原型设计图
│   ├── api/                       # OpenAPI接口文档
│   ├── database.md                # 数据库设计文档
│   ├── architecture.md            # 系统架构文档
│   ├── backend.md
│   ├── frontend.md
│   └── design-spec.md
│
├── demo-video/                    # 根目录：功能演示视频目录
│
├── dev-docs/                      # 根目录：开发配套说明文档、中期/答辩PPT
│
├── backend/                       # SpringBoot后端主代码
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/mango/    # 业务代码分层
│   │   │   │   ├── control/       # 控制器层
│   │   │   │   ├── dao/           # MyBatis数据访问层
│   │   │   │   ├── pojo/          # 数据库实体类
│   │   │   │   ├── service/       # 业务逻辑层
│   │   │   │   └── utils/         # 通用工具类
│   │   │   └── resources/         # 配置文件、静态页面、MyBatis映射文件
│   │   └── test/                  # 单元测试目录
│   ├── backend/                   # 备用Python后端目录
│   │   └── routes/app/
│   ├── pom.xml                    # Maven依赖配置
│   └── Dockerfile                 # 后端镜像构建文件
│
├── .github/
│   └── workflows/
│       └── ci.yml                 # CI自动化流水线配置
│
├── docker-compose.yaml            # 容器编排部署配置
├── .gitignore
└── README.md                      # 项目启动、环境说明文档
```

## 本地部署安装步骤
仅提供Docker本地容器部署方案，无Railway云端部署
1. 本地电脑安装 Docker、Docker Compose
2. 克隆项目完整代码到本地
```bash
git clone 项目仓库地址
cd studyroom-booking
```
3. 执行 `init_reservation_demo.sql` 数据库脚本，创建数据表与测试数据
4. 项目根目录执行命令后台启动全套容器
```bash
docker-compose up -d
```
5. 服务访问地址
- 前端页面：http://localhost:5173
- 后端接口：http://localhost:9099
- MySQL数据库：127.0.0.1:3307
6. 停止整套服务
```bash
docker-compose down
```

## API 端点说明
接口基于Spring MVC开发，全局携带登录鉴权校验，分为两大业务模块：
1. 学生用户接口
    - 登录、个人信息修改、密码更新
    - 空闲教室查询、预约提交、预约取消、个人预约列表查询
2. 管理员接口
    - 学生信息CRUD、学生拉黑/解禁
    - 教室新增、删除、可用时段配置
    - 全平台预约记录查询、异常订单撤销

## 自动化 CI/CD
项目基于GitHub Actions绑定仓库流水线，代码推送、合并PR自动执行任务：
1. ci.yml：拉取代码、安装依赖、代码规范检查、执行单元测试、上传72%覆盖率至Codecov
2. docker.yml：编译前后端、构建Docker镜像、Trivy镜像漏洞扫描
3. security.yml：Gitleaks全局扫描仓库，检测密钥、账号敏感信息泄露

主分支强制准入规则：
1. 全部CI流水线必须执行通过（绿色passing）
2. 至少一名团队成员完成人工代码审查
双条件满足才可合并代码至主线。

## 贡献指南
1. 分支规范：日常开发使用`develop`分支，稳定版本合并至`main`主分支
2. 提交规范：commit注释清晰描述修改内容、修复点、新增功能
3. 代码规范：遵循Java、前端统一编码规范，CI流水线自动校验
4. PR流程：开发完成提交Pull Request，等待CI全绿+人工审核通过方可合并
5. 文档规范：新增功能同步更新`docs`、`dev-docs`内配套文档资源

## 参考文献
[1] MyBatis 官方文档. https://mybatis.org/mybatis-3/zh/index.html
[2] Docker 官方文档. https://docs.docker.com/
```
