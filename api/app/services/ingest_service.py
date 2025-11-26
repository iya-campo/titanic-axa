import os
import pandas as pd
from sqlmodel import Session
from app.models.passenger import Passenger

class IngestService:
    def __init__(self, session: Session):
        self.session = session

    def upload_csv(self, file=None) -> int:
        if file is None:
            current_dir = os.path.dirname(os.path.abspath(__file__))
            
            path = os.path.join(current_dir, "..", "data", "train.csv")
            path = os.path.abspath(path)

            if not os.path.exists(path):
                return {"error": f"train.csv not found at {path}"}

            df = pd.read_csv(path)
        else:
            contents = file.read()

            if len(contents) == 0:
                return {"error": "Uploaded CSV file is empty"}

            from io import BytesIO
            buffer = BytesIO(contents)

            try:
                df = pd.read_csv(buffer)
            except EmptyDataError:
                return {"error": "Uploaded CSV is malformed"}

        if df.empty:
            return {"error": "CSV contains no data rows"}

        self.session.query(Passenger).delete()
        self.session.commit()

        passengers = [Passenger(**row.to_dict()) for _, row in df.iterrows()]

        self.session.bulk_save_objects(passengers)
        self.session.commit()

        return len(passengers)