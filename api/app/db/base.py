from sqlmodel import SQLModel
from app.models.passenger import Passenger

def init_db(engine):
    SQLModel.metadata.create_all(engine)