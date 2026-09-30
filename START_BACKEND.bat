@echo off
cd /d "%~dp0backend"
if not exist ".venv\Scripts\python.exe" (
  echo Creating Python virtual environment...
  python -m venv .venv
)
call .venv\Scripts\activate.bat
pip install -r requirements.txt
if not exist ".env" copy .env.example .env
echo Starting FastAPI backend on http://127.0.0.1:8000
uvicorn app.main:app --reload --port 8000
pause
