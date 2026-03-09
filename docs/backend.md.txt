# 自习室预约系统 - backend 说明文档
## 一、模块功能
- 核心数据操作：提供用户、自习室、座位、预约的增删改查，支撑前端数据需求；
- 业务逻辑处理：实现预约冲突检测、座位状态同步、时间合法性校验；
- 权限管理：区分普通用户/管理员权限，支持用户、自习室、预约记录管理；
- 接口提供：封装RESTful接口，统一响应格式，处理跨域、参数校验。

## 二、技术选型
| 类型         | 选型内容                              |
|--------------|---------------------------------------|
| 开发语言     | Java 17                               |
| 核心框架     | Spring Boot 3.2.2                     |
| 持久层       | MyBatis                               |
| 数据库       | MySQL 8.0                             |
| 构建工具     | Maven 3.8+                            |
| 辅助工具     | Lombok、Spring Transaction、BCryptPasswordEncoder |

## 三、目录结构
com.studyroom/
├─ controller/ # 接口层，接收前端请求
├─ service/ # 业务逻辑层（含 impl 实现类）
├─ mapper/ # 数据访问层，定义数据库操作
├─ model/ # 实体类 + 公共模型（统一响应 / 分页）
└─ 主启动类 # Spring Boot 入口resources/
├─ mapper/ # MyBatis XML 映射文件
└─ application.yml # 核心配置文件

## 四、运行方式
1. 环境准备：安装JDK17+、MySQL8.0、Maven3.8+，启动MySQL服务；
2. 数据库配置：创建`study_room_reservation`数据库，导入SQL脚本；
3. 项目配置：修改`application.yml`中的数据库连接信息（地址/用户名/密码）；
4. 启动项目：①IDEA运行主启动类；②终端执行`mvn spring-boot:run`；
5. 验证：控制台无报错，访问`http://localhost:8080`即可调用接口。