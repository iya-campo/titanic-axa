from sqlmodel import Session, select
from app.models.passenger import Passenger
from typing import List

class PassengerService:
    def __init__(self, session: Session):
        self.session = session

    def list_passengers(self, 
        survived: int | None = None, 
        pclass: int | None = None,
        sex: str | None = None,
        port: str | None = None) -> List[Passenger]:
        query = select(Passenger)

        if survived is not None:
            query = query.where(Passenger.Survived == survived)

        if pclass is not None:
            query = query.where(Passenger.Pclass == pclass)

        if sex is not None:
            query = query.where(Passenger.Sex == sex)

        if port is not None:
            query = query.where(Passenger.Embarked == port)

        return self.session.exec(query).all()