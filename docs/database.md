# 自习室预约系统数据库设计文档

## 一、数据库基础信息

表格







|    项目    |                             内容                             |
| :--------: | :----------------------------------------------------------: |
| 数据库名称 |                     自习室预约系统数据库                     |
|  存储引擎  |                            InnoDB                            |
|  字符编码  |                             utf8                             |
|  设计原则  | 1. 主键 / 外键 / 非空约束保证数据完整性；2. 表名 / 字段名贴合业务，小写下划线命名；3. 合理设计表关系，适配预约业务场景；4. 主键索引优化查询性能 |

## 二、数据表结构总览

表格







|           表名           |    中文说明    |           核心用途           |
| :----------------------: | :------------: | :--------------------------: |
|          admin           |    管理员表    |    存储系统管理员账号信息    |
|         student          |     学生表     | 存储预约用户（学生）基础信息 |
|        t_building        |    教学楼表    |      存储教学楼基础信息      |
|        classroom         |     教室表     | 存储教室详细信息，关联教学楼 |
|        time_table        |     时段表     |    定义教室可预约的时间段    |
| room_available_time_info | 教室可用时段表 |   记录教室每日时段预约容量   |
|   student_reservation    |   学生预约表   | 核心业务表，存储学生预约记录 |
|       announcement       |     公告表     |    存储系统发布的公告信息    |
|        blacklist         |    黑名单表    |   存储违规学生拉黑限制信息   |

## 三、E-R 图（实体关系图）

![image-20260323212200900](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20260323212200900.png)

### E-R 图关系说明

1. **教学楼与教室**：一对多关系（1:N），一个教学楼包含多个教室，教室通过 `building_id` 外键关联教学楼；
2. **教室与时段表**：一对多关系（1:N），一个教室可配置多个预约时段，时段表通过 `room_id+building_id` 联合关联教室；
3. **教室与教室可用时段表**：一对多关系（1:N），一个教室在不同日期有多个可用时段容量记录，通过 `room_id+building_id+time_id` 联合关联；
4. **学生与学生预约表**：一对多关系（1:N），一个学生可创建多条预约记录，预约表通过 `s_id` 外键关联学生表；
5. **教室与学生预约表**：一对多关系（1:N），一个教室可被多个学生预约，预约表通过 `room_id+building_id` 联合关联教室；
6. **学生与黑名单表**：一对一关系（1:1），一个学生最多有一条拉黑记录，黑名单表通过 `s_id` 外键关联学生表；
7. **管理员与黑名单表**：一对多关系（1:N），一个管理员可操作多条拉黑记录，通过 `blacker_id` 关联管理员表。

## 四、详细数据表设计

### 4.1 管理员表（admin）

表格







|   字段名   |   数据类型   |     约束     |      说明      |
| :--------: | :----------: | :----------: | :------------: |
|  admin_id  | varchar(32)  | PRIMARY KEY  |   管理员编号   |
| admin_name | varchar(255) | DEFAULT NULL |   管理员姓名   |
|  password  | varchar(255) | DEFAULT NULL | 管理员登录密码 |

### 4.2 学生表（student）

表格







|     字段名     |   数据类型   |     约束     |         说明         |
| :------------: | :----------: | :----------: | :------------------: |
|      s_id      | varchar(32)  | PRIMARY KEY  | 学号（用户唯一标识） |
|     s_name     | varchar(255) | DEFAULT NULL |       学生姓名       |
|    password    | varchar(255) | DEFAULT NULL |     学生登录密码     |
|    s_class     | varchar(255) | DEFAULT NULL |         班级         |
|     s_year     | varchar(32)  | DEFAULT NULL |         年级         |
|    s_major     | varchar(255) | DEFAULT NULL |         专业         |
| s_phone_number | varchar(255) | DEFAULT NULL |       手机号码       |

### 4.3 教学楼表（t_building）

表格







|        字段名         |   数据类型   |     约束     |      说明      |
| :-------------------: | :----------: | :----------: | :------------: |
|      building_id      | varchar(32)  | PRIMARY KEY  |   教学楼编号   |
|     building_name     | varchar(255) | DEFAULT NULL |   教学楼名称   |
| building_phone_number | varchar(255) | DEFAULT NULL | 教学楼联系电话 |
|   building_location   | varchar(255) | DEFAULT NULL | 教学楼所在校区 |

### 4.4 教室表（classroom）

表格







|       字段名       |   数据类型   |     约束     |            说明             |
| :----------------: | :----------: | :----------: | :-------------------------: |
|      room_id       | varchar(32)  | PRIMARY KEY  |          教室编号           |
|     room_name      | varchar(255) | DEFAULT NULL |          教室名称           |
|    building_id     | varchar(255) |   NOT NULL   |       所属教学楼编号        |
|     room_floor     | varchar(32)  | DEFAULT NULL |        教室所在楼层         |
|   available_seat   | varchar(32)  | DEFAULT NULL |       教室可用座位数        |
| is_multimedia_room | varchar(32)  | DEFAULT NULL | 是否为多媒体教室（是 / 否） |

### 4.5 时段表（time_table）

表格







|   字段名    |   数据类型   |     约束     |          说明          |
| :---------: | :----------: | :----------: | :--------------------: |
|   time_id   | varchar(32)  | PRIMARY KEY  |        时段编号        |
|  time_name  | varchar(255) | DEFAULT NULL |  时段名称（如时段一）  |
| time_begin  |     time     | DEFAULT NULL |      时段开始时间      |
|  time_end   |     time     | DEFAULT NULL |      时段结束时间      |
|   room_id   | varchar(32)  | PRIMARY KEY  |  教室编号（联合主键）  |
| building_id | varchar(32)  | PRIMARY KEY  | 教学楼编号（联合主键） |

### 4.6 教室可用时段表（room_available_time_info）

表格







|     字段名      |  数据类型   |     约束     |         说明         |
| :-------------: | :---------: | :----------: | :------------------: |
|     time_id     | varchar(32) | PRIMARY KEY  |       时段编号       |
|     room_id     | varchar(32) | PRIMARY KEY  |       教室编号       |
|   building_id   | varchar(32) | PRIMARY KEY  |      教学楼编号      |
| available_date  |    date     | PRIMARY KEY  |      可预约日期      |
| reservation_num | varchar(32) | DEFAULT NULL |   该时段已预约人数   |
|  available_num  | varchar(32) | DEFAULT NULL | 该时段剩余可预约人数 |

### 4.7 学生预约表（student_reservation）

表格







|      字段名      |  数据类型   |          约束          |              说明               |
| :--------------: | :---------: | :--------------------: | :-----------------------------: |
|       s_id       | varchar(32) | PRIMARY KEYFOREIGN KEY |    学号，关联 student (s_id)    |
|     time_id      | varchar(32) |      PRIMARY KEY       |            时段编号             |
|     room_id      | varchar(32) |      PRIMARY KEY       |            教室编号             |
|   building_id    | varchar(32) |      PRIMARY KEY       |           教学楼编号            |
| reservation_date |    date     |      PRIMARY KEY       |            预约日期             |
|      state       | varchar(32) |      DEFAULT NULL      | 预约状态（预约成功 / 预约取消） |
|    room_name     | varchar(32) |      DEFAULT NULL      | 教室名称（冗余字段，优化查询）  |

**外键约束**：`CONSTRAINT f01 FOREIGN KEY (s_id) REFERENCES student (s_id)`

### 4.8 公告表（announcement）

表格







|    字段名    |   数据类型   |     约束     |       说明       |
| :----------: | :----------: | :----------: | :--------------: |
|     a_id     | varchar(32)  | PRIMARY KEY  |     公告编号     |
|  a_content   | varchar(900) | DEFAULT NULL |     公告内容     |
|   a_state    |   int(11)    | DEFAULT NULL |     公告状态     |
| a_begin_time |   datetime   | DEFAULT NULL | 公告生效开始时间 |
|  a_end_time  |   datetime   | DEFAULT NULL | 公告生效结束时间 |
|     s_id     | varchar(255) | DEFAULT NULL |  公告发布者编号  |

### 4.9 黑名单表（blacklist）

表格







|   字段名   |  数据类型   |     约束     |        说明        |
| :--------: | :---------: | :----------: | :----------------: |
|    s_id    | varchar(32) | PRIMARY KEY  |   被拉黑学生学号   |
| date_begin |    date     | DEFAULT NULL |    拉黑开始日期    |
|  date_end  |    date     | DEFAULT NULL |    拉黑结束日期    |
|   state    | varchar(32) | DEFAULT NULL |      拉黑状态      |
| blacker_id | varchar(32) | DEFAULT NULL | 拉黑操作管理员编号 |

## 五、表间关系设计

1. **教学楼与教室**：一对多，一个教学楼包含多个教室，通过 `building_id` 关联；
2. **教室与时段**：一对多，一个教室配置多个可预约时段，通过 `room_id+building_id` 联合关联；
3. **教室与教室可用时段**：一对多，一个教室在不同日期有不同的时段预约容量，通过 `room_id+building_id+time_id` 联合关联；
4. **学生与学生预约**：一对多，一个学生可发起多条预约记录，通过 `s_id` 外键关联；
5. **教室与学生预约**：一对多，一个教室可被多个学生预约，通过 `room_id+building_id` 联合关联；
6. **学生与黑名单**：一对一，一个学生最多一条拉黑记录，通过 `s_id` 关联。

## 六、数据库初始数据说明

1. **管理员**：默认账号 `admin`，密码 `admin`，姓名 `mango`；
2. **教学楼**：初始化 4 栋，编号 1-4，名称分别为弘毅、慕贤、致远、精诚，均位于南校区；
3. **教室**：初始化 4 个，编号 101/201/301/401，分属不同教学楼，配置不同座位数与多媒体属性；
4. **学生**：初始化 14 个学生账号，包含不同专业、年级、班级信息，默认密码多为 123；
5. **黑名单**：初始学号 `32001280` 被拉黑，拉黑时间 2024-08-29，操作管理员 `admin`；
6. **预约记录**：初始化多条学生预约记录，包含预约成功、预约取消两种状态，覆盖不同教室、时段。

## 七、数据库性能与维护建议

### 7.1 索引优化建议

1. 对 `student_reservation` 的 `reservation_date` 建立普通索引，加速按日期查询预约记录；
2. 对 `classroom` 的 `building_id` 建立普通索引，快速查询某教学楼下的所有教室；
3. 对 `room_available_time_info` 的 `available_date` 建立普通索引，优化日期维度的容量查询。

### 7.2 日常维护建议

1. **数据备份**：定期全量备份数据库，防止数据丢失；
2. **历史数据清理**：定期清理过期的预约记录、公告信息，减少数据库存储体积；
3. **事务管理**：在预约创建、取消等核心操作时，开启数据库事务，保证数据一致性；
4. **约束校验**：业务层加强外键关联字段的校验，避免因脏数据导致的关联查询异常。