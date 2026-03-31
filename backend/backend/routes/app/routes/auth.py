from fastapi import APIRouter
from app.models import LoginRequest, ApiResponse
from app.database import MockDB

# 定义路由前缀和标签（匹配API文档）
router = APIRouter(prefix="/api/auth", tags=["Auth"])

# 登录接口 - POST /api/auth/login
@router.post("/login", response_model=ApiResponse)
async def login(request: LoginRequest):
    # 查询用户
    user = MockDB.get_user_by_username(request.username)
    # 校验用户名密码
    if not user or user["password"] != request.password:
        return ApiResponse(
            success=False,
            message="用户名或密码错误",
            data=None
        )
    # 登录成功，返回token和用户信息
    return ApiResponse(
        success=True,
        message="登录成功",
        data={"token": "mock_token_123456", "username": user["username"], "role": user["role"]}
    )

# 获取当前用户 - GET /api/auth/me
@router.get("/me", response_model=ApiResponse)
async def get_current_user():
    # 返回默认管理员信息
    return ApiResponse(
        success=True,
        message="success",
        data={"s_id": "001", "username": "admin", "role": "admin", "s_name": "系统管理员"}
    )

# 登出接口 - POST /api/auth/logout
@router.post("/logout", response_model=ApiResponse)
async def logout():
    return ApiResponse(
        success=True,
        message="登出成功",
        data=None
    )