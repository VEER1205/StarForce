from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from utils import codeforce_api

router = APIRouter()

@router.get("/user/{handle}")
async def getUserData(handle: str):
    user_stats = codeforce_api.getUserStats(handle)
    return user_stats

@router.get("/compare/")
async def compareRatings(user1: str, user2: str): 
    return codeforce_api.compareRatings(user1, user2)

@router.get("/contests/")
async def listContests():
    contests = codeforce_api.getAllContests()
    return contests