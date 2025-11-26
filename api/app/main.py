from fastapi import FastAPI
from app.db.base import init_db
from app.db.session import engine
from app.routes import ingest, passengers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Titanic API")

# Allow local dev frontend
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db(engine)

app.include_router(ingest.router, prefix="/ingest", tags=["ingest"])
app.include_router(passengers.router, prefix="/passengers", tags=["passengers"])