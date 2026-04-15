import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from app.routes import auth, admin, user

# 创建FastAPI应用实例
app = FastAPI(title="教室预约系统 API", version="1.0")

# 注册所有路由（把认证、管理员、用户接口挂载到应用）
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(user.router)

# 根路径测试接口（验证服务是否启动）
@app.get("/")
async def root():
    return {"message": "教室预约系统 API 运行中"}

# 启动服务（直接运行该文件即可）
if __name__ == "__main__":
    import uvicorn
    # 监听所有IP，端口9099（和API文档一致）
    uvicorn.run(app, host="0.0.0.0", port=9099)