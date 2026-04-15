from fastapi import APIRouter
from app.models import ReservationSubmit, ApiResponse
from app.database import MockDB

router = APIRouter(prefix="/api/user", tags=["User"])

# 提交预约 - POST /api/user/reservations/submit
@router.post("/reservations/submit", response_model=ApiResponse)
async def submit_reservation(request: ReservationSubmit):
    # 构造预约数据
    reservation_data = {
        "reservation_id": "RES2024001",
        "reservation_list": request.selectedCheckbox
    }
    # 保存预约记录
    MockDB.create_reservation(reservation_data)
    return ApiResponse(
        success=True,
        message="预约提交成功",
        data=reservation_data
    )

# 取消预约 - POST /api/user/reservations/cancel
@router.post("/reservations/cancel", response_model=ApiResponse)
async def cancel_reservation(room_id: str, time_id: str, reservation_date: str, building_id: str):
    return ApiResponse(
        success=True,
        message="预约取消成功",
        data=None
    )