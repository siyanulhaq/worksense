from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.contract import router as contract_router
from routes.situation import router as situation_router
from routes.review import router as review_router
from routes.salary import router as salary_router
from routes.burnout import router as burnout_router

app = FastAPI(title="WorkSense API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contract_router, prefix="/api/contract", tags=["Contract"])
app.include_router(situation_router, prefix="/api/situation", tags=["Situation"])
app.include_router(review_router, prefix="/api/review", tags=["Review"])
app.include_router(salary_router, prefix="/api/salary", tags=["Salary"])
app.include_router(burnout_router, prefix="/api/burnout", tags=["Burnout"])

@app.get("/")
def root():
    return {"message": "WorkSense API is running"}