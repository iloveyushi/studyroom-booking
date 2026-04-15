from pydantic import BaseModel
from typing import List, Optional, Union  # 新增Union导入

# 通用响应模型（兼容Python 3.8+）
class ApiResponse(BaseModel):
    success: bool
    message: str
    # 替换：dict | list | str | None → Union[dict, list, str, None]
    data: Optional[Union[dict, list, str]] = None

# 登录请求参数模型
class LoginRequest(BaseModel):
    username: str
    password: str

# 学生创建请求参数模型
class StudentCreate(BaseModel):
    s_id: str          # 学生ID（必填）
    s_name: str        # 学生姓名（必填）
    s_class: Optional[str] = None  # 班级（可选）
    s_year: Optional[str] = None   # 年级（可选）
    s_major: Optional[str] = None  # 专业（可选）
    s_phone_number: Optional[str] = None  # 手机号（可选）

# 预约提交请求参数模型
class ReservationSubmit(BaseModel):
    selectedCheckbox: List[str]  # 选中的预约项列表