from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db.session import get_session
from app.services.passenger_service import PassengerService
from app.models.passenger import Passenger

router = APIRouter()

@router.get("/")
def list_passengers(
    survived: int | None = None,
    pclass: int | None = None,
    sex: str | None = None,
    port: str | None = None,
    session: Session = Depends(get_session)
):
    service = PassengerService(session)
    results = service.list_passengers(survived=survived, pclass=pclass, sex=sex, port=port)
    return results