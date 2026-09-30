import os
os.environ["DATABASE_URL"] = "sqlite:///./test_hobby.db"
os.environ["SECRET_KEY"] = "test-secret"
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_register_and_login():
    username = "testuser_unique"
    response = client.post("/api/auth/register", json={
        "name":"Test User", "username":username,
        "email":"testuser_unique@example.com", "password":"password123"
    })
    assert response.status_code in (200, 409)
    if response.status_code == 200:
        token = response.json()["access_token"]
        assert token
    response = client.post("/api/auth/login", json={"username":username,"password":"password123"})
    assert response.status_code == 200
    assert "access_token" in response.json()
