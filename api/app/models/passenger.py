from sqlmodel import SQLModel, Field

class Passenger(SQLModel, table=True):
    PassengerId: int = Field(primary_key=True)
    Name: str | None = None
    Survived: int | None = None
    Pclass: int | None = None
    Sex: str | None = None
    Age: float | None = None
    SibSp: int | None = None
    Parch: int | None = None
    Ticket: str | None = None
    Fare: float | None = None
    Cabin: str | None = None
    Embarked: str | None = None