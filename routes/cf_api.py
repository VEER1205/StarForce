from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from utils import codeforce_api

router = APIRouter()

@router.get("/user/{handle}")
async def get_user_data(handle: str):
    user_stats = codeforce_api.get_user_stats(handle)
    return user_stats

@router.get("/compare/{user1}/{user2}")
async def compare_ratings(user1: str, user2: str): 
    return codeforce_api.compare_ratings(user1, user2)