from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "KIRA API"
    
    # CORS Settings
    BACKEND_CORS_ORIGINS: list = [
        "http://localhost:3000",
        "https://kira-lyart.vercel.app"
    ]
    
    # Supabase Settings
    SUPABASE_URL: Optional[str] = None
    SUPABASE_KEY: Optional[str] = None
    SUPABASE_JWT_SECRET: Optional[str] = None
    SUPABASE_DB_PASSWORD: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

# Validation
if not all([
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY,
    settings.SUPABASE_JWT_SECRET,
    settings.SUPABASE_DB_PASSWORD
]):
    raise ValueError(
        "Missing required Supabase environment variables. "
        "Please check your environment configuration."
    )