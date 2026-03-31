from fastapi import APIRouter
from app.models import StudentCreate, ApiResponse
from app.database import MockDB, mock_db

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# 创建学生 - POST /api/admin/students
@router.post("/students", response_model=ApiResponse)
async def create_student(student: StudentCreate):
    # 调用数据库方法创建学生
    MockDB.create_student(student.dict())
    return ApiResponse(
        success=True,
        message="学生创建成功",
        data=None
    )

# 查看所有学生 - GET /api/admin/students
@router.get("/students", response_model=ApiResponse)
async def list_students():
    return ApiResponse(
        success=True,
        message="success",
        data=mock_db["students"]
    )