from fastapi import APIRouter, UploadFile, File, Depends
from sqlmodel import Session
from app.db.session import get_session
from app.services.ingest_service import IngestService

router = APIRouter()

@router.post("/csv")
async def upload_csv(
    file: UploadFile = File(None), 
    session: Session = Depends(get_session)
):
    service = IngestService(session)
    rows = service.upload_csv(file.file if file else None)
    return {"rows_inserted": rows}