import os
import logging
import smtplib
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path

from dotenv import load_dotenv
from fastapi import BackgroundTasks, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field, field_validator
from sqlalchemy import DateTime, String, Text, create_engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker

# Load environment variables from backend/.env
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL") or os.getenv("SQLALCHEMY_DATABASE_URI")


def init_db_engine(db_url: str | None):
    # Normalize Render / Heroku postgres:// prefix for SQLAlchemy + psycopg 3
    if db_url:
        if db_url.startswith("postgres://"):
            db_url = db_url.replace("postgres://", "postgresql+psycopg://", 1)
        elif db_url.startswith("postgresql://") and not db_url.startswith("postgresql+"):
            db_url = db_url.replace("postgresql://", "postgresql+psycopg://", 1)

    # Test remote PostgreSQL connectivity
    if db_url and not db_url.startswith("sqlite"):
        try:
            # Short timeout test to verify server is reachable
            test_engine = create_engine(
                db_url,
                pool_pre_ping=True,
                connect_args={"connect_timeout": 3} if "psycopg" in db_url else {},
            )
            with test_engine.connect():
                pass
            test_engine.dispose()
            return create_engine(db_url, pool_pre_ping=True), db_url
        except Exception as exc:
            logging.getLogger(__name__).warning(
                "Configured database connection failed (%s). Falling back to SQLite.",
                exc,
            )

    # Fallback to local SQLite database
    sqlite_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "portfolio.db")
    fallback_url = f"sqlite:///{sqlite_path}"
    return create_engine(fallback_url, connect_args={"check_same_thread": False}), fallback_url


engine, ACTIVE_DATABASE_URL = init_db_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)


def send_contact_email(sender_name: str, sender_email: str, message_content: str) -> None:
    email_host = os.getenv("EMAIL_HOST")
    email_port = int(os.getenv("EMAIL_PORT", "587"))
    email_user = os.getenv("EMAIL_HOST_USER")
    email_password = os.getenv("EMAIL_HOST_PASSWORD")
    default_from = os.getenv("DEFAULT_FROM_EMAIL") or email_user
    use_tls = os.getenv("EMAIL_USE_TLS", "True").lower() == "true"
    use_ssl = os.getenv("EMAIL_USE_SSL", "False").lower() == "true"

    if not email_host or not email_user or not email_password:
        logging.getLogger(__name__).warning("Email settings not configured; skipping email dispatch.")
        return

    msg = EmailMessage()
    msg["Subject"] = f"New Portfolio Message from {sender_name}"
    msg["From"] = default_from
    msg["To"] = email_user
    msg["Reply-To"] = sender_email

    msg.set_content(
        f"You have received a new contact submission from your portfolio website:\n\n"
        f"Name: {sender_name}\n"
        f"Email: {sender_email}\n"
        f"Timestamp (UTC): {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')}\n\n"
        f"Message:\n{message_content}\n"
    )

    try:
        if use_ssl:
            with smtplib.SMTP_SSL(email_host, email_port, timeout=15) as server:
                server.login(email_user, email_password)
                server.send_message(msg)
        else:
            with smtplib.SMTP(email_host, email_port, timeout=15) as server:
                if use_tls:
                    server.starttls()
                server.login(email_user, email_password)
                server.send_message(msg)
        logging.getLogger(__name__).info("Contact notification email delivered for %s", sender_email)
    except Exception:
        logging.getLogger(__name__).exception("Failed to send contact notification email via SMTP")


class Base(DeclarativeBase):
    pass


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(254), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )


class ContactSubmission(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=120)
    email: str = Field(min_length=3, max_length=254)
    message: str = Field(min_length=1, max_length=5000)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        local_part, separator, domain = value.partition("@")
        if not separator or not local_part or "." not in domain or domain.startswith(".") or domain.endswith("."):
            raise ValueError("Enter a valid email address.")
        return value


@asynccontextmanager
async def lifespan(_: FastAPI):
    global engine, SessionLocal
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as exc:
        logging.getLogger(__name__).error(
            "Failed to initialize database tables on %s (%s). Falling back to SQLite.",
            engine.url,
            exc,
        )
        sqlite_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "portfolio.db")
        fallback_url = f"sqlite:///{sqlite_path}"
        engine = create_engine(fallback_url, connect_args={"check_same_thread": False})
        SessionLocal.configure(bind=engine)
        Base.metadata.create_all(bind=engine)
    yield
    engine.dispose()


cors_origins_env = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,https://portfolioabishek.onrender.com",
)
cors_origins = [o.strip().rstrip("/") for o in cors_origins_env.split(",") if o.strip()]

app = FastAPI(title="Abishek Seenivasan Portfolio API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_origin_regex=r"https://.*\.onrender\.com",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.api_route("/", methods=["GET", "HEAD"])
def root() -> dict[str, str]:
    return {
        "status": "online",
        "message": "Abishek Seenivasan Portfolio API is running",
        "docs": "/docs",
        "health": "/api/health",
    }


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/contact", status_code=201)
def create_contact(submission: ContactSubmission, background_tasks: BackgroundTasks) -> dict[str, str]:
    message = ContactMessage(
        name=submission.name,
        email=submission.email,
        message=submission.message,
    )
    try:
        with SessionLocal() as session:
            session.add(message)
            session.commit()
    except SQLAlchemyError as error:
        logging.getLogger(__name__).exception("Unable to save contact submission")
        raise HTTPException(status_code=503, detail="Unable to save your message right now.") from error

    background_tasks.add_task(
        send_contact_email,
        submission.name,
        submission.email,
        submission.message,
    )

    return {"status": "received"}
