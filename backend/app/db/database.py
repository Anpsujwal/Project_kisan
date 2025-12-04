import os
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME","project_kisan")

_client: MongoClient | None = None


def get_client() -> MongoClient:
    global _client
    if _client is None:
        _client = MongoClient(MONGO_URI)
    return _client


def get_db():
    return get_client()[DB_NAME]


def users_col():
    return get_db()["users"]


def chats_col():
    return get_db()["chats"]


def memories_col():
    return get_db()["memories"]
