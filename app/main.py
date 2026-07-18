from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.db.database import create_tables
from app.routers import currency, graph, reports, scam
from app.schemas.schemas import HealthResponse, RootResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


app = FastAPI(
    title="CyberShield India",
    description="Fraud-detection platform API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scam.router)
app.include_router(currency.router)
app.include_router(reports.router)
app.include_router(graph.router)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    errors = []
    for err in exc.errors():
        loc = " -> ".join(str(part) for part in err.get("loc", []))
        errors.append(f"{loc}: {err.get('msg', 'invalid')}")
    detail = "; ".join(errors) if errors else "Validation error"
    return JSONResponse(status_code=422, content={"detail": detail})


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


@app.get("/", response_model=RootResponse)
def root():
    return {"message": "CyberShield India API", "status": "ok"}


@app.get("/health", response_model=HealthResponse, tags=["system"])
def health():
    return {"status": "ok", "service": "CyberShield India"}
