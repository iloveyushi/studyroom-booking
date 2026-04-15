# 模拟数据库存储（无需安装真实数据库，纯内存运行）
mock_db = {
    # 初始管理员用户
    "users": [{"username": "admin", "password": "123456", "role": "admin", "s_id": "001"}],
    # 学生列表（空，创建后填充）
    "students": [],
    # 教室列表（空）
    "classrooms": [],
    # 预约列表（空）
    "reservations": []
}

# 模拟数据库操作类（所有数据操作都在这里）
class MockDB:
    # 根据用户名查询用户
    @staticmethod
    def get_user_by_username(username: str):
        for user in mock_db["users"]:
            if user["username"] == username:
                return user
        return None

    # 创建学生
    @staticmethod
    def create_student(student_data: dict):
        mock_db["students"].append(student_data)
        return student_data

    # 创建预约记录
    @staticmethod
    def create_reservation(reservation_data: dict):
        mock_db["reservations"].append(reservation_data)
        return reservation_data