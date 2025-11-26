import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = f"sqlite:///{os.path.join(os.path.dirname(__file__), '..', 'db', 'titanic.db')}"

settings = Settings()